# API数据类型

aardio可以使用table定义结构体(struct)，在结构体中可以定义静态类型类型。请参考：[raw库](libraries/kernel/raw/api)

## 结构体(struct table)

在table构造器中中以添加静态类型声明，使用类似于C语言中的语法声明API函数需要的结构体(struct)。
struct中所有成员应当赋于初始值．
 通常，我们使用class来定义API函数中需要用到的结构体：

``` aau
class POINT{
int x = 0; //结构体成员必须设定初始值
int y = 0;
}

//创建一个结构体对象
pt = POINT();

//每个结构体会创建一个_struct只读字段记录类型定义，语义如下：
pt = { _struct = "int x;int y" }
```

## API数据类型 (API Datatype)

注意API数据类型声明严格区分大小写，数据类型大写表示对类型有更严格的限制条件。
其中数值类型小写表示允许负数，大写表示无符号数据类型(没有负数，仅有正整数)。
而对于支持指针的类型(string,pointer)，小写表示允许null值并允许自动转换（例如字符串转换为指针），大写表示不接受null实参。

!> todo 完成表格

?> 声明的数据类型必须保持绝对正确，使用错误的类型会导致内存读写错误并导致程序崩溃。
使用api函数大部分的导致崩溃的错误原因在于数据类型定义错误。

## API数组(  API Array)

静态数组必须写在一个结构体里面。

``` aau
array = {
byte buffer[256]={1;2;3}
}
```

必须在中括号内指定一个有效的数值表示数组长度.
如果不指定任何数值,则表示一个动态数组,aardio将会检测获取实际的数组长度,数组长度不能为0.

``` aau
array = {
byte buffer[]
}

array.buffer={1;2;3} //根据运行时的数组长度确定静态类型数组长度
```

!> todo 完成表格

如果是一个struct组成的数组，则至少显示的声明数组中的第一个元素为有效结构体， 其他已声明长度的数组赋值可指定任意个数的元素,也可以不指定值。未声明长度的数组必须赋值为非空数组以获取运行时数组长度。 数组长度不能为0。

## 输出参数(  out Parameters )

在aardio中，如果在数据类型以后添加&符号，表示这个参数的值`允许被外部函数修改`并且会`返回修改后的值`。
如果一个函数包含输出参数，那么传址参数会按原来的先后顺序附加在返回值后面返回。

aardio中函数是纯函数，函数数据只有唯一的入口(参数)，也只有唯一的出口(参数)，所以被修改的输出参数必须显示的从返回值输出。

``` aau
apifunc = dllfile.api( "apifunc", " int ( int hWnd, string lpText,string &lpCaption ,INT uType )" )

result, /*输出参数追加在返回值后面*/lpCaption = apifunc(result,hWnd,lpText, lpCaption,uType);
```

!> todo 表

对于数值类型、poiner类型不能使用输出参数来代替输入参数( 请参考： [重载API函数](libraries/kernel/raw/overload) )。

如果API形参定义为int，那么你传递实参数值123时，API函数接收到的是123这个数值。
如果API形参定义为int &，那么你同样传递参数值123时，API收到的是指向123的地址，是另外一个数值。
对于pointer类型、pointe &引用类型，会有同样的问题。

而对于string类型、struct类型，你在形参中加不加&，API接收到的是相同的指针地址。唯一的区别是引用参数会返回修改后的值。字符串中的引用参数并不象其他参数类型那样 - 给API提供的是变量的地址，也就是你不能将string &理解为C中的 const char ** 这样的二级指针用来接收一个字符串（const char *）的地址。如果需要接收这样的地址，应当改用一个结构体来获取。

## 在API函数中使用字符串

aardio中的string数据类型是传址的，多个相同内容的字符串变量内部指向相同的内存数据。
而字符串内存数据是只读的，修改字符串总是会导致aardio创建新的字符串，而不是改变原字符串的内存数据。

对于外部API函数：
如果一个字符串有可能被外部函数所改变，并且需要返回修改后的新字符串，
那么在API函数参数中应将其声明为string&以通知aardio字符串的内存可能被修改，而在结构体中应声明为char[]数组。在结构体中的char[]是一个字节数组，仍然可以使用字符串进行赋值。例如：

``` aau
class struct{
byte b[3] = {'a'#;'b'#;'c'#};
byte b2[3] = "abc";//char数组仍然可以使用字符串进行赋值
}

// struct.b , struct.b2的内容是相同的
```

