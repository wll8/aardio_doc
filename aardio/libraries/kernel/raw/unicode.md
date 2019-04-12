# Unicode API函数

 这里指的Unicode
API指的是使用UTF16编码字符足的API函数，例如WINAPI的Unicode版本函数都是使用UTF16编码，而aardio10是使用UTF8编码，aardio提供UTF8<-->UTF16双向自动转换的机制，而不需要自已编写编码转换的代码。


## 自动识别 Unicode AP

aardio支持自动识别Unicode API并自动转换文本编码，一个最简单的例子：

::User32.MessageBox(0,

aardio自动做好了所有的事，我们在调用API时一切都被简化，下面讲一下规则：

aardio在识别了一个Unicode AP函数时，在不声明API参数原型直接调用API时所有字符串参数在api-utf16 <--> aardio-utf8之间的双向自动转换（即视为ustring类型）。在声明参数的Unicode API中str,ustring类型被认为API需要一个UTF16编码的字符串aardio将会自动做双向转换，

在非Unicode API函数中，ustring仍然被认为是显式声明的UTF16编码的字符串参数 - 然后会自动转换编码，string类型仍然被认为是二进制字符串，而str类型则被认为是一个多字节编码的字符串(ANSI或UTF8编码,以'\0'为终止符的C字符串）。

1）、在API调用约定中添加",unicode"声明该DLL的所有API为Unicode API，例如：
raw.loadDll("dll",,"stdcall,unicode") 声明该DLL中所有API为Unicode API。但要注意每个API函数可以声明自己是不同的编码，API参数也可以使用参数类型明确的声明是文本还是二进制字符串。

2）、aardio认为API函数尾部以小写字母 + 大写"W"结尾是一个Unicode API,相反API函数尾部以小写字母 + 大写"A"结尾是一个ANSI API。如果一个API 的函数名不是以"A"或"W"结尾，你仍然可以在函数名后面添加一个大写的"A"或"W"后缀声明API使用的默认编码（aardio会负责移除"A"或"W"找到真实的API函数，并标记他是否一个Unicode API ）对于同时提供ANSI,UNICODE两个版本的WINAPI函数，不添加"A","W"后缀明确指定版本时，由aardio自动切换到Unicode版本API。大多数WINAPI支持自动切换，例如 ::User32.MessageBox，少数WINAPI不但提供带A,W后缀的版本，还会提供不带A,W后缀的版本，这时候需要你自己指定具体的版本。

## API参数类型 ustring

API新增ustring类型，该值指明API函数需要的是一个UTF16编码的Unicode字符串参数，你可以在调用API的参数中传入字符串，指针值，或缓冲区（raw.buffer创建），null值等等，当使用大写的USTRING时不允许null值。

如果你在调用API时，传给ustring/USTRING类型参数一个UTF8编码的字符串（aardio字符串默认为UTF8编码），aardio将负责自动转换为UTF16编码，而取输出参数时，aardio会自动将API返回的UTF16字符串转换为UTF8编码。

## API结构体类型 word[] WORD []

word [] , WORD[] 等结构体数组类型，如果对应字段没有赋值为一个表数组，则作为ustring处理，同样可以自动实现UTF8<-->UTF16的双向转换。

{ WORD s[] = "abc"; } 这个结构体占用6个字符，"abc"被转换为UTF16记码的字符串，每字符占用两个字节。

## 编码转换优化规则


aardio在上面提到的所有API自动编码转换过程中，都会避免不必要的重复转换或错误转换， 例如： { WORD s[] = 'abc'u; } 这样直接指定一个UTF16编码的Unicode字符串时，aardio不会再做不必要的转换。对于结构体，aardio在一次转换成功以后，会更新到结构体字段中，并将其标识为一个UTF16字符串，下次如果检测到正确的标记就会直接取值而不是转换。
