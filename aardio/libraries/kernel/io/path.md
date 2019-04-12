# 文件路径

## io.fullpath

**1、函数原型：**

``` aau
绝对路径 = io.fullpath( 相对路径 )
```


**2、函数说明：**

io.fullpath是把相对路径转换为绝对路径，并且支持用"\"或"/"作为首字符表示aardio程序根目录.
该函数并不会检测路径是否存在,但会检测参数是否正确的路径名,并纠正错误的写法,例如将正斜杠修正为反斜杠.

aardio程序根目录：

* 开发时指工程目录
* 运行时指ＥＸＥ目录
* 不在当前工程内的aardio文件，指启动aardio文件所在的目录。

很多内核库、标准库函数都自动支持用"\"或"/"作为首字符表示aardio程序根目录
例如在窗体中设置图片的路径，$包含操作符，string.load string.save以及库里大部分用到路径参数的函数

aardio路径还可以开始于 "~\"或"~/" 以表示当前执行的EXE文件所在目录， 对于$包含操作符，以及 raw.loadDll() string.load() string.loadBuffer() 等函数，如果以"~\"开头表示的EXE根目录下的路径不存在，会自动切换为"\"开头的应用程序根目录下的路径尝试读取文件, 此功能方便将标准库中的文件直接移动到用户库中使用。

**3、调用示例：**


``` aau
path = io.fullpath( "/res/test.jpg" )

io.open();
io.print( path );
```

## io.localpath

**1、函数原型：**

``` aau
绝对路径 = io.localpath( 相对路径 )
```


**2、函数说明：**

localpath检查路径是否以"\"或"/"作为首字符表示应用程序根目录的相对路径,如果是,则调用io.fullpath把相对路径转换为绝对路径，否则返回空值.

## io.exist

**1、函数原型：**

``` aau
是否存在 = io.exist( 文件路径 )
```


**2、函数说明：**

指定的文件路径参数如果不是字符串、不是一个合法的路径、或是一个空字符串时该函数返回null值.
否则,该函数调用io.fullpath将文件路径转换为绝对路径,如果文件存在返回绝对路径,否则返回null. 
null在条件表达式中可以转换为false,表示条件假值.

传入错误的参数时,io.exist不会抛出异常,而是返回null值.

**3、调用示例：**


``` aau
fullpath = io.exist(  "/res/test.jpg" );

if(fullpath){
	error("文件不存在")
}

//上面的代码执行的功能可以使用以下的代码来实现
fullpath =assert(  io.exist(  "/res/test.jpg" ) ,"文件不存在" )
```

## io.splitpath

**1、函数原型：**

``` aau
tpath = io.splitpath( 文件路径 )
```


**2、函数说明：**

该函数拆分一个文件路径为多个部分,并返回一个table对象tpath.有以下成员:

tpath.dir 表示文件路径所在的目录路径，以斜杠结束
tpath.name 表示文件名(无后缀)
tpath.ext 表示文件后缀名(包含圆点)
tpath.file 包含后缀名的完整文件名
tpath.drive 所在的分区号,以冒号结束。

tpath.dir ++ tpath.file等于完整的文件路径。

**3、调用示例：**


``` aau
//新建一个控制台程序，main.aardio代码如下

//将参数去掉引号
path = string.trim( _CMDLINE ,'"');

//拆分为目录名,文件名,后缀名,分区号
var tpath = io.splitpath(path)

//重命名
io.rename( path,tpath.dir ++ tpath.ext )

//发布该程序为exe文件,将需要去掉文件名字的文件 - 往该exe上一拖即可.
```

## io._exepath

只读属性,返回启动主程序的exe文件路径,开发环境中此属性返回 aardio.exe 的完整文件路径

## io._exedir

只读属性,返回启动主程序的exe文件所在的目录路径,开发环境中此属性返回 aardio.exe 所在的目录路径
