# 分行迭代读取文件

io.lines(file = io.stdin )

io.lines自动打开通过file参数指定路径的文件。
file参数也可以是使用io.open打开的文件对象，省略file参数则使用默认值io.stdin。

io.lines创建一个[迭代器](the%20language/statements/looping#forin)， 支持在[泛型for](the%20language/statements/looping#forin)循环中逐行读取文件，在读取完毕以后自动关闭文件对象。使用io.lines可以避免一次性读取太大的文件。 

io.open();//打开控制台窗口

for line in io.lines("d:\test.txt") { 

   //io.lines()返回的迭代器函数每次读取文件中的一行 
io.print(line);
}

使用 file.read函数可以实现类似的功能：

io.open();//打开控制台窗口

file = io.open("d:\test.txt")

line = file.read();//读取下一行
while( line ) {
io.print(line);
line = file.read();//读取下一行
}

file.close(); 

下面是在控制台使用io.lines的示例：

``` aau
io.open()//打开控制台
io.print("您可以输入aardio代码回车运行
输入exit并回车退出");

for line in io.lines( ) {
    if(string.lower(line)=="exit")break;
    try{//容错语句
	    io.print( loadcode(line)() );//执行用户输入的aardio代码
    }
    catch(e){//捕获错误信息
	    io.print(e)
    }
}

io.close()
```
