# 数据类型

## 基本数据类型

|  基本数据类型 |  值 |  说明 |
| type.null | null |  空值，所有变量默认初始值为null |
| type.boolean | true、false |  布尔值，表示条件真、假 |
| type.number |  数值 |  数值 |
| type.string |  字符串 |  字符串 |
| type.table |  数组、哈希表 |  集合(collection) |
| type.function |  函数 |  函数 |
| type.pointer |  普通指针 |  指针通常来自API函数. 指针给你最大的自由,同时也带来最大的风险,如果你不是清楚的了解指针指向内存的分配释放规则，尽可能的避免直接使用此类型。在aardio中指针通常用来保存一个内存地址，或者一个系统对象句柄值。 |
|  动态指针 |  动态指针并不是一个新的类型 - 而是与普通指针拥有相同的数据类型,
raw.realloc()函数可用于分配、释放一个动态指针，并且可以使用raw.realloc()再次调整该指针分配的内存大小，动态指针的地址是可变的，调整大小后指针变量应当更新为返回的新指针。

动态指针可以作为普通指针使用，但是当你把动态指针传入可以识别此类型指针的raw.realloc() raw.concat() raw.sizeof() 等函数，
aardio可以获取到一个头信息（用于记录内存大小、存储的数据大小），
动态指针会在返回给用户的指针地址前面倒退8个字节记录2个32位字段的内存、数据长度信息，然后总是向后移动8个字节将可用的指针地址返回给用户，

并且在内存的尾部总是保留2个字节置0用于兼容C风格字符串，
这种指针也可以象普通指针一样用于API函数等可以使用指针的地方，
可以用raw.sizeof()获取这种指针指向内存的大小，可以使用raw.concat()函数对这种指针的内存追加拼接数据。与缓冲区不同的是，如果不指定初始化值,raw.realloc就不会对分配的内存设定初始化值，并且aardio不负责自动释放动态指针分配的内存，显式的调用 raw.realloc(0,动态指针) 才能释放一个动态指针。 |
| type.buffer |  缓冲区指针 |  使用 raw.buffer()
      函数分配的一块可读写内存的指针，缓冲区在aardio中可以像字符串一样作为一个字节数组使用，可以用#操作符取长度，用[]下标操作符取字节值，字符串是常量字节值是只读的，但缓冲区的字节值不但可读，也可以写入，缓冲区在很多字符串函数中都可以作为字符串使用，在API函数中可以作为指针使用。 与动态指针不同的是，即使你不指定初始值，aardio仍然会初始化所有字节的值为0，
并且你无法动态调整缓冲区的大小，你不必要也没办法手动释放缓冲区分配的内存，只能由aardio自动回收。 |
|
| type.cdata |  内核对象 | aardio内核对象，例如math.size64()函数创建的长整数对象。 |
| type.fiber |  纤程 |  协同程序 |
| type.class |  类 |  类 |

## **null(空值** )

null即变量没有存储任何数据，将一个变量赋值为null等于删除这个变量

## **boolean(逻辑布尔值** )

有两个值,true表示真、 false 表示假。通常用在条件表达式中。
通俗一点说,true表示是、符合条件,false表示不是、不符合条件。

在条件表达式(恒等式除外)中， null、数值0这认为是false，
其他有效的数据都被认为是true。
 与C++类似，aardio认为0为false，非零数值为true，在外部api函数中可以保持一致。

## **number(数值)**

aardio中的数值为64位双精度浮点数,数值类型可以使用不同的进制来表示，参考：[数值与进制](the%20language/datatype/number) 
使用0x前缀表示十六进制数，例：num = 0xA1 + 0xFF，而使用2#前缀可以表示2进制数，使用8#前缀可以表示8进制数。也可以用科学计算法表示数值 num = 6e+20
 把一个大于10的数写成a * 10<sup>n</sup> 的形式，其中a称为尾数、n称为指数，是整数数位只有一位的数，这种计数法叫做科学计数法，也叫10的幂计数法。例如 x= -3.5×10<sup>5</sup> 这里最前面有一个负号，3.5是尾数，两个有效数字，后面以10为基数的指数为5。我们可以将它表示为-3.5E5。

