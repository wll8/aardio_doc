# 控制web窗体

 参考:[创建web窗体](web/webform)

## 控制web窗体

我们可以使用web窗体提供的函数控制web窗体的动作。

?> 本手册中约定使用 wb变量名表示web.form类创建的web窗体对象.使用ele表示web窗体中的元素对象,这也是aardio中默认约定具有特殊意义的变量名,不应将这些默认变量名用于其他目的.

## wb.go

**1、函数原型：**

``` aau
wb.go(网址,自定义http请求头,目标窗口="_self")
```


**2、函数说明：**

一般我们仅需指定需要打开的目标网址就可以了,其他参数为可选参数.
http请求头一般是以冒号分隔的键值对组成，多个键值对之间以回车换行('\r\n')分隔.
例如:

``` aau
'\r\nContent-Type: application/x-www-form-urlencoded'
```



**3、调用示例：**

``` aau
//....省略创建web窗体的代码,请在中点击"主菜单->新建文件->新建web窗体"

wb.go("http://www.aardio.com/")
```

## wb.post

**1、函数原型：**

``` aau
wb.post( 目标网址,要提交的数据
    ,自定义头='\r\nContent-Type: application/x-www-form-urlencoded',目标框架="_self")
```


**2、函数说明：**

这个函数类似wb.go,打开一个网址,各参数的用法类似.
不同的是多了第二个参数,在第二个参数中可以指定要自动提交的数据.

实际上我们在网页上看到登录、发贴之类的表单，填写好内容以后点击提交，最后浏览器都是执行一个post提交的动作.所以调用这个函数实际上省略了填写表单的过程.直接达到目的,与手工填表然后提交达到的效果是一样的.因为服务器根本不知道你在自已的电脑上做了什么,他只是从你post提交的数据来判断下一步该给你展现什么样的内容

**3、调用示例：**

``` aau
//....省略创建web窗体的代码,请在中点击"主菜单->新建文件->新建web窗体"

//打开目标网站
wb.post("C:\Documents and Settings\crane\Desktop\aardio\Tools\post.html"
    ,"username=aardio&password=aardio&question=0&answer=&templateid=0" )
```

## 链接资源文件

如果将网页置于资源目录,在开发时该文件是硬盘文件，发布后根据发布选项，可能是内嵌的资源，也可以发布为硬盘文件，在aardio中例如string.load等函数都可以自动识别支持两种发布方式,无需修改代码.

wb.go,web.post等函数也可以智能支持资源文件中的网页,并可支持网页中的相对路径(图片等附件的路径).
在web.form中定义了一个函数web.mapurl(url)可自动检测资源文件的存储方式，并转换为正确的资源网址。而wb.go等函数会自动调用web.mapurl获得正确的网址.

## wb.goback

**1、函数原型：**

``` aau
wb.goback()
```


**2、函数说明：**

后退到上一次打开的网页.可以响应 [wb.CommandStateChange](web/event#CommandStateChange) 来判断是否可以后退.

## wb.goforward

**1、函数原型：**

``` aau
wb.goforward
```

**2、函数说明：**

返回后退之前的网页. .可以响应 [wb.CommandStateChange](web/event#CommandStateChange) 来判断是否可以后退.

## wb.gohome()

**1、函数原型：**

``` aau
wb.gohome()
```


**2、函数说明：**

打开主页

## wb.gosearch

**1、函数原型：**

``` aau
wb.gosearch()
```


**2、函数说明：**

打开搜索页

## wb.refresh

**1、函数原型：**

``` aau
wb.refresh()
```


**2、函数说明：**

刷新页面,如果服务器未更新不会重新下载，类似在浏览器中按F5的效果

## wb.refresh2

**1、函数原型：**

``` aau
wb.refresh2()
```


**2、函数说明：**

重新下载页面.强制刷新客户端缓存.

## wb.refresh3

**1、函数原型：**

``` aau
wb.refresh3()
```


**2、函数说明：**

重新下载最新页面,添加Pragma:no-cache请求头,强制刷新服务器缓存,类似在浏览器中按下Ctrl+F5的效果

## wb.stop

**1、函数原型：**

``` aau
wb.stop()
```


**2、函数说明：**

停止当前导航

## wb.write

**1、函数原型：**

``` aau
wb.write( 要写入的HTML代码,框架名 )
```


**2、函数说明：**

向web窗体指定框架窗口写入HTML代码,框架名可省略,默认写入顶层窗口.

该函数结束会关闭输出缓冲,每次调用wb.write都会覆盖以前的写入的内容.

## wb.document.write

**1、函数原型：**

``` aau
wb.document.write( 要写入的HTML代码 )
```


**2、函数说明：**

该函数类似wb.write写入HTML到网页,区别在于不能指定框架窗口,并且在函数结束后不会关闭输出缓冲,即每次写入的内容会追加到上一次写入的内容后面,在最后一次写入HTML时调用 wb.write函数可以关闭输出缓冲.

请参考:[wb.document](web/getele#document)
