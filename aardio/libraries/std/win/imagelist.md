# win.imageList 类

win.imageList 类主要提供对图片列表的支持。用到这个类的控件有：[win.ui.toolbar](libraries/std/win/ui/toolbar) 类

## win.imageList 构造函数

**1、函数原型：**

``` aau
win.imageList( 宽度, 高度 )
win.imageList( 句柄 )
```

**2、函数说明：**

创建一个图像列表(win.imageList对象).
如果构造参数指定图像句柄，则使用该句柄指向的图像创建图像列表，否则按给定大小创建图像列表。

**3、函数示例：**

``` aau
import win.imageList;
// 初始化一个 win.imageList 类
var iml = win.imageList( 16, 16 );
// 提供其他 imageList 的句柄，并从中读取图片列表
var iml2 = win.imageList( iml.handle );
```

 注意：本文档以下所有的 iml 均为 win.imageList 这个类的实例。

## iml.add

**1、函数原型：**

``` aau
iml.add( pic, color=0xff00ff )
```

**2、函数说明**

向已创建的 win.imageList 实例中添加图片。

> pic：图片路径或图片数据
color：图片透明色，此参数可省略，默认值为0xff00ff

**3、函数示例：**

``` aau
iml.add( "\res\imageList.gif" );
iml.add( $"\imageList.gif" );
iml.add( $"C:\imageList.gif", 0xff00ff ); //使用$可以包含图片文件到编译后的程序中
```

 如果添加的图片比初始化时给定的大小大，将自动分割图片成为若干张小图片，
 具体请看 UI窗体 -> 工具栏控件 范例。
