# 读写结构体

file对象支持读写结构体(struct table),请参考:[io函数](libraries/kernel/io/io) [静态数据类型](libraries/kernel/raw/datatype)

## 读写结构体

[file.write](libraries/kernel/io/io#write) 或 [file.read](libraries/kernel/io/io#read)都可以指定任意多个参数,按顺序在文件流中写入或读取数据,而这两个函数都支持结构体(table struct),只要指定了table成员的静态类型,可以非常简单的从文件中读写结构体的内存数据.

**示例代码：**

``` aau
io.open()

//自定义一个结构体
var mystruct ={
	int a = 134;
	byte b[12] ="我是配置文件"
}
//创建一个文件对象
var f = io.open("/bin.bin","w+")

//写入结构体
f.write('下面是一个结构体\r\n',mystruct) //可以写入任意多个参数
//从缓冲区写到文件
f.flush()

//移动读写指针到文件开始
f.seek("set")
//再读取结构体
desc,mystruct = f.read("%s"/*%s表示读取一行*/,mystruct)

//关闭文件
f.close();

io.print( desc )
io.print( table.tostring(mystruct)   )
```
