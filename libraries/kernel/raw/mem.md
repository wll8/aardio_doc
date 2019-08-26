# raw库 内存操作

 请参考: [静态类型](libraries/kernel/raw/datatype)

## raw.buffer

**1、函数原型：**

``` aau
cdata = raw.buffer( 分配内存长度 | 或结构体对象 )
```


**2、函数说明：**


raw.buffer分配定长的内存,并返回托管指针.
参数如果是一个普通的结构体(struct table).raw.buffer创建相同大小的内存并复制结构体的内存数据.

托管指针一般是由指向aardio分配的内存,内存不再使用时会自动释放,是一种内部指针、伪指针。
raw.buffer创建的托管指针并可在API函数中作为pointer指针类型参数使用,也可以可以使用索引操作符直接读写内存数据．这与aardio中的字符串类似,指定索引返回指定位置的字节码,如果索引溢出(过大或过小)会返回0.

与字符串不同,raw.buffer分配的内存是可读写的.
而字符串指向的内存是只读的.

**3、调用示例：**

``` aau
cdata = raw.buffer( 20 )

//修改内存值
cdata[1] = 65;

//读取内存值
io.open()
io.print( cdata[1] )
```

**4、使用raw.buffer创建可析构对象**

 下面是一个简单的示例:

``` aau
loadImage = function(path) {

	var picon = ::LoadImage( , ..io.fullpath(path)
       ,0x0/*_IMAGE_BITMAP*/,0,0,0x10/*_LR_LOADFROMFILE*/ );

	var cd = ..raw.buffer(1)
	cd@={
		_topointer = function(){
			return picon
		}
		_gc = function(){
			Destroylcon(picon)
		}
	}
	return cd;
}
```



## raw.tostring

**1、函数原型：**

``` aau
字符串 = raw.tostring( 结构体 )
cdata = raw.tostring( cdata托管指针,开始位置=1,结束位置=文本终结符位置 ) //支持用负数表示相对位置
```


**2、函数说明：**


将一个结构体、指针或raw.buffer创建的内存数据转换为普通string对象。
第一个参数是必须的,第二个参数、第三个参数是可选参数。如果不指定结束位置，aardio则按将指针设为指向文本的指针，查找'\0'终结符作为长度，并返回全部字符串
