# string库

 请参考：[数据类型 - 字符串](the%20language/datatype/datatype#varstring) [类型转换](the%20language/datatype/datatype#convert) [取长操作符](the%20language/operator/len) [字符串连接操作符](the%20language/operator/concat)

## string.len

**1、函数原型：**

``` aau
字符数 = string.len(字符串)
```


**2、函数说明：**

 与#操作符返回字节数目不同，该函数返回字符串中的字符数目.


**3、调用示例：**


``` aau
io.open();//打开控制台

str = "中文"
io.print(
	string.len(str) //显示2个字符
	,#str  //显示在UTF8编码下占用6字节
	)

execute("pause")
```

## string.cmp

**1、函数原型：**

``` aau
ret = string.cmp(字符串,字符串2,比较长度=null)
```


**2、函数说明：**

 比较字符串前n个字符串字典序的大小(不区分字母大小写)
 从第一个字符开始比较，如果能比较出大小则马上返回。字符串相等返回0.

 比较长度是可选参数,默认值为取两个字符串长度的最大值.
 如果比较长度大于两个字符串的长度,返回值为不相等.


**3、调用示例：**


``` aau
io.open();//打开控制台

io.print(
	string.cmp("abc","ABC")
	,0
	)

io.print(
	string.cmp("abcd","ABC",3)
	,0
	)

io.print(
	string.cmp("abc","ABCd",3)
	,0
	)

io.print(
	string.cmp("zbc","aBC")
	,1
	)

io.print(
	string.cmp("abc","zBC")
	,-1
	)

execute("pause") //按任意键继续
io.close();//关闭控制台
```

**str2 = string.reverse(str)**

字符串倒序排列。

**chr = string.unpack(str, i [,j] )**

 取字符串str的第i个字符到第j个字符的字节码(整数值)；
 第二个参数可以省略(使用默认值1)。

chr = string.unpack("A");

io.open(); 
io.print(chr); //显示65
**str = string.pack(   chr[,...] | tarrchars )**

 参数一个或多个整数值，或由数值组成的table数组，
string.pack将每个整数作为字符的字节码并连接成一个字符串返回。

 例如: str = string.pack(65,66,67);
str = string.pack( {65;66;67} ); //参数也可以是一个数组
io.open( ); 
io.print(str); //显示ABC

**str2 =string.lower(str)**

将字符串str转换为小写

**str2 = string.upper(str)**

将字符串str转换为大写

## 只读的字符串内存

aardio从不改变现有的字符串,字符串内存是只读的，所有相同的字符串会指向同一内存地址，而修改字符串总是返回新的字符串。

string库所有的函数都是纯函数，遵守一个入口(参数)，一个出口(返回值)的原则，所以不要忘记使用返回值接收被改变的字符串。
str = "abc";
string. **upper** (str); //这样的代码没有任何意义,也不会改变str
 正确的写法如下:
str = "abc";
str = string. **upper** (str);//不要忘记使用返回值接收被改变的字符串
 这个规律适合所有截取字符串、改变字符串的函数.
