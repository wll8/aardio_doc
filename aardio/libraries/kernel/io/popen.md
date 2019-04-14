# 管道

### io.popen (prog , mode = "r" ).

您是否希望运行控制台程序，并且得到返回的内容呢？以前我们使用ＤＯＳ重定向输入命令输出到文件再读取。
现在，我们可以使用popen方法以一个子进程来运行一个命令，并且把这个进程的标准输入和标准输出绑定IO对象。向IO对象写数据，子进程就可以从它的标准输入读取数据，而子进程输出的数据，也可以通过aardio的IO对象读出来。

``` aau
f = io.popen("ipconfig /all" )
str = f.read( -1 );
f.close();

io.open(); //打开控制台
io.print(str); //输出
```

轻松读取了 ipconfig返中的全部数据。

### process.popen

这是标准库里提供管道功能的支持库,其功能类似 io.popen,但更强大一些,
可以隐藏进程窗口,并且可以同时打开读写管道.下面是一个简单示例:

``` aau
import process.popen

//打开命令行,隐藏命令行窗口
prcs = process.popen("cmd.exe")
cmd = /*
CD C:\
C:
dir
mkdir test
rmdir test
*/

prcs.write(cmd)
result = prcs.peekTo(">");
prcs.write('exit\n')

//显示结果
io.open()
io.print( result )
```
