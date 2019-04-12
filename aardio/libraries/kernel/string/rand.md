# 随机数、随机字符串

## 随机字符串

**str = string.random( len [, seed] )**

返回长度为len的随机字符串，seed为可选参数指定供随机选择字符的字符串(默认值为英文字母、数字)。
seed参数可以使用中英文字符。
io.open()
io.print( string.random(10  ) )
io.print( string.random(10 ,"seed参数可以使用中英文字符。") )


**str = string.random( str [, str2[, ...]] )**

参数为多个字符串，随机选择其中一个字符串并作为返回值。
io.open() 
io.print( string.random( "待选字符串","待选字符串2","待选字符串3") );

## **随机数**

n = math.random(min,max)

指定最小随机数min，最大随机数max，返回[5,99]之间的随机数，如果不指定参数返回(0,1)之间的小数。


## 随机数发生器

请运行下面的创建随机数、随机字符串示例：

> 
io.open();//打开控制台

最小数 = 1;
最大数 = 1000
随机数 = math.random(最小数,最大数)   //生成随机数
io.print( 随机数   )?

随机选择字符串 = string.random("字符串一","字符串二","字符串三")
io.print( 随机选择字符串 )


长度 = 3
随机中文字符串 =   string.random( 长度, "这是中文字符集" )
io.print( 随机中文字符串 )

随机英文数字字符串 =   string.random(长度)
io.print( 随机英文数字字符串 )

 你会发现每次的随机数都一样。

math库提供了一个可以改变随机数队列的函数 。math.randomize(随机数发生器种子)
math.randomseed的参数可以是一个任意的数值，省略参数时，默认调用time.tick获得系统启动的毫秒数作为参数。

math.randomize在一个aardio程序中仅需调用一次就够了，一般不需要反复的调用。


> 
io.open();//打开控制台


          **math.randomize()**

随机数 = math.random(1,100) //生成随机数
io.print( 随机数 )?

随机选择字符串 = string.random("字符串一","字符串二","字符串三")
io.print( 随机选择字符串 )


长度 = 3
随机中文字符串 =   string.random( 长度, "这是中文字符集" )
io.print( 随机中文字符串 )

随机英文数字字符串 =   string.random(长度)
io.print( 随机英文数字字符串 )


 上面是加上math.randomize以后的代码 ，每次运行将会返回不同的随机数。
