# 拆分合并

 请参考：[数据类型 - 字符串](the%20language/datatype/datatype#varstring) [字符串连接操作符](the%20language/operator/concat)

## 截取字符串

1.1、 substr = string.sub(str,i,j=-1,mbcs=false );

从字符串中截取从位置i到位置j的字符串，j为可选参数。
如果i,j为负数，则从右侧倒数计数(-1表示字符串最后一个字符)。
如果i,j没有指定一个有效的截取范围，则返回一个空字符串(而不是null);

最后一个参数mbcs是可选参数,默认为false,
该参数影响计数方式,如果为false则按字节计数,汉字有多个字节(注意UTF8是变长编码)
如果为true,则按字符计数,一个汉字计为一个字符.

io.open(); //打开控制台窗口
io.print(string.sub("abcdefg",-5,-4) )

1.2、 substr = string.left(str,n,mbcs=false);

在字符串左侧截取n个字符,如果n没有指定一个有效的截取范围，
则返回一个空字符串(而不是null);

参数mbcs如果为false则按字节计数,一个汉字有多个字节.
如果为true,则按字符计数,一个汉字计为一个字符.

1.3、 substr = string.right(str,n,mbcs=false);

在字符串右侧截取n个字符,如果n没有指定一个有效的截取范围，
则返回一个空字符串(而不是null); 

参数mbcs如果为false则按字节计数,一个汉字有多个字节.
如果为true,则按字符计数,一个汉字计为一个字符.

## 清除字符串首尾字符

2.1、 substr = string.trim(str[,space]);

去掉字符串首尾指定字符，可以指定单个字符，或一组需要在首尾去掉的字符组成的字符串。 
如果省略space参数，则清除所有空白字符，包含空格(' ')、定位字符('\t')、CR('\r')、换行('\n')、垂直定位字符('\v')或翻页('\f') 等。

2.2、 substr = string.trimleft(str[,space]);

去掉字符串开始的指定字符，可以指定单个字符，或一组需要在首尾去掉的字符组成的字符串。 
如果省略space参数，则清除所有空白字符，包含空格(' ')、定位字符('\t')、CR('\r')、换行('\n')、垂直定位字符('\v')或翻页('\f') 等。

2.2、 substr = string.trimright(str[,space]);

去掉字符串尾部的指定字符，可以指定单个字符，或一组需要在首尾去掉的字符组成的字符串。 
如果省略space参数，则清除所有空白字符，包含空格(' ')、定位字符('\t')、CR('\r')、换行('\n')、垂直定位字符('\v')或翻页('\f') 等。

## 拼接字符串

string.concat(str,str2[,...]

拼接字符串，与 ++ 连接操作符不同的是:
string.concat会忽略null值,而使用++操作符连接null空值时会抛出异常。
如果无参数,或所有参数为null,string.concat返回null.

如果需要连接多个字符串，而允许其中有null参数,
可以使用string.concat替代连接操作符

## 拆分字符串数组

string.split(str,sep)

拆分字符串并返回[table数组](the%20language/datatype/datatype#vartable)。

**1.1、按单字符拆分**
sep参数为置于单引号中的单个字符，这是速度最快的拆分方法

io.open(); //打开控制台窗口

str = "123ab456ab789ab";
t = string.split(str,'a'); //使用单个分隔字符拆分字符串

io.print(table.unpack(t) );


**1.2、按多个分隔字符(分隔串)拆分**

sep参数为包含多个分隔字符的普通字符串，分隔符与分隔符之间返回空元素

io.open(); //打开控制台窗口

str = "123ab456ab789ab";
t = string.split(str,"ab"); //使用分隔串"ab"拆分字符串

io.print( #t ); //数组长度为6
io.print(table.unpack(t) );

**1.2、按字符串拆分**

sep参数为普通字符串，此字符串被包含在<>括号内，作为一个独立整体的分隔标记.
<>也是string.split函数唯一支持的模式匹配语法（意即string.split函数不支持除<>之外的其他模式匹配语法)。 

io.open(); //打开控制台窗口

str = "123ab456ab789ab";
t = string.split(str,"<ab>"); //按单个字符开始拆分

io.print( #t ); //数组长度为3
io.print(table.unpack(t) );

## 字符串数组合并

string.join(tab,sep)

将一个字符串数组([table对象](the%20language/datatype/datatype#vartable)）以sep指字的分隔标记合并为一个字符串
io.open(); //打开控制台窗口

tab = {"ab";"cd";"efg"}
str = string.join(tab,"分隔符");
io.print( str );
