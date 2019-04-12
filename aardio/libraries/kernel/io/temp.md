# io库

 请参考: [io库 文件读写函数](libraries/kernel/io/io)

## io.open("")

使用io.open打开文件时,如果文件路径是一个空字符串,则创建临时文件对象,例如:

tempfile = io.open("") //文件名为空则创建可读写的临时文件

请参考: [io.open](libraries/kernel/io/io#open)

## **io.tmpname**

**1、函数原型：**

``` aau
var tempname = io.tmpname( 是否在应用程序根目录下 )
```


**2、函数说明：**

 生成临时的文件路径名,如果省略参数则返回系统临时目录下的临时的文件路径名.否则返回aardio应用程序根目录下的临时的文件路径名.

 注意该函数仅返回路径名字,并保证没有其他文件使用该名字,但是并不会创建文件.

**3、调用示例：**

``` aau
io.open()
io.print( io.tmpname() )
io.print( io.tmpname(true) )
```
