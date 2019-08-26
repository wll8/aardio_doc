# 重载API函数

 请参数 [API数据类型](libraries/kernel/raw/datatype)

## 重载API

对于同一个API函数可以定义为不同的参数类型，例如：

``` aau
::SendMessage = user32.api("SendMessageA","int(int hWnd,INT msg
    ,pointer wParam,pointer lParam)")

::SendMessageInt = user32.api("SendMessageA","int(int hWnd,INT msg
    ,int wParam,int lParam)")

::SendMessageRefInt = ::User32.api("SendMessageA","int(int hWnd,INT msg
    ,int &wParam,int &lParam)")

::SendMessageByString = user32.api("SendMessageA","int(int,INT,int
    ,int wParam,string &lParam)")

::SendMessageByStruct = user32.api("SendMessageA","int(int hWnd,INT msg
    ,int wParam,struct &lParam)")
```

## 重载API命名约定

注意重载API时一般约定以重载的类型作为函数名字后缀.

**一、数值类 静态类型(int,INT,long,Long,byte,BYTE,float,double)**

其中数值类型，引用与非引用参数传递给API的值是不同的,因此重载非引用参数直接加类型作为后缀,例如:SendMessageInt 而重载引用参数则加Ref缩写以指明ByRef方式传递参数,例如:SendMessageRefInt

**二、指针类 静态类型(string,pointer,sturct)**
而其他与指针有关的类型:指针(pointer)、字符串(string)、结构体(struct)等，输出与输入参数的意义仅区别于是否返回新值，目标函数收到的值是一样(一般在C语言中都表示为指针)，因此一律以By缩写加上类型后缀来表示,例如:SendMessageByString,在实际使用中,如果这个参数有可能输出该参数的值,就在声明中加上&

## 指针与数值

**1、数值类 类型**数值类型包括:int,INT,long,Long,byte,BYTE,float,double
其中大写的类型为无符号整数,double,float表示小数,其他为整数.

**2、指针类 类型**
指针类型包括: 指针(pointer)、字符串(string)、结构体(struct)
在C语言中,他们都表示为一个指针.指针其实是一个特殊的32位数值,只不过表示的是内存地址,

**3、句柄**
一个特例是windows中使用句柄,句柄是一个特殊的数值,用来指向内核对象的地址,这一点类似指针,但是句柄比指针更安全一些,访问一个错误的句柄一般不会导致程序崩溃,windows会管理句柄的分配与访问.在aardio中应当将句柄声明为指针类型,这至少可以提醒你不要随意的对句柄进行算术运算.在aardio早期版本中提供的一些库中有一些API将句柄声明为数值,这是错误的.

从本质上来说所有的类型都可以相互替代, 他们都是具有不同意义的数值.
而在aardio中也可以显式的调用topointer将一个数值转换为指针，而调用tonumber将一个指针转换为数值。
但实际上这种自由的转换正是导致一切麻烦的根源,`编程语言都会试图阻止你做出错误的类型转换`.

当然,也正为类型可以转换,因此有了重载API函数的功能,你可以转换,但是你要显式的声明你的转换类型.

## 隐式转换

如果你需要在API函数参数中使用不同的数据类型,aardio要求你显示的定义参数的类型,声明重载的API函数.

但是aardio也支持部分的隐式自动转换：

``` aau
null可以表示空指针
null,pointer,string类型可以相互转换
```

在aardio中省略参数就会传递null空值作为实参,
因此pointer,string类型的API参数都可以省略参数传递默认的null值.例如:

``` aau
::SendMessage( 0xFFFF, 0x1A )
```

第三个参数、第四个参数省略了，aardio会默认传递null值,自动转换为如下的代码:

``` aau
::SendMessage( 0xFFFF, 0x1A, null, null )
```

但是如果我们将SendMessage的第三个参数、第四个参数的形参指定为int数值类型，
那么空值就要显示指定为0,如下:

``` aau
::SendMessageInt(0xFFFF/*_HWND_BROADCAST*/, 0x1A/*_WM_WININICHANGE*/,0,0 )
```

因此,虽然最终传递的都是数值,中间却有很多需要注意的细节.这也是静态语言使用麻烦的一个原因.

`如果你不是很清楚这个参数在做什么，你不应当随意的更改API参数的类型`。

## 结构体的空值

在C/C++中结构体也是一个指针,可以为null值,

而aardio对结构体有严格的限制,禁止你用其他类型来取代结构体,也不允许传递null值.
这种设计对增强程序的健壮性有非常重要的意义.他避免你因为失误少写一个参数导致的崩溃错误,结构体指向的内存通常较为重要，应小心的使用。

aardio允许你使用{}构建一个空的table对象表示结构体参数的空值。
你必须显式的告诉aardio你确实想使用一个空值.

## 我们正在使用的是动态语言

你可能已经被上面的指针、数值搞的晕头转向了,**但是别忘了,aardio是动态语言**,虽然支持静态类型编程,但大多时候你并不需要去使用这些底层的、麻烦的功能,在aardio中,你可以把静态类型实现的功能用动态语言灵活的封装和应用,**在保持静态编程强大功能的同时,享受动态语言的轻便灵活**.
