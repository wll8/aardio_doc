# com 基础知识

com具有与语言，平台无关的特性，aardio提供com库对com组件提供支持。

## COM组件

com(Component Object Model组件对象模型)是开发软件组件的一种方法。com组件实际上是一些小的二进制可执行程序，它们可以给应用程序，操作系统以及其他组件提供服务。在COM构架下，人们可以开发出各种各样的功能专一的组件，然后将它们按照需要组合起来，构成复杂的应用系统。可以在多个应用系统中重复利用同一个组件；可以方便的将应用系统扩展到网络环境下；COM具有与语言，平台无关的特性，aardio提供com库对com组件提供支持。

## CLSID与ProgID

每个COM接口和组件类都有一个全球唯一的标识符GUID，接口的标识符叫做IID，组件类的标识符叫CLSID(其实都是GUID)，组件类还可以用一个别名ProgID来标识，ProgID由类名+工程名组成,例如flash控件的ProgID: "ShockwaveFlash.ShockwaveFlash"

aardio标准库中有一个win.guid库,可以创建转换guid,下面是一个将ProgID转换为GUID的示例:

``` aau
import win;
import win.guid

guid = win.guid.fromString("ShockwaveFlash.ShockwaveFlash")
win.msgbox(guid)
```

下面是将CLSID转换为ProgID的示例:

``` aau
import win;
import win.guid

str = win.guid.toProgId("{d27cdb6e-ae6d-11cf-96b8-444553540000}")
win.msgbox( str )
```

## 动态接口、静态接口

com有两种类型的接口,一种是动态语言用到的IDispatch接口,一种是静态语言用到的静态接口.
在aardio中可同时支持双接口,在aardio中我们将IDispatch接口称为动态接口,而非IDispatch类接口称为静态接口.

动态接口:IDispatch接口对象,使用一个封装接口指针的table对象,元类型为com.IDispatch,使用[com.GetObject](libraries/kernel/com/com#CreateObject) [com.CreateObject](libraries/kernel/com/com#GetObject) [com.QueryObject](libraries/kernel/com/com#QueryObject) 等函数创建.

静态接口:基于IUnknown指针实现的非IDispatch接口,在aardio有两种IUnknown指针,一种是type.pointer类型的裸指针,一种是type.cdata类型的托管指针,托管指针的类型描述为元类型为com.IUnknown 

使用[com.GetPointer](libraries/kernel/com/com#topointer) 可以获取一个com.IDispatch对象的IUnknown祼指针.
也可以使用[com.GetIUnknown](libraries/kernel/com/com#GetIUnknown) 函数获取com.IDispatch对象的IUnknown托管指针.
托管指针可自动释放,或调用com.Release()显式释放.而pointer类型指针则必须手工调用com.Release()显式释放
使用[com.GetIUnknown](libraries/kernel/com/com#GetIUnknown)函数也可以将一个poineter指针转换为托管指针(com.IUnknown对象).

使用pointer类型的IUnknown指针时你必须小心控制引用计数..如果你将一个非IUnknown指针作为IUnknown指针使用,或者没有按com规则来释放他,那么可能会直接导致程序崩溃.


使用com.IsObject函数可以判断一个对象是否com.IDispatch对象.
使用com.IsIUnknown函数可以判断一个对象是否com.IUnknown托管指针.
