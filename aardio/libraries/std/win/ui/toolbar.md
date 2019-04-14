# win.ui.toolbar 类

win.ui.toolbar 类主要提供创建并操作工具栏的函数。imageList 属性请参考 [win.imagelist](libraries/std/win/imagelist) 类。

## win.ui.toolbar（构造函数）

**1、函数原型：**

``` aau
tb = win.ui.toolbar( form )
```

 注意：本函数中的 form 参数可以传递窗口句柄，也可以直接传递窗口实例。

**2、函数说明：**

按照给定的父窗口，初始化一个工具栏实例。

**3、调用示例：**

``` aau
import win.ui;
import win.ui.toolbar;
var tb = win.ui.toolbar( winform );
```

 注意：利用本构造函数初始化工具栏实例后，工具栏并不会自动被创建和显示。
 本文档以下所有的 tb 均为 win.ui.toolbar 这个类的实例。

## tb.create

**1、函数原型**：

``` aau
tb.create( )
```

**2、函数说明**：

按照构造函数中给定的父窗口，以及其他给定的属性，在父窗口顶部创建一个工具栏并显示。

## tb.add

**1、函数原型：**

``` aau
tb.add( text, proc, iBitmap = 0 )
```

**2、函数说明：**

向已创建的工具栏中加入一个工具栏按钮。

iBitmap 参数指的是按钮上的图片，图片的来源为 tb 的 imageList 属性（该属性为 win.imagelist 的实例）。0 为不指定图片，1 为第一张图片，2 为第二张，以此类推。

**3、函数示例：**

``` aau
tb.add( "测试", function () {
	win.msgbox( "您按下了工具栏按钮", "aardio" );
} );
```

``` aau
tb.add( "新建", function () {
	win.msgbox( "新建", "aardio" );
}, 1 );
```

## 属性列表

**1、属性说明：**

`tb.flat` 表示工具条是否扁平，默认为 true（该属性仅能在调用 create 方法之前定义）

`tb.showLabel` 表示工具条按钮上是否显示文字，默认为 true

`tb.imageList` 表示工具条按钮上图片的来源（该属性仅能在调用 create 方法之后定义）

## 综合示例

``` aau
import win.ui;
import win.imageList;
import win.ui.toolbar;

// 创建一个 imagelist
var iml = win.imagelist( 16, 16 );
// 添加图片到 imagelist
iml.add(string.load( "\res\toolbar.gif" ), 0xff00ff);
// 初始化一个 win.ui.toolbar 类
var tb = win.ui.toolbar( winform );
// tb.flat = true;
// 工具栏按钮上不显示文字
tb.showLabel = false;
// 创建工具栏并显示
tb.create( );
// 将 imagelist 与工具栏绑定
tb.imageList = iml;
// 添加工具栏按钮
tb.add( "新建", function () {
	// code here
}, 1 );
tb.add( "打开", function () {
	// code here
}, 2 )
```
