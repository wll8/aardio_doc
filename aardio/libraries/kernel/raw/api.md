# raw库 声明API函数

 使用raw库函数可以支持[静态类型](libraries/kernel/raw/datatype) 编程、导入外部API函数。

## 加载dll模块

dll := raw.loadDll( path | strMemoryDll );

raw.loadDll从路径path或内存数据strMemoryDll中加载dll模块，
然后我们可以使用 dllmodule.api 函数声明我们需要用到的api函数。

参考：[API数据类型](libraries/kernel/raw/datatype)

//使用内存DLL的示例

dllmodule := raw.loadDll($"d:\\hardware.dll");
testapi := dllmodule.api("getbios", "s()" );

io.open();
ioprint( testapi( ));


注意:如果DLL厂商仅提供一个版本的DLL，一般是32位的DLL，在aardio可以直接加载，
如果DLL厂商提供了64位、32位两个版本的DLL，这时候你需要选择32位版本的DLL才能加载，
aardio程序也是32位的，主要是因为64位程序只能运行在64位平台，而32位程序兼容所有平台。

32位的进程的内存限制仅仅是限制单个进程的内存，
实际上一般的桌面软件基本都不可能用到好几个GB的内存
目前aardio提供process.command可以很方便的使用使用多进程交互
如果软件使用外部数据库、或者其他服务端口，因为跨进程都不会受单进程的内存限制。
还有编写网站的FastCGI同样是多进程模式。

## 声明API函数

**语法：**

``` aau
dll = raw.loadDll( path | strMemoryDll );

dll.api( 函数名|函数序号,函数原型,调用约定="stdcall",this指针=null)
```



这里的dll指raw.loadDll加载的dll模块对象.
第一个参数是加载的DLL模块中定义的API函数名字,或导出函数序号.
调用约定,this指针都是可选参数可以省略，this指针可用于thiscall调用约定,也可用于其他调用约定中指定默认的第一个参数。

函数原型是以一个字符串表示的API函数声明,定义该函数的参数类型、返回值类型等,
这里的类型指静态数据类型. 例如:

``` aau
"int(int a,int b)"
```


 定义了一个函数原型,有一个int类型的参数a,一个int类型的参数b,返回值为int类型.

 请参考:
[静态数据类型](libraries/kernel/raw/datatype)

调用约定可以不指定，默认值为"stdcall"，可选值为"cdecl","thiscall"，"fastcall"，"regparm(n)"等， 可以在调用约定后面紧跟一个逗号以及目标DLL的开发平台，可选值为",borland" ",microsoft" ,microsoft是默认选项可以省略，使用delphi编写的DLL时，"stdcall","cdecl"等调用约定不需要指定开发平台。 

fastcall,regparm(n)调用约定( 也就是寄存器传参方式 )详解:

``` aau
"fastcall"
"fastcall,microsoft"
以上两种写法作用相同，前2个小于等于32位的数值参数使用edx,ecx寄存器， 如果还有参数则自右向左依次压栈; 由被调者负责维护堆栈平衡(清除压入的参数);如果函数有返回值则把返回值存放在eax寄存器中.

"fastcall,borland"
同上，前3个小于等于32位的数值参数使用eax,edx,ecx寄存器，

"fastcall,regparm(n)"
"stdcall,regparm(n)"
以上两种写法作用相同，n可以为3,2,1,前n个参数使用eax,edx,ecx寄存器,如果为1则仅使用eax，为2仅使用eax,edx

"regparm(n)"
"cdecl,regparm(n)"
以上两种写法作用相同，n可以为3,2,1,前n个参数使用eax,edx,ecx寄存器,如果为1则仅使用eax，为2仅使用eax,edx
如果还有参数则自右向左依次压栈; 由调者负责维护堆栈平衡(清除压入的参数);如果函数有返回值则把返回值存放在eax寄存器中.

"thiscall"
C++对象调用约定，可在声明API时增加一个参数指定this指针,如果不在声明时指定，也可以在调用时用首参数传递this指针
```



参考：[API数据类型](libraries/kernel/raw/datatype)



//声明API调用示例
//=====================================================
//导入DLL
User32
:= raw.loadDll("User32.dll");

//声明API函数 //声明函数原形的方式遵循C语法
messageBox := User32.api( "MessageBoxW", " void ( int hWnd, ustring lpText,ustring lpCaption ,INT uType )","stdcall") //最后一个参数可以省略

//使用API函数
messageBox( 0, "这是一个测试对话框", "对话框标题", 0x00001000 )

### 三、声明内部函数

``` aau
raw.main = raw.loadDll();
func = raw.main.api( 内部指针地址,函数原型 )
```

如果调用raw.loadDll()时未使用任何参数，则这里的第一个参数应当是一个内部函数指针.

一个有趣的示例(危险操作,请勿模仿):

``` aau
import win;
func = function(str){
	win.msgbox( "非法操作:" + str)
}

//转换为静态函数指针
func_c = raw.tostdcall(func,"void(str)" )

// 对内核对象使用topointer,tonumber等函数是无效的
funcAddr = raw.toPointer(func_c)

//声明一个特殊的API,调用内部函数指针
func_api = raw.main.api( funcAddr ,"void(str)" )

//看来是一件很无聊的事,转来转去,我们只是调用aardio函数而已.
func_api("hello")
```



