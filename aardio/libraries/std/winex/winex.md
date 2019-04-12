# winex库

winex库主要扩展win库的功能，并提供管理外部进程窗口的函数

## winex.match

**1、函数原型：**

``` aau
是否匹配 = winex.match(窗口句柄,文本,类名,ID)
```


**2、函数说明：**

 所有参数可选. 

 检测给定窗口句柄的窗口属性,与给定的参数进行比较,如果相符返回真(true),否则返回假(false)
 使用模糊匹配比较类名、标题，支持 [模式语法](libraries/kernel/string/pattern%20syntax) 。

winex库中查找窗口的函数多是调用此函数对窗口进行匹配.

## winex.find

**1、函数原型：**

``` aau
hwnd,线程ID,进程ID = winex.find( 类名,标题,进程ID,线程ID )
```


 注意：本文档中 hwnd 用于表示窗口句柄的变量名。 **2、函数说明：**

 按给定的参数查找指定的窗口，所有参数都是可选参数。
winex.find使用模糊匹配来查找类名、标题，支持 [模式语法](libraries/kernel/string/pattern%20syntax) 。

 如果需要简单匹配，请使用  [win.find](libraries/std/winex/win#find)

**3、调用示例：**


``` aau
import process;
import winex;
import fsys;

//运行记事本
进程 = process( fsys.searchFile( "notepad.exe")  )

//打开控制台
io.open()

//查找窗口
var 句柄 = winex.find(".+pad" , ,进程.id /*根据进程ID也可以找到窗口*/ );
io.print("找到类名为Notepad的窗口,句柄：", 句柄 )
```

## winex.findEx

**1、函数原型：**

``` aau
hwnd = winex.findEx( 父窗口句柄,返回第几个匹配句柄,类名模式串 ,标题模式串, 控件ID )
```


**2、函数说明：**

 按给定的参数查找指定的窗口，除父窗口句柄以外所有参数都是可选参数。

winex.findEx使用模糊匹配来查找类名、标题，支持 [模式查找语法](libraries/kernel/string/pattern%20syntax) 。

 如果需要简单匹配，请使用 [win.findEx](libraries/std/win#findEx)

**3、调用示例：**


``` aau
import process;
import winex;

//运行记事本
process.execute("notepad.exe")

//打开控制台
io.open()

//查找
var hwnd = win.find("Notepad");//查找父窗口
var hedit = winex.findEx(hwnd,1,"Edit" ); //查找第一个类名为Edit的子窗口

//输出结果
io.print("找到记事本中的文本框句柄：", hedit )
```

## winex.findExists

**1、函数原型：**

``` aau
窗口句柄,控件句柄,线程ID,进程ID = winex.findExists( 父窗口标题,控件文本 )

窗口句柄,控件句柄,线程ID,进程ID = winex.findExists(
				父窗口标题,
				控件文本,
				父窗口类名,
				控件类名,
				控件ID
			)
```


**2、函数说明：**

 所有参数都是可选参数,但一般应指定父窗口标题与控件文本.
 这个函数基本是结合了winex.find与winex.findEx的功能,首先查找符合条件的父窗口,再查找他是否包含符合条件的控件窗口.您可以打开winex库查看此函数的源代码.

winex.findExists同样支持使用模糊匹配来查找类名、标题，支持 [模式查找语法](libraries/kernel/string/pattern%20syntax) 。

 这个函数是非常有用的一个函数.

**3、调用示例：**

<pre>io.open();//&#x6253;&#x5F00;&#x63A7;&#x5236;&#x53F0;

import winex;
import process

//&#x8FD0;&#x884C;&#x8BB0;&#x4E8B;&#x672C;
process.execute( &quot;notepad.exe&quot;)

//&#x67E5;&#x627E;&#x6807;&#x9898;&#x5305;&#x542B;&quot;&#x8BB0;&#x4E8B;&#x672C;&quot;,&#x5E76;&#x5305;&#x542B;&#x7C7B;&#x540D;&#x4E3A;&quot;Edit&quot;&#x63A7;&#x4EF6;&#x7684;&#x7A97;&#x53E3;.
&#x7A97;&#x53E3;&#x53E5;&#x67C4;,&#x63A7;&#x4EF6;&#x53E5;&#x67C4;,&#x7EBF;&#x7A0B;ID,&#x8FDB;&#x7A0B;ID = winex.findExists(&quot;&lt;Notepad&gt;|&lt;&#x8BB0;&#x4E8B;&#x672C;&gt;&quot;,&quot;&quot;, ,&quot;Edit&quot;)

//&#x663E;&#x793A;&#x7ED3;&#x679C;
io.print( &#x7A97;&#x53E3;&#x53E5;&#x67C4;,&#x63A7;&#x4EF6;&#x53E5;&#x67C4;,&#x7EBF;&#x7A0B;ID,&#x8FDB;&#x7A0B;ID  )

//&#x5173;&#x95ED;&#x7A97;&#x53E3;
win.close(&#x7A97;&#x53E3;&#x53E5;&#x67C4;)

execute(&quot;pause&quot;) //&#x6309;&#x4EFB;&#x610F;&#x952E;&#x7EE7;&#x7EED;
io.close();//&#x5173;&#x95ED;&#x63A7;&#x5236;&#x53F0;
</pre>

## winex.findActivate

**1、函数原型：**

``` aau
窗口句柄,控件句柄,线程ID,进程ID = winex.findActivate( 父窗口标题,控件文本 )

窗口句柄,控件句柄,线程ID,进程ID = winex.findActivate(
				父窗口标题,
				控件文本,
				父窗口类名,
				控件类名,
				控件ID
			)
```


**2、函数说明：**

 此函数用法与winex.findExists完全相同,内部直接调用winex.findExists.
 不同的是:winex.findActivate会在找到窗口后激活窗口使之成为前台窗口.

## winex.wait

**1、函数原型：**

``` aau
窗口句柄,控件句柄,线程ID,进程ID = winex.wait( 父窗口标题,控件文本 )

窗口句柄,控件句柄,线程ID,进程ID = winex.wait(
				父窗口标题,
				控件文本,
				父窗口类名,
				控件类名,
				控件ID
			)
```


**2、函数说明：**

 所有参数都是可选参数,但一般应指定父窗口标题与控件文本.
 这个函数内部调用winex.findExists,所以参数用法与winex.findExists完全一致,请参考此函数说明.
winex.wait同样支持使用模糊匹配来查找类名、标题，支持 [模式查找语法](libraries/kernel/string/pattern%20syntax) 。 

 该函数指定一些可选的参数,等待指定的窗口创建,然后返回.
 可使用 winex.waitTimeout 指定超时值(以毫秒为单位),如果此属性为null空值,表示永不超时.
 可使用 winex.waitDelay 指定检测间隔(以毫秒为单位),默认为100毫秒.

 该函数如果超时并失败则返回空值.


**3、调用示例：**

<pre>io.open();//&#x6253;&#x5F00;&#x63A7;&#x5236;&#x53F0;

import winex;
import process

//&#x8FD0;&#x884C;&#x8BB0;&#x4E8B;&#x672C;
process.execute( &quot;notepad.exe&quot;)

//&#x67E5;&#x627E;&#x6807;&#x9898;&#x5305;&#x542B;&quot;&#x8BB0;&#x4E8B;&#x672C;&quot;,&#x5E76;&#x5305;&#x542B;&#x7C7B;&#x540D;&#x4E3A;&quot;Edit&quot;&#x63A7;&#x4EF6;&#x7684;&#x7A97;&#x53E3;.
&#x7A97;&#x53E3;&#x53E5;&#x67C4;,&#x63A7;&#x4EF6;&#x53E5;&#x67C4;,&#x7EBF;&#x7A0B;ID,&#x8FDB;&#x7A0B;ID = winex.wait(&quot;&lt;Notepad&gt;|&lt;&#x8BB0;&#x4E8B;&#x672C;&gt;&quot;,&quot;&quot;, ,&quot;Edit&quot;)

//&#x663E;&#x793A;&#x7ED3;&#x679C;
io.print( &#x7A97;&#x53E3;&#x53E5;&#x67C4;,&#x63A7;&#x4EF6;&#x53E5;&#x67C4;,&#x7EBF;&#x7A0B;ID,&#x8FDB;&#x7A0B;ID  )

io.print(&quot;&#x8BF7;&#x5173;&#x95ED;&#x6253;&#x5F00;&#x7684;&#x8BB0;&#x4E8B;&#x672C;&#x7A97;&#x53E3;&quot;)
winex.waitClose(&quot;&lt;Notepad&gt;|&lt;&#x8BB0;&#x4E8B;&#x672C;&gt;&quot;,&quot;&quot;, ,&quot;Edit&quot;);
..io.print(&quot;&#x7A97;&#x53E3;&#x5173;&#x95ED;&#x4E86;&quot;)

execute(&quot;pause&quot;) //&#x6309;&#x4EFB;&#x610F;&#x952E;&#x7EE7;&#x7EED;
io.close();//&#x5173;&#x95ED;&#x63A7;&#x5236;&#x53F0;

 </pre>

## winex.waitClose

**1、函数原型：**

``` aau
是否成功 = winex.waitClose( 窗口句柄 )

是否成功 = winex.waitClose(
				父窗口标题,
				控件文本,
				父窗口类名,
				控件类名,
				控件ID
			)
```


**2、函数说明：**

 此函数用法与winex.wait类似,请参考winex.wait说明.
 不同的是,winex.waitClose可以指定一个窗口句柄作为参数.
 并且 winex.waitClose只有一个返回值,表示是否成功.

 该函数指定一些可选的参数,等待指定的窗口关闭,然后返回.
 可使用 winex.waitTimeout 指定超时值(以毫秒为单位),如果此属性为null空值,表示永不超时.
 可使用 winex.waitDelay 指定检测间隔(以毫秒为单位),默认为100毫秒.

 如果超时返回false,成功则返回true;


## winex.waitActive

**1、函数原型：**

``` aau
窗口句柄 = winex.waitActive( 窗口句柄 )

窗口句柄,控件句柄,线程ID,进程ID = winex.waitActive(
				父窗口标题,
				控件文本,
				父窗口类名,
				控件类名,
				控件ID
			)
```


**2、函数说明：**

 此函数用法与winex.waitClose类似,请参考winex.waitClose说明. 

winex.waitActive返回激活窗口的句柄.如果使用了winex.wait相同的参数,则返回与winex.wait相同的返回值(窗口句柄,控件句柄,线程ID,进程ID)


 该函数指定一些可选的参数,等待指定的窗口激话,然后返回.
 可使用 winex.waitTimeout 指定超时值(以毫秒为单位),如果此属性为null空值,表示永不超时.
 可使用 winex.waitDelay 指定检测间隔(以毫秒为单位),默认为100毫秒.

 如果超时返回空值,否则返回激活窗口的句柄.

 注意:此函数内部调用win.getForeground()检测激活窗口,而非win.getActive()
win.getActive()仅能获取当前线程的激活窗口,而非系统激活窗口,通常会因为名称而导致误会.

## 枚举窗口

请参考： [枚举与迭代](libraries/the%20language/enum_each)

**1、函数原型：**

``` aau
winex.enum( 回调函数,父窗口句柄 = 桌面窗口,要查找的类名,要查找的标题,要查找的控件ID )
```


**2、函数说明：**

在指定的父窗口枚举所有子窗口、除回调函数以外，所有参数为可选参数。类名与标题支持 [模式语法](libraries/kernel/string/pattern%20syntax) 。
每查找到一个窗口就调用第一个参数指定的回调函数。回调函数按下面的格式定义：

``` aau
function( 找到的窗口句柄,窗口嵌套深度 ){
    //返回false停止枚举
}
```

**3、调用示例：**


``` aau
import winex;

//打开控制台
io.open()

winex.enum(
	function(hwnd,depth){

		..io.print( depth/*深度*/,hwnd/*窗口*/,win.getText(hwnd)/*标题*/ )
		/*return false*/
	}
)
```

## 枚举顶层窗口

请参考： [枚举与迭代](libraries/the%20language/enum_each)

**1、函数原型：**

``` aau
winex.enumTop( 回调函数 )
```


**2、函数说明：**

枚举所有桌面顶层窗口。 
每查找到一个窗口就调用第一个参数指定的回调函数。回调函数按下面的格式定义：

``` aau
function( 找到的窗口句柄 ){
    //返回false停止枚举
}
```

winex.enumTop的实现较简单，执行速度也很快，如果仅仅是需要例出顶层窗口的句柄，不需要其他的功能，应优先选用此函数。

**3、调用示例：**


``` aau
import winex;

//打开控制台
io.open()

winex.enumTop(
	function(hwnd){
 		..io.print(hwnd)
	}
)
```

## 迭代窗口

请参考： [枚举与迭代](libraries/the%20language/enum_each)

**1、函数原型：**

``` aau
winex.each( 要查找的类名,要查找的标题,父窗口句柄 = 桌面窗口 )
```


**2、函数说明：**

父窗口句柄为可选参数，默认为桌面窗口。类名和标题都支持 [模式查找语法](libraries/kernel/string/pattern%20syntax) 。
winex.each创建一个可用于 [for...in](libraries/the%20language/statements/looping#forin) 语句的迭代器函数，用于广度遍历同一子级的子窗口。

**3、调用示例：**


``` aau
//适用于 QQ 2010 ( 2010/08/17 )
import winex;
import win.clip;
import key;

//查找QQ聊天窗口
for hwnd,title,theadId,processId in winex.each( "TXGuiFoundation","^[^TQ][^XQ].+" ) {

	//恢复窗口
	win.show(hwnd,0x9/*_SW_RESTORE*/)
	win.setForeground( hwnd )
	win.delay(500)

	//输入聊天内容
	win.clip.write("聊天内容")
	key.combine("CTRL","V")
	win.delay(100)

	//发送聊天内容
	key.combine("CTRL","ENTER")
	key.press( "ENTER" )
}
```

## winex.fromPoint

**1、函数原型：**

``` aau
hwnd = winex.fromPoint( 屏幕坐标x,屏幕坐标y )
```


**2、函数说明：**

从指定的屏幕坐标获取窗口，如果窗口拥有子窗口则递归获取子窗口直到叶级窗口

## winex.fromPointReal

**1、函数原型：**

``` aau
hwnd = winex.fromPointReal( 屏幕坐标x,屏幕坐标y )
```


**2、函数说明：**

此函数首先调用winex.fromPoint，然后调用winex.fromClientPointReal,可穿透groupbox控件获取内部控件窗口

## winex.fromClientPoint

**1、函数原型：**

``` aau
hwnd = winex.fromClientPoint(父窗口句柄, 客户坐标x,客户坐标y,un=_CWP_SKIPINVISIBLE )
```


**2、函数说明：**

在指定的父窗口获取、从指定的屏幕坐标获取该位置子窗口句柄(不能获取子窗口的子窗口)。

un为可选参数，默认为_CWP_SKIPINVISIBLE，其他可选参数：

|  参数 |  说明 |
| --- | --- |
| 0x0000/*_CWP_ALL*/ |  测试所有窗口 |
| 0x0001/*_CWP_SKIPINVISIBLE*/ |  忽略不可见窗口 |
| 0x0002/*_CWP_SKIPDISABLED*/ |  忽略已屏蔽的窗口 |
| 0x0004/*_CWP_SKIPTRANSPARENT* / |  忽略透明窗口 |

## winex.fromClientPointReal

**1、函数原型：**

``` aau
hwnd = winex.fromClientPointReal(父窗口句柄, 屏幕坐标x,屏幕坐标y,un=_CWP_SKIPINVISIBLE )
```


**2、函数说明：**

在指定的父窗口获取、从指定的屏幕坐标获取该位置子窗口句柄(不能获取子窗口的子窗口)
可穿透groupbox控件获取内部控件窗口.

## winex.getFocus

**1、函数原型：**

``` aau
hfocus = winex.getFocus( hwnd )
```


**2、函数说明：**

返回指定窗口输入焦点所在的控件句柄，如果参数hwnd是一个控件，则直接返回该控件的句柄。
此函数支持获取外部线程的输入焦点，而 [win.getFocus](libraries/std/win#getFocus) 只能支持当前线程的窗。

3、调用示例

``` aau
import process;
import winex;

//打开控制台
io.open()

//运行记事本
process.execute("notepad.exe")

//查找
var hwnd = win.find("Notepad");//查找父窗口
var hedit = winex.findEx(hwnd,1,"Edit" ); //查找第一个类名为Edit的子窗口

//输出结果
io.print( hedit == winex.getFocus( ) ) //输出为true，可见取得了正确的输入焦点：文本框句柄
```

## winex.click

**1、函数原型：**

``` aau
hwnd = winex.click( 窗口句柄,命令ID )
```


**2、函数说明：**

窗口上的菜单、按钮等都会有一个控件ID，可以使用winex.click函数直接向包含该控件的主窗口发送该ID的命令消息，达到后台模拟点击控件的效果。

可以使用附带的工具：winspy查看控件ID，使用查看资源文件的软件查看菜单项的ID。

## winex.findMenu

**1、函数原型：**

``` aau
hwnd = winex.findMenu( 窗口句柄,菜单标题 | 菜单ID,...... )
```


**2、函数说明：**

第一个参数为目标窗口句柄。
自第二个参数开始可选添加任意多个参数，可用字符串表示菜单项标题，或用数值表示菜单序号。
菜单标题支持 [模式查找语法](libraries/kernel/string/pattern%20syntax) ，菜单序号自1开始(第一个子菜单序号为1。

**3、调用示例：**

``` aau
//导入winex库
import winex;

//查找
var hwnd = win.find("Notepad");//查找父窗口

//查找指定的菜单("文件"菜单下的子菜单"另存为")
hmenu,menuid = winex.findMenu(hwnd ,"文件","另存为"  );

//前置窗口
win.setForeground(hwnd)

//点击菜单项
winex.click( hwnd,menuid)
```

## winex.attach

**1、函数原型：**

``` aau
是否成功 = winex.attach( 窗口句柄,是否附加=true )
```


**2、函数说明：**

参数应指定一个非当前线程的窗口,如果第二个参数为真(可省略参数,默认为真)。

通常，系统内的每个线程都有自己的输入队列。winex.attach允许目标窗口与当前线程共享输入队列。连接了线程后，输入焦点、窗口激活、鼠标捕获、键盘状态以及输入队列状态都会进入共享状态 返回值 Long，非零表示成功，零表示失败， 

调用winex.attach以后,可以在附加的目标窗口使用 win.getFocus() win.setFocus() 等函数,也可以方便的使用winex.key winex.mouse等函数库提供的后台模拟函数.


附加与解除应配对使用,例如调用 winex.attach(hwnd)附加成功以后,在不再需要附加时应调用winex.attach(hwnd,false)解除.

## winex.attachThread

**1、函数原型：**

``` aau
是否成功 = winex.attachThread( 目标线程ID,是否附加=true )
```


**2、函数说明：**

此函数与win.attach的功能一样,区别是第一个参数需指定线程ID,而不是窗口句柄.
其他参考win.attach函数.
