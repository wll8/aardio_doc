# 使用结构体

 请参考: [静态类型](libraries/kernel/raw/datatype)

## 在API函数中使用struct结构体

API在函数参数中,无论是否输出参数,所有结构体都是按引用转递的结构体指针,
如果需要在API参数中按值传递结构体,则需要将结构体成员展开为普通参数.

例如PtInRect的C语言函数原型为:

``` aau
BOOL PtInRect( RECT *lprc,POINT pt);
```


 第二个参数的POINT结构体是按值传递,而POINT结构体的成员为{int x;int y}
 那么转换为aardio声明的格式如下:

``` aau
::PtInRect := ::User32.api( "PtInRect", "int(struct lprc, int x, int x)" );
```

下面是一个在API函数参数中使用结构体的完整范例程序:
//在API函数中使用结构体

  //=====================================================

//导入DLL
User32 := raw.loadDll("User32.dll");
//声明API函数
GetCursorPos := User32.api( "GetCursorPos", "word(struct& point)")

//通常，我们使用class来定义API函数中需要用到的结构体：
class Point {
int x=0; 
int y=0;
};

/* aardio 允许在table或class成员的键名字前面添加一个描述性标识符，标识符遵循普通变量命名规则。
可以通过"_struct" 只读字段再次读取所有的API数据类型描述。*/

//创建一个新的结构体
p = Point();

//使用API函数
GetCursorPos(p);
//p是按引用传递的参数
io.print(p.x,p.y)

## 转换结构体类型

**1、函数原型：**

``` aau
raw.convert( 源数据,目标结构体,偏移量=0 )
```


**2、函数说明：**

 将源数据转换为目标结构体数据,偏移量是可选参数,默认为0.
 第一个参数可以是结构体(struct table)、pointer指针、或string变量,或者是raw.buffer创建的cdata对象.
 第二个参数必须是结构体(struct table)。

**3、调用示例：**

下面是使用raw.convert编写的一个数值类型转换小程序。
io.open() 

var  to = { 
union u= { //union联合体表示几个变量共用一个内存位置，利用此特性，可以将同一数据转换为不同的数据类型。
byte byte = -1;
BYTE ubyte = -1; 
} 
} 

var from =
  { byte x= -1 }


io.print( raw.convert(  from, to ).u.ubyte ) //将 -1 转换为无符号单字节数值 255

## 获取结构体内存长度

**1、函数原型：**

``` aau
raw.sizeof( 目标结构体 | 或静态类型名字 )
```


**2、函数说明：**

 返回结构体的内存长度，参数可以是一个结构体(struct table)，也可以是一个字符串形式的API数据类型名字。

io.open() 

var struct = { 
union u= {
byte byte = -1;
BYTE ubyte = -1; 
};
int n = 123;
} 

io.print( raw.sizeof( struct ) )

## 自定义结构体对齐大小


 在结构体中可以使用成员 _struct_aligned  自定义对齐大小。
 例如C/C++中定义结构体时使用 #program pack(n)，aardio则需要在结构体中添加 _struct_aligned = n

 示例：


``` aau
import console;

console.log(
    raw.sizeof( {
        int x;
        LONG y;
        _struct_aligned = 1;
    } )
)
```

## 声明动态数组


 在aardio中，
 一个C、C++组件中要用到的静态数组通常被声明为结构体，
 例如：

``` aau
var arr  =  {
    int value[2] = {1;2}
}
```

 这相当于在语言中这样写:

``` aau
int arr[2] = { 0,1 };
```

 有时候我们并不能在编写代码时确定数组的长度，
 在aardio中可以使用length属性指定长度，例如:

``` aau
var arr  =  {
    int value[] = { length = 99/*可以使用变量*/ }
}
```

 如果数组的元素是结构体时，
 则至少需要指定第一个元素的值（aardio由此获得类型定义）
 示例如下：

``` aau
var arrLength = 99;
var arr  =  {
    struct value[] = {
    	length = arrLength; //指定数组长度
    	{
    		int x;
    		int y;
    	}; //至少指定第一个元素的值
    }
}
```

 如果没有使用length指定数组长度，那么aardio将获取数组的实际长度，
 对于BYTE,byte,WORD,word等值可以为字符串的类型 - 则使用字符串确定数组长度。

## raw.toarray 创建动态数组

**1、函数原型：**

``` aau
array_c = raw.toarray( 源数组|或指定数组长度, 静态类型名 = "struct", arrname = "array" )
```


**2、函数说明：**

 该函数创建一个结构体,并根据从第一个参数获取的长度创建静态类型数组.第二个参数每定静态类型名字,默认为"struct",第三个参数指定创建的数组成名名称.

 可以在第一个参数中直接指定数组长度,也可以指定一个table数组 - 用以初始化静态类型数组的值.


**3、调用示例：**

``` aau
import win;

//创建一个结构体
数组 = {}
数组[1] = ::POINT()
数组[1].x = 24123
数组[1].y = 888

数组[2] = ::POINT()
数组[2].x = 45645
数组[2].y = 999

//转换为API数组
array_c = raw.toarray( 数组 )
```

上面的代码等价于:

``` aau
array_c =  {
    struct array[] = {}
}

array_c.array[1] = ::POINT(24123,888)
array_c.array[2] = ::POINT(45645,999)
```

在静态类型声明中,数组长度不能在运行时修改.raw.toarray的意义在于支持运行时创建动态长度的静态数组.

**4、在静态类型中使用动态数组 完整示例：**

``` aau
//接声明定长API数组
c ={

    struct array[24] = {
        { int int=0; float float=0.0; }
    }

}

//动态长度的API数组 ，用raw.toarray创建定长的数组，再指定任意个数组成员
c2  = raw.toarray( 24 )
c2.array[1] = {
    int int=0;
    float float=0.0;
}

//创建动态长度的API数组 方法三 将定长的table直接转换为数组
array = {}
for(i=1;24;1){
    array[ i ]={
        int int=0;
        float float=0.0;
    }
}
c3 = raw.toarray( array )

//打开控制台
io.open()
//计算静态类型长度，看看是不是一致
io.print( raw.sizeof( c ),raw.sizeof( c2 ) ,raw.sizeof( c3 ) )
```

## 将结构体转换为字符串

请参考: [raw.tostring](libraries/kernel/raw/mem#tostring)

## 将结构体转换为托管指针

请参考:[raw.buffer](libraries/kernel/raw/mem#malloc)

## 结构体数据转换范例

下面是示例：

import win;

//创建一个结构体
数组 = {}
数组[1] = ::POINT()
数组[1].x = 24123
数组[1].y = 888

数组[2] = ::POINT()
数组[2].x = 45645
数组[2].y = 999

//转换为API数组
ac = raw.toarray( 数组 )

//转换为托管指针
ud = raw.buffer(ac)

//再转换为table
st = raw.convert( ud,ac );

//输出
io.open();
io.print( table.tostring(st) )