## **string(字符串** )

 请参考[《字符串与编码》](the%20language/datatype/string)

## table(表)

 请参考[《表》](the%20language/datatype/table)

## **function** (函数)


 函数是一个子程序，可以接收零个或多个参数、返回一个或多个值。使用function 关键字定义函数，使用()操作符调用函数。请参考：[定义函数](the%20language/function/definitions)

## **class(类)**


 使用class关键字定义类。类可以动态创建数据结构相同的table对象。
请参考：[class](the%20language/class/class)

## **fiber** (纤程)


fiber.create()创建并返回的纤程对象。
纤程类似线程,但不是线程.
 纤程有独立的运行堆栈,并且也可以暂停或继续运行,但是纤程并不会创建新的线程,也不能同时运行多个纤程.

 请参考：内置库->纤程库

## 转换数据类型



数值、字符串会自动转换，但是我们也可以用aardio提供的函数强制转换。

aardio提供三个强制转换动态类型的函数

* tostring(v) 转换参数v为字符串，可使用_tostring元方法自定义转换函数。
* tonumber(v) 转换参数v为数值，可使用_tonumber元方法自定义转换函数。
* topointer(v) 转换参数v为指针，可使用_topointer元方法自定义转换函数。

> io.open(); //打开控制台窗口,用来支持io.print函数
n = tonumber( "2" );//tonumber函数强制转换一个变量为数字，如果失败返回null空值
str = tostring( 2 );//强制转换一个变量为字符串，如果失败返回null空值
ptr = topointer( 123 ); //强制转换为指针，如果失败返回null空值
io.print( type(n),type(str),type(ptr) );

## 使用type函数可以读取数据类型。

**1、函数原型：**

``` aau
dataType[,structType][,metaType] = type( any )
```


**2、函数说明：**

type函数返回对象的基本数据类型dataType。
 如果对象是一个struct结构体，则返回结构体类型structType。
 如果对象在元表中指定了_type字段的值，则返回元类型metaType。

aardio用字符串描述类型，所以返回的类型都是字符串,
 如果没有任何参数,type函数无返回值.


**3、调用示例：

**


### ![](typelist.gif)

io.open(); //打开控制台窗口

io.print( type(null) , type.null );//显示null , null
io.print( type("Hello world") ,
type.string );//显示 string , string
io.print(
type(1000) , type.number );//显示 number ,
number
io.print( type(io.print) , type.function );//function , function
io.print( type( class{} ) ,
type.class );//显示 class , class
io.print(
type(true) , type.boolean );//boolean ,
boolean
io.print( type( io.stdin ) , type.cdata );//显示 cdata , cdata
io.print( type( {x=0;y=0} ) ,
type.table );//显示 table , table
io.print( type(
topointer( 1 ) ) , type.pointer );//显示 pointer ,
pointer

## 使用type.eq比较数据类型

**1、函数原型：**

``` aau
eq = type.eq( obj,obj2 )
```


**2、函数说明：**

比较参数一、参数二的类型、元类型、sturct类型，如果完全相等返回true，否则返回false

**3、调用示例:**

``` aau
import time.ole
io.open(); //打开控制台窗口

var oletm = time.ole();
var tm = time();

//type.eq严格比较所有类型(基础类型、元类型、struct类型)
if( type.eq( oletm,tm ) ){
	io.print("oletm,tm类型相同")
}
else{
	io.print("oletm,tm类型不相同")
}

//time.istime不比较元类型，因此兼容oletime
io.print( "是datetime对象吗?",time.istime(oletm) )

execute("pause") //按任意键继续
io.close();//关闭控制台
```
