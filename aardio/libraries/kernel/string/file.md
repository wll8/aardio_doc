# 读写文件

 一次性读写文件内容应优先选用string.load string.save而不是使用io对象。

 参考：[io库文件读写函数](libraries/kernel/io/io) [检测文件路径](libraries/kernel/io/path#exist)

## **读文件**

string.load(path,filetype="RES",dllhandle = null )

string.load有三个参数，第一个参数为文件路径。
文件路径可以是普通磁盘文件的路径，也可以是资源文件的资源名字（默认的：aardio创建的exe，资源名字就是文件在硬盘上的相对路径）。

如果在磁盘上找不到文件，string.load会从资源加载文件。
读取资源文件时，默认的资源类型为RES，也可以通过函数的第二个参数指定资源类型。

资源名字、以及资源类型也可以是一个数值的资源ID.

函数的第三个参数指定查找资源文件的执行文件内存模块的句柄(pointer指针类型)，不指定时默认为当前exe.
使用 [raw.loadDll](libraries/kernel/raw/api#loadDll)可以加载dll对象，dll对象提供gethandle() 函数返回dll模块句柄。

## 写文件

string.save(path,str,append=false)

string.save将字符串str保存到path指定的磁盘文件，如果增加append参数（值 为true）则追加到文件尾。


