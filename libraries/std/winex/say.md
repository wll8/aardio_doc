# 发送文本

winex库提供自动发送文本的函数

## winex.sendString

**1、函数原型：**

``` aau
winex.sendString( 文本,窗口句柄 = 前台窗口 )
```

**2、函数说明：**

 如果指定窗口句柄，该函数调用 [winex.getFocus](libraries/std/winex/winex#getFocus) 自动获取输入焦点并发送文本。
 如果窗口句柄是一个控件的句柄，并且不包含子窗口，则直接向该控件发送文本。
 如果省略窗口句柄，则自动在前台窗口中查找输入焦点然后发送文本。 

## winex.say

**1、函数原型：**

``` aau
winex.say( 文本,窗口句柄 = 前台窗口 )
```

**2、函数说明：**

 用法与 winex.sendString 相同，唯发送文本的实现方式不同。
 窗口句柄为可选参数,如果不设置则自动查找前台输入焦点所在窗口.


**3、函数示例：**

``` aau
//适用于 QQ 2010 ( 2010/08/17 )
import winex;
import key;

//查找并激活QQ聊天窗口
hwnd = winex.findActivate("^[^TQ][^XQ].+",null,"TXGuiFoundation");

//循环发送聊天内容
for(i=1;2;1){
    winex.say("聊天内容",hwnd) //或者 shift_insert("聊天内容")
    key.combine("CTRL","ENTER")
    key.press( "ENTER" )
    win.delay(1000)
}
```



## winex.say2

**1、函数原型：**

``` aau
winex.say2( 文本,窗口句柄 = 前台窗口 )
```

**2、函数说明：**

 用法与 winex.sendString 相同，唯发送文本的实现方式不同。
 窗口句柄为可选参数,如果不设置则自动查找前台输入焦点所在窗口. 


**3、函数示例：**

``` aau
//适用于 QQ 2010 ( 2010/08/17 )
import winex;
import key;

//查找并激活QQ聊天窗口
hwnd = winex.findActivate("^[^TQ][^XQ].+",null,"TXGuiFoundation");

//循环发送聊天内容
for(i=1;2;1){
    winex.say2("聊天内容",hwnd)
    key.combine("CTRL","ENTER")
    key.press( "ENTER" )
    win.delay(1000)
}
```



## winex.sayIme

**1、函数原型：**

``` aau
winex.sayIme( 文本,窗口句柄 = 前台窗口 )
```

**2、函数说明：**

 用法与 winex.sendString 相同，唯发送文本的实现方式不同。
 窗口句柄为可选参数,如果不设置则自动查找前台输入焦点所在窗口.


**3、函数示例：**

``` aau
//适用于 QQ 2010 ( 2010/08/17 )
import winex;
import key;

//查找并激活QQ聊天窗口
hwnd = winex.findActivate("^[^TQ][^XQ].+",null,"TXGuiFoundation");

//循环发送聊天内容
for(i=1;2;1){
    winex.sayIme("聊天内容",hwnd) //或者 shift_insert("聊天内容")
    key.combine("CTRL","ENTER")
    key.press( "ENTER" )
    win.delay(1000)
}
```



## 使用剪贴板发送文本


**示例：**

``` aau
//适用于 QQ 2010 ( 2010/08/17 )
import winex;
import key;
import win.clip

//定义发送文本的函数
shift_insert = function(str){
    win.clip.write(str)
    key.combine("SHIFT","INS")
    win.delay(100)
}

ctrl_v = function(str){
    win.clip.write(str)
    key.combine("CTRL","V")
    win.delay(100)
}

//查找并激活QQ聊天窗口
hwnd = winex.findActivate("^[^TQ][^XQ].+",null,"TXGuiFoundation");

//循环发送聊天内容
for(i=1;2;1){
    ctrl_v("聊天内容") //或者 shift_insert("聊天内容")
    key.combine("CTRL","ENTER")
    key.press( "ENTER" )
}
```


