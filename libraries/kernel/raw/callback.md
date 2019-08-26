# API静态回调函数

本节介绍如何将aardio动态函数转换为静态回调函数指针。请参考：[raw库](libraries/kernel/raw/api)、[静态类型类型](libraries/kernel/raw/datatype)

**一、stdcall,cdecl约定**

stdcall约定由被调用函数恢复堆栈。cdecl约定由主调函数恢复堆栈。

**二、创建stdcall约定的静态回调函数**

**WINAPI回调函数使用stdcall约定**,stdcall是调用外部函数时使用最遍的调用约定。
使用raw.tostdcall函数将普通aardio函数转换为支持stdcall调用约定的可回调函数。

``` aau
func = function(a,b,c) {
    io.print(owner,a,b,c)
}
func_c = raw.tostdcall( func,"(int,int,int)" );
func2_c =raw.tostdcall( func,"(int,int,int)" ,"可以附加一个参数，以指定被回调函数的owner值" );

/*
静态回调函数由aardio内存管理器自动进行垃圾回收。
如果回调函数仍然被外部函数调用，您必须保持静态回调函数在有效作用域内。

回调函数是一个cdata对象，回调函数声明了_topointer元方法，因此可以自动转换为pointer指针。

可以从一个aardio函数创建多个回调函数。
为区别不同的回调函数，可以附加一个参数以显式指定owner指针的值。
*/

io.open()

//回调函数也可以在aardio中被调用执行,例如：
func_c(1,2,3)
```

**三、创建cdecl约定的静态回调函数**

使用raw.tocdecl函数将普通aardio函数转换为支持cdecl调用约定的可回调函数。
``` aau
func = function(a,b,c) {
    io.print(owner,a,b,c)
}
func_c = raw.tocdecl( func,"(int,int,int)" );
func2_c = raw.tocdecl( func,"(int,int,int)" ,"可以附加一个参数，以指定被回调函数的owner值" );

/*
回调函数是一个cdata对象，回调函数声明了_topointer元方法，因此可以自动转换为pointer指针。

一个aardio函数可以创建多个回调函数。
为区别不同的回调函数，可以附加一个参数以显式指定owner的值。

回调函数也可以在aardio中被调用执行,例如：

cfunc3 =raw.tocdecl(afunc,"(int,int,int)" );
cfunc(1,2,3)

*/

//回调函数也可以在aardio中被调用执行,例如：
func3_c =raw.tocdecl( func,"(int,int,int)" );
func3_c(1,2,3)
```

**四、创建fastcall约定的静态回调函数**

 使用raw.tofastcall函数将普通aardio函数转换为支持fastcall调用约定的可回调函数。
 函数用法与raw.tocdecl() raw.tostdcall() 相同。

**五、多线程静态回调函数**

普通回调函数创建于当前线程环境，
`不能将普通回调函数指针传递给其他线程使用`。

如果一个静态回调函数不是在当前线程被触发，应作如下替换：
thread.tocdecl() 替换 raw.tocdecl()
thread.tostdcall() 替换 raw.tostdcall()
thread.tofastcall() 替换 raw.tofastcall()

上述thread名字空间下的函数与raw名字空间下的同名函数作用相同，
区别是thread名字空间提供的函数创建的静态回调函数是可以多线程使用的，

创建多线程回调函数时 - 要注意import等语句要写到函数内部，
这与创建线程的规则相同，不同线程的变量环境各自独立。


 当使用 thread.tostdcall, thread.tocdecl() thread.tofastcall() 等函数创建多线程回调函数时，
aardio将会自动初始化线程环境 - 并且可以共享、重用已创建的线程环境。

 即使线程不是由aardio代码所创建，aardio仍然会自动管理所有创建的线程环境，在回调函数对象
 离开作用域，或者发起调用的线程结束时aardio根据需要回收资源。

**六、静态回调函数对象的内存管理与释放**

如果所有引用静态回调函数对象的变量被赋值为null或者超出作用域不再有效。
将会由aardio内存管理器自动进行垃圾回收并删除静态回调函数对象。

