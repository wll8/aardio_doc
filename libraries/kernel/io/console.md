# 控制台

 控制台程序是为了兼容DOS程序而设立的，这种程序的执行就好像在一个DOS窗口中执行一样，没有自己的界面。

## 打开关闭控制台窗口

### io.open()

显示控制台窗口。


### io.close()

关闭控制台窗口。

## 标准输入输出对象

默认的用 io.open() 打开控制台窗口以后，
标准输入输出的目标是控制台窗口。

> io.stdout
标准输出对象。
>
> io.stdin
标准输入对象。
>
> io.stderr
标准错误输出对象。

标题输入对象可以读取用户输入，而标准输入可以向控制台窗口输出内容。

使用方法与io.open打开的文件流相同。请参考：[io](libraries/kernel/io/io)

## 控制台输入

**1、函数原型**

``` aau
str = io.getText( 缓冲区大小=100 )
str = io.getText()
```

**2、函数说明**

从控制台读取用户输入文本,用户输入后回车换行则该函数返回.
此函数功能类似 io.stdin.read() ,但io.getText()对控制台字符串提供更好的支持.