在API中字符串实际上是一个内存指针，因此API函数中的字符串参数同样可以声明为指针类型。
使用raw.buffer可以分配定长的内存并返回一个buffer类型的字节数组 - 在API函数中该类型等价于一个C语言中的char *指针，该指针指向可修改的内存，在API函数返回以后，可以再用raw.tostring()将指针转换为普通字符串。另外在新版aardio中，多数字符串函数可以直接支持buffer数型的字节数组（作为字符串直接使用）

注意：raw.buffer创建的指针用于普通函数输入参数，或普通结构体成员指针。
对于输出指针地址的参数（而不是在指针指向的地址修改数据）、不需要也不应传入raw.buffer创建的(字节数组)指针。

要注意在API中声明为string &，或者在结构体中声明为BYTE[]或者UTF16的WORD[],或者用raw.buffer分配缓冲区指针，这几种不同形式的本质都相同的，也就是分配一块内存让API可以写入数据。

而在结构体中声明为string 类型，作为输出参数使用时，这时候接收的就是一个字符串的地址，例如 {string pstr}, 在WINAPI中有一些这种字符串字段在某些情况下会赋值为一个小于0xFFFF的原子值、ID等数值，aardio对这种情况做了分别处理，如果API返回的是一个字符串指针则获取字符串，对于小于0xFFFF或者为-1的值， aardio会将其转换为指针类型。

## 在API函数中使用指针

API函数会严格的检测数据类型，不允许用数值作为API指针[实参](the%20language/function/parameter)(API pointer类型)。

pointer输出参数必须使用pointer类型的[实参](the%20language/function/parameter)、或null值。
pointer输入参数中以使用string、pointer类型的[实参](the%20language/function/parameter)、也可以使用raw.buffer函数分配的cdata指针。
如是对象声明了_topointer元属性，并返回一个pointer指针或数值，则可以作为指针[实参](the%20language/function/parameter)使用。

string的指针是常量指针，外部API函数不应当修改字符串指针指向的内存。
而raw.buffer分配的内存是可修改的，当使用raw.buffer分配的指针作为参数时，该参数在API函数声明中不应当声明为"pointer&"类型。

对于API的输入参数，poinetr类型与string类型的[实参](the%20language/function/parameter)可以相互替代，也可以使用null值。
如果使用大写的STRINGA或POINTER类型，则不能在[实参](the%20language/function/parameter)中使用null值。


## 转换数据类型

`raw.convert(from[,tostruct])`
将from参数转换为tostruct类型。并返回tostruct.
from参数可以是一个指针、或结构体、或普通字符串。

下面是使用raw.convert编写的一个数值类型转换小程序。


``` aau
raw.cast = function( ctype,v ) begin

    var union_ctype = {
        union u= {
        byte byte =0;
        BYTE ubyte =0;
        word word =0;
        WORD uvord =0;
        int int =0;
        INT uint =0;
        long long =0;
        LONG ulong =0;
        double double =0;
        float float =0
        }
    }

    return raw.convert( { long x= v },
                        union_ctype
                      ).u[ctype];
end;

namespace raw {
    byte = "byte";
    BYTE = "ubyte";
    word = "word";
    WORD = "uvord";
    int = "int";
    INT = "uint";
    long = "long";
    LONG = "ulong";
    double = "double";
    float = "float"
}

//将-1转换为无符号数
uchr = raw.cast( raw.BYTE , -1 );

io.open();
io.print( uchr ); //显示255，转换成功
```



将API中表示字符串的pointer类型指针转换为aardio字符串，请看示例（注意红色部分代码);

``` aau
//下面是win库中的部分代码
::Rpcrt4 := ..raw.loadDll("Rpcrt4.dll");
::UuidCreate := Rpcrt4.api( "UuidCreate","int(struct &)");
::UuidToString := Rpcrt4.api( "UuidToString","int(type ,ptr &)");
::RpcStringFree := Rpcrt4.api("RpcStringFree","int(p)");

::GUID := class{
	INT Data1;
	WORD Data2;
	WORD Data3;
	BYTE Data4[8]="";
	@{_tostring = function() begin //重载_tostring元方法
		var re, lpsz=::UuidToString(owner,null);
		var str = ..raw.tostring( lpsz );
		::RpcStringFree(lpsz); //释放UuidToString分配的字符串内存
		return str;
	end }
}

guid = function() begin
	var guid = GUID();
	UuidCreate(guid);
	return guid;
end;

import win;
win.msgbox( guid() )
```
