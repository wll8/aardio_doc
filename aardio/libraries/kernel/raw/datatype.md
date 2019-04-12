# API数据类型

aardio可以使用table定义结构体(struct)，在结构体中可以定义静态类型类型。请参考：[raw库](libraries/kernel/raw/api)

## 结构体(struct table)

在table构造器中中以添加静态类型声明，使用类似于C语言中的语法声明API函数需要的结构体(struct)。
struct中所有成员应当赋于初始值．
 通常，我们使用class来定义API函数中需要用到的结构体：

class POINT{
int x
= 0; //结构体成员必须设定初始值
int y = 0;

}

//创建一个结构体对象
pt = POINT();

//每个结构体会创建一个_struct只读字段记录类型定义，语义如下：
pt = { _struct = "int x;int y" }

## **API数据类型** (API Datatype)

注意API数据类型声明严格区分大小写，数据类型大写表示对类型有更严格的限制条件。
其中数值类型小写表示允许负数，大写表示无符号数据类型(没有负数，仅有正整数)。
而对于支持指针的类型(string,pointer)，小写表示允许null值并允许自动转换（例如字符串转换为指针），大写表示不接受null实参。



| API数据类型 |  长度 |  对应的aardio数据类型 | C语言类型 | WINAPI 类型 |  备注 |
|  |  类型 |
|  无符号字节 | BYTE | 8位 |  数值 例： { char chr = 'A'# } | unsigned char | BYTE |  注意C++中的bool(小写)类型为一个字节(8位),等价于aardio中的byte类型. |
|  字节 | byte | char, |  |
|  无符号短整型 | WORD | 16位 |  数值 例： { short n = 123 } | unsigned shor | WORD |  |
|  短整型 | word | short |  |
|  无符号整型 | INT | 32位 |  数值 例： { int n = 123 } | unsigned int,unsigned long | DWORD, BOOL, HANDLE, HWND, HINSTANCE | winapi中H前缀通常表示32位数。 |
|  整型 | int | int,long | LRESULT, LPARAM, WPARAM |
|  无符号长整型 | LONG64 | 64位 | math.size64()长整数，或普通数值 例： { LONG
      a = 123; LONG b = math.size64(456) } | unsigned long long ,unsigned __int64 |  |  可缩写为LONG, 1、API函数返回值中LONG类型返回为math.size64对象 2、在API回调函数中，LONG类型回调参数为math.size64对象 3、在结构体中LONG类型字段值为math.size64对象时,aardio始终 保持该对象的类型以及地址不变，反之则处理为64位浮点数值 |
|  长整型 | long64 | long long,__int64 |  |  可缩写为long |
|  指 针 地 址 | ADDR | 32位/64位 |  数值 例： { ADDR n = 123 } | void* | UINT_PTR,ULONG_PTR,DWORD_PTR |  注意使用数值表示地址时,为保持更好的兼容性,请使用此类型,而不要使用固定位长的int,INT,long,LONG等类型替代, |
| addr | INT_PTR,LONG_PTR |
|  浮点数 | float | 32位 |  数值 例： { float n = 123 } | float | FLOAT |  |
|  双精度浮点数 | double | 64位 |  数值 例： { double n = 123 } | double |  |  |
|  布尔值 | bool | 32位 | true,false | int | BOOL int |  静态类型中的布尔值应明确指定true或false,而不应当象aardio类型那样自由的使用其他类型来替代. 注意C++中的bool(小写)类型一般实现为1个字节(8位),在aardio中应使用byte类型表示 而aardio中的bool类型,在C++中表示为BOOL(大写). |
|  指针 | pointer ptr | 32位/64位 | pointer null | void* | PVOID, LPVOID, LPCVOID |  此类型可缩写为ptr,或PTR,也可以使用所有p开头的自定义类型名字表示指针。 大写的数据类表示参数不接受null指针(空指针为null，而不是0)，不能转换字符串为常量指针。

指针值必须是一个pointer类型或null值，在aardio中空指针为null而不是0，table或cdata对象可以通过元表中的_topointer成员返回一个有效指针(不能为null)或指针数值，_topointer可以是一个值（元数据）或者一个函数（元方法）。注意对于结构体aardio将忽略元表中的_topointer  |
| POINTER PTR | 32位/64位 | pointer |
|  字符串 | string | 32位 | string pointer null | const char* | LPCSTR, LPSTR, |

二进制字符串，也可以接受pointer指针值，大写则表示参数不接受null指针 。在API回调函数或结构体中API返回0~0xFFFF或-1的指针地址aardio将转换为指针而不是字符串  |
| STRING | 32位 | string pointer |
|  文本字符串 | str | 32位 | string pinter null | const char * |  |

在普通API中表示'\0'结束的文本，在Uniocde API中等价于ustring。在API回调函数或结构体中API返回0~0xFFFF或-1的指针地址aardio将转换为指针而不是字符串  |
|  字节数组 | pointer | 32位/64位 | buffer null | char *,unsigned char * |  |

字节数组实际上就是字符串、或二进制字符串，不同的是可以让API写入数据（aardio中普通字符串所占用的内存是只读的，修改字符串会创建新的字符串对象），这种可以让API写入数据的字符串在aardio中对应的就是buffer类型，使用raw.buffer()函数创建buffer  |
| Unicode字符串 | ustring | 32位 | ustring pointer null | const wchar_t* | LPCWSTR, LPWSTR, |

Unicode(UTF16)字符串，aardio会自动做双向编码转换，传给API时是UTF16，从API返回时转换为UTF8。类型名大写时禁用null值。在API回调函数或结构体中API返回0~0xFFFF或-1的指针地址aardio将转换为指针而不是字符串  |
| STRING | 32位 | string pointer |
|  结构体 | struct | 32位 | table | struct |  |

可以在API参数中使用空表 {} 表示C/C++中的null结构体指针注意在API参数中,struct被转换为指针按引用传递,如果是按值传递的结构体,需要展开所有成员为普通参数.  |
|  联合 | union | 32位 | table | union |  |

u = {union value = {char c=8;short s=123;}}  |
|  | void |  |  | void |  |  标识函数返回值为空 |

 声明的数据类型必须保持绝对正确，使用错误的类型会导致内存读写错误并导致程序崩溃。
使用api函数大部分的导致崩溃的错误原因在于数据类型定义错误。

## **API数组(**  API Array)

静态数组必须写在一个结构体里面。
array = { 
byte buffer[256]={1;2;3} 
}

必须在中括号内指定一个有效的数值表示数组长度.
如果不指定任何数值,则表示一个动态数组,aardio将会检测获取实际的数组长度,数组长度不能为0.

array = { 
byte buffer[]

}

array.buffer={1;2;3} //根据运行时的数组长度确定静态类型数组长度

| CTYPE |  示例 |  备注 |
|  无符号字节 | BYTE [] |

array = { BYTE str[2] = {  |  填充至定长string , 或者table数组(元素是数值或null值) 如果将字段指定为null或字符串,则aardio将该字段存储为字符串对象。 如果指定为table字节数组,则需要调用string.pack函数将数组转换为字符串. 也可以使用raw.buffer创建的缓冲区作为参数 |
|  字节 | byte [] |
|  无符号短整型 | WORD [] | array = {WORD arr[2] =
      {'A'#,'B'#}} |  如果是一个table数组，元素必须是数值或null值，如果值为空，或者是一个字符串，aardio将该字段作为一个UTF16编码的Unicode字符串处理，在调用API、以及输出参数时aardio会自动做UTF16到UTF8的双向自动转换（ aardio字符串的默认编码为UTF8 ) |
|  短整型 | word [] |
|  无符号整型 | INT [] | array = {INT arr[2] = {'A'#,'B'#}} |  数组元素必须是数值或null值 |
|  整型 | int [] |
|  无符号长整型 | LONG64 [] | array = {LONG arr[2] =
      {'A'#,'B'#}} |  数组元素必须是数值或null值 |
|  长整型 | long64 [] |
|  无符号指针地址 | ADDR [] |  |  |
|  指针地址 | addr [] |  |  |
|  浮点数 | float [] |  |  数组元素必须是数值或null值 |
|  双精度浮点数 | double [] |  |  数组元素必须是数值或null值 |
|  布尔值 | bool [] |  |  数组元素必须是布尔值或null值 |
|  指针 | pointer [] POINTER [] |  |  数组元素必须是pointer或null值 |
|  字符串 | string [] STRING [] |  |  数组元素必须是string或null值 |
|  结构体 | struct [] |  |  至少要声明第一个数组元素 |

如果是一个struct组成的数组，则至少显示的声明数组中的第一个元素为有效结构体， 其他已声明长度的数组赋值可指定任意个数的元素,也可以不指定值。未声明长度的数组必须赋值为非空数组以获取运行时数组长度。 数组长度不能为0。

## **输出参数(**  out Parameters )

在aardio中，如果在数据类型以后添加&符号，表示这个参数的值允许被外部函数修改并且会返回修改后的值。
如果一个函数包含输出参数，那么传址参数会按原来的先后顺序附加在返回值后面返回。

aardio中函数是纯函数，函数数据只有唯一的入口(参数)，也只有唯一的出口(参数)，所以被修改的输出参数必须显示的从返回值输出。
apifunc = dllfile.api( "apifunc", " int ( int hWnd, string
lpText,string &lpCaption,INT uType )" )


result, /*输出参数追加在返回值后面*/lpCaption
 = apifunc(result,hWnd,lpText, lpCaption,uType);

|  输出参数 |  说明 |
|  数据类型 | aardio类型 | C语言类型 |  |
|  无符号字节 | BYTE & | unsigned char * |
|  字节 | byte & | char * |
|  无符号短整型 | WORD & | unsigned short * |  |
|  短整型 | word & | short * |
|  无符号整型 | INT & | unsigned int * |  |
|  整型 | int & | int * |
|  无符号长整型 | LONG64 & | unsigned longlong * |  该参数支持普通数值，以及math.size64()创建的长整数 |
|  长整型 | long64 & | longlong * |
|  无符号指针地址 | ADDR & | void** |  |
|  指针地址 | addr & | void** |  |
|  浮点数 | float & | float * |  |
|  双精度浮点数 | double & | double * |  |
|  布尔值 | bool & | bool * int * |  |
|  指针 | pointer &POINTER & | void ** |  二级指针。 |
|  字符串 | string &STRING & | char * |

string &类型的参数参数可以使用raw.buffer创建一段可写入的内存缓冲区（这时候对应的输出参数返回值为buffer类型，而非字符串）。如果参数是一个字符串，这时候aardio会创建一个等长的临时的内存缓冲区并拷贝字符串到该内存，并将内存指针发送给API函数，在调用结束后增加相应的返回值返回新的字符串。如果参数是一个指定缓冲区长度的数值（以字节为单位），aardio初始化缓冲区所有字节值为0，并且在缓冲区尾部增加2个字节并写入'\u0000'。使用参数0表示传递给缓冲区一个null指针(而不是使用null空参数）这种API类型，也可以在aardio中声明为pointer指针类型，然后用raw.buffer()函数创建一个可以让API写入数据的字节数组传过去。  |
| str & | char * |  同上,但以'\0'为终结符返回文本字符串。如果参数使用raw.buffer创建一段可写入的内存缓冲区，这时候对应的输出参数返回值为字符串，而非buffer类型 |
|  宽字符串 | ustring &USTRING & | wchar_t * |

可以使用raw.buffer创建一段可写入的内存缓冲区（这时候对应的输出参数返回值为字符串，而非buffer类型）。如果参数是一个字符串(aardio会自动转换为UTF16编码再取长度)，这时候aardio会创建一个等长的临时的内存缓冲区并拷贝字符串到该内存，并将内存指针发送给API函数，在调用结束后增加相应的返回值返回新的字符串。如果参数是一个指定缓冲区长度的数值（以字符为单位，一个字符占2个字节），aardio初始化缓冲区所有字节值为0，并且在缓冲区尾部增加2个字节并写入'\u0000'。使用参数0表示传递给缓冲区一个null指针(而不是使用null空参数）也可以使用raw.buffer()函数创建一个缓冲区作为参数，如果使用此缓冲区，输入值不转换编码，但返回值转换为UTF8编码，并转换为字符串类型作为返回值（不改变输入参数的类型）  |
|  结构体 | struct & | void* |  结构体按引用传递，具有副作用的，即使不接收对应的返回值，结构体仍然可被API函数修改值。 可以在API参数中使用空结构体 {} 表示C/C++中的null结构体指针 请参考：[table参数的副作用](the%20language/function/parameter#table) |

对于数值类型、poiner类型不能使用输出参数来代替输入参数( 请参考： [重载API函数](libraries/kernel/raw/overload) )。

如果API形参定义为int，那么你传递实参数值123时，API函数接收到的是123这个数值。
如果API形参定义为int &，那么你同样传递参数值123时，API收到的是指向123的地址，是另外一个数值。
对于pointer类型、pointe &引用类型，会有同样的问题。

而对于string类型、struct类型，你在形参中加不加&，API接收到的是相同的指针地址。唯一的区别是引用参数会返回修改后的值。字符串中的引用参数并不象其他参数类型那样 - 给API提供的是变量的地址，也就是你不能将string &理解为C中的 const char ** 这样的二级指针用来接收一个字符串（const char *）的地址。如果需要接收这样的地址，应当改用一个结构体来获取。

## **在API函数中使用字符串**

aardio中的string数据类型是传址的，多个相同内容的字符串变量内部指向相同的内存数据。
而字符串内存数据是只读的，修改字符串总是会导致aardio创建新的字符串，而不是改变原字符串的内存数据。

对于外部API函数：
如果一个字符串有可能被外部函数所改变，并且需要返回修改后的新字符串，
那么在API函数参数中应将其声明为string&以通知aardio字符串的内存可能被修改，而在结构体中应声明为char[]数组。在结构体中的char[]是一个字节数组，仍然可以使用字符串进行赋值。例如：

class struct{
byte b[3] = {'a'#;'b'#;'c'#};
byte b2[3] = "abc";//char数组仍然可以使用字符串进行赋值
}

// struct.b , struct.b2的内容是相同的

在API中字符串实际上是一个内存指针，因此API函数中的字符串参数同样可以声明为指针类型。
使用raw.buffer可以分配定长的内存并返回一个buffer类型的字节数组 - 在API函数中该类型等价于一个C语言中的char *指针，该指针指向可修改的内存，在API函数返回以后，可以再用raw.tostring()将指针转换为普通字符串。另外在新版aardio中，多数字符串函数可以直接支持buffer数型的字节数组（作为字符串直接使用）

注意：raw.buffer创建的指针用于普通函数输入参数，或普通结构体成员指针。
对于输出指针地址的参数（而不是在指针指向的地址修改数据）、不需要也不应传入raw.buffer创建的(字节数组)指针。

要注意在API中声明为string &，或者在结构体中声明为BYTE[]或者UTF16的WORD[],或者用raw.buffer分配缓冲区指针，这几种不同形式的本质都相同的，也就是分配一块内存让API可以写入数据。

而在结构体中声明为string 类型，作为输出参数使用时，这时候接收的就是一个字符串的地址，例如 {string pstr}, 在WINAPI中有一些这种字符串字段在某些情况下会赋值为一个小于0xFFFF的原子值、ID等数值，aardio对这种情况做了分别处理，如果API返回的是一个字符串指针则获取字符串，对于小于0xFFFF或者为-1的值， aardio会将其转换为指针类型。

## **在API函数中使用指针**

API函数会严格的检测数据类型，不允许用数值作为API指针[实参](the%20language/function/parameter)(API pointer类型)。 

pointer输出参数必须使用pointer类型的[实参](the%20language/function/parameter)、或null值。
pointer输入参数中以使用string、pointer类型的[实参](the%20language/function/parameter)、也可以使用raw.buffer函数分配的cdata指针。
如是对象声明了_topointer元属性，并返回一个pointer指针或数值，则可以作为指针[实参](the%20language/function/parameter)使用。

string的指针是常量指针，外部API函数不应当修改字符串指针指向的内存。
而raw.buffer分配的内存是可修改的，当使用raw.buffer分配的指针作为参数时，该参数在API函数声明中不应当声明为"pointer&"类型。

对于API的输入参数，poinetr类型与string类型的[实参](the%20language/function/parameter)可以相互替代，也可以使用null值。
如果使用大写的STRINGA或POINTER类型，则不能在[实参](the%20language/function/parameter)中使用null值。 


## **转换数据类型**

raw.convert(from[,tostruct])将from参数转换为tostruct类型。并返回tostruct.
from参数可以是一个指针、或结构体、或普通字符串。

下面是使用raw.convert编写的一个数值类型转换小程序。


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