因此：如果静态回调函数对象仍然被外部API函数调用，`你必须确定静态回调函数在有效作用域内`，并且没有被赋值为null。 这一点非常重要，你释放了静态回调函数，可是外部组件的C、C++却并不知道，如果静态回调函数对象已被回收，再次调用静态回调函数将会导致不可预知的错误。

如果静态回调函数被指定为某对象的成员，在函数内部又循环引用了该对象，
这会导致无法释放资源。使用参数@3将该对象指定为owner可避免该问题

下面是一个错误用法的示例：

``` aau
this.createCallback = function(callback){
    this.callback = ..raw.tostdcall(
        function(...){
            this.beforeCallback(...) //这里导致了循环引用自身的问题
            return callback(...);
        },proto);
}
```


正确用法是使用owner参数引用对象自身，如下：

``` aau
this.createCallback = function(callback){
    this.callback = ..raw.tostdcall(
        function(...){
            owner.beforeCallback(...)
            return callback(...);
        },proto,this);
}
```


注意只有线程内静态回调函数要注意这个问题（ 多线程回调函数、普通函数都无此问题 ）

**七、在静态回调函数中使用返回值、输出参数**
 静态回调函数声明中不指定返回值或指定为void无返回值,
 返回值类型不可指定为struct,float,double类型,其他类型忽略声明类型,
 数值返回为int,math.size64返回为LONG类型,true,false返回为布尔值，null返回0,
 其他类型必须是能在API函数中转换为指针的类型


 在静态回调函数声明中，可以在参数类型后添加&声明输出参数，你如C,C++中的int *指针可以声明为int &，
在aardio函数中使用返回值输出参数（有几个输出参数，增加几个返回值），例如：

``` aau
cdeclCallback = raw.tocdecl( function(a,b){

    //使用返回值输出参数（有几个输出参数，增加几个返回值）
    return 0,a,456;
},"int(long &a,int &b )")
```

 也可以把参数声明为指针，再自己修改指针的值，示例：

``` aau
cdeclCallback = raw.tocdecl( function(a,b){

    raw.convert({long v = 123},a);
    return 0;
},"int(ptr a,int b )")
```

**八、在静态回调函数中声明结构体**

静态回调函数中，对于struct类型参数，可以用一个实际的结构体声明替换struct类型，例如 raw.tocdecl(func,"int(struct pt)") 我们可以更改为 raw.tocdecl(func,"int({int x;int y} pt)") ，也可以在结构体后面加一个&表示输出类型的参数，并可通过返回值修改调用者传入的原结构体的值（回调函数无对应返回值时忽略此操作），

在回调函数中直接声明结构体时，要注意结构体不能再包含其他结构体（简单说只能出现一对{ } ），并且除了结构体的字段名以外 - 不能在该结构体声明中使用其他变量名。

**九、示例程序：在WINAPI函数中使用回调函数枚举当前所有窗口**

WINAPI 回调函数使用stdcall约定,stdcall是调用外部函数时使用最遍的调用约定

``` aau
//导入DLL
User32 := raw.loadDll("User32.dll");
EnumWindows := User32.api( "EnumWindows", "int(POINTER lpEnumFunc ,int lParam )" )
//回调函数
enumwndProc = function( hwnd,lparam ){
io.print("回调owner:" + owner.tag , "窗口句柄:" + hwnd , "回调附加参数:" + lparam ); //在控制台显示所有参数
return 1 ; //如果有输出的传址参数，在这里按传入顺序添加所有参数到返回值后面
}

enumwndProc_c = raw.tostdcall(enumwndProc,"int(int hwnd,int lparam )" ,{tag='crane'} );

io.open();//打开控制台窗口
EnumWindows(enumwndProc_c ,12330); //回调函数声明了_topointer元方法，因此可以自动转换为pointer指针。

enumwndProc_c = null; //可以确定回调函数不再使用，赋值为null，并等待由内存垃圾回收
```
