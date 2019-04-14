# 模式匹配函数

 请参考：[模式匹配语法](libraries/kernel/string/pattern%20syntax)

## 查找字符串的

`i,j = string.find(str,"模式串" [,pos]);`

使用模式匹配查找字符串并返回起始位置(i),结束位置(j);
第三个参数pos指定搜索开始的位置，这个参数可以省略(使用默认值1);
pos如果为负数，则从右侧倒数计数(-1表示字符串最后一个字符)。

函数返回匹配字符串的起始位置i，结束位置j。
如果查找失败,i,j都返回null值.下面是一个简单的例子:

如果需要禁用模式语法，请在模式串开始添加@字符。或参考：[其他查找函数](libraries/kernel/string/search)


``` aau
io.open(); //打开控制台窗口
i,j = string.find("abc456d" ,"c\d+");

if( i ) //如果找到i为大于0的数值
   io.print("在 'abc456d' 中找到 c\d+" ，"从" + i + "到" + j);
if(not string.find("abcd" ,"不可能") )
    io.print("没有从 'abcd' 中找到 '不可能' ");
```

## 替换字符串

`str = string.replace (str, pattern, ** **repl** **[, n])`

参数分别为(目标字符串,查找模式字符串,替换字符串,替换次数)。
最后一个可选参数指定替换的次数,如果不指定则替换所有的找到的字符串。

如果需要禁用模式语法，请在模式串开始添加@字符。

``` aau
io.open(); //打开控制台窗口

// 在模式匹配中 .圆点标记匹配任意字符
str = string.replace("abcd",".","k");
io.print(str); //输出kkkk

str = string.replace("abcd",".","k",1);
io.print(str); //输出kbcd
```

pattern参数(查找模式字符串)可以使用所有模式匹配语法。
**repl** 参数则为普通字符串,但是可以用\1,\2,\3..........等表示模式匹配后的捕获分组(即模式串中一个括号中的模式匹配的目标字符串);
 看下面的示例:

``` aau
io.open(); //打开控制台窗口

//在模式匹配中 .圆点标记匹配任意字符。
str = string.replace("abcd","(.)","\1k");

io.print (str); //结果是akbkckdk
```

## 模式匹配-分组捕获(capture)

### 1、在string.find中使用分组捕获

string.find会将所有的 **分组捕获**增加到返回值队列中。
我们用一个示例来解释一下.

下面是一个简单的例子，除了括号分组没有使用其他的模式语法。

``` aau
i,j,v,v2 = string.find ( "abcd" , "(ab)(cd)" );

io.open();
io.print (v,v2); //结果为v等于"ab" v2等于"cd"
```

 再看一个类似的例子，使用了模式语法。


``` aau
io.open();

pair = "name = value"

//增加了两个返回值name,value,分别对应查找模式串中的两个括号组成的匹配分组
i, j, n, v = string.find(pair, "(\a+)\s*=\s*(\a+)")
io.print(i,j,n,v)//> 显示 name value
```

### 2、向前引用

我们可以在模式中使用向前引用已经找到的捕获分组，'\d'(d代表1-9的数字) 表示第d个捕获的拷贝。


``` aau
//假定有一个字符串
str = /* a = "test = 'abc'" */
str2 = /* a = 'test = "abc"' */

/*
现在的任务是用模式匹配找出?test = 'abc'

按照最基本的语法。
单引号开始的字符串必须用单引号结束，中间允许双引号。
双引号开始的字符串必须用双引号结束，中间允许单引号。
所以现在首要的问题是在模式串中向前引用第一次找到的引号。

而使用%""对称匹配又无法适用这种情况,因为字符串也有可能以单引号开始
*/

//第一个引号放到括号里形成一个匹配分组,其捕获结果用\1表示
//可以看到在模式串的后部分向前引用了\1

a, b, quote, substr = string.find(str, '(["\'])(.*?)\\1');
a2, b2, quote2, substr2 = string.find(str2, '(["\'])(.*?)\\1');

io.open();
io.print( substr )//>显示 test = 'abc'
io.print( quote )//>显示双引号
io.print( substr2 )//>显示 test = "abc"
io.print( quote2 )//>显示单引号
```

### 3、在string.replace中使用分组捕获

`str = string.replace (str, pattern, repl [, n])`

参数分别为(目标字符串,查找模式串,替换字符串,替换次数)。
在模找模式串 **pattern**中可以使用括号分组，在替换串参数 **repl**中可以用\d(d为1到9的数字)引用分组捕获。

``` aau
io.open();

//复制字符串中的每一个字符.
str = string.replace("hello","(.)","\1\1");
io.print(str); //显示hheelllloo

//下面代码互换相邻的字符:
str = string.replace("hello", "(.)(.)", "\2\1")
io.print(str);//显示ehllo
```

### 在string.replace中使用函数处理分组捕获

`str = string.replace (str, pattern, func [, n])`

string.replace参数的第三个参数也可以是一个函数。
string.replace会将所有分组捕获作为func的参数,并且调用func函数,并且用func函数的返回值作为替换串。

可以在模式匹配中直接使用函数,是模式匹配中非常有用的一个功能。

``` aau
io.open();
//如果两个捕获都是数字则相加，否则将位置前后掉换
function captureProc(a,b) {
    io.print(owner,a,b); //owner显示原始定符串
    if(tonumber(a) and tonumber(b) )
        return a + b;//如果两个捕获都是数字则相加
    else
        return b ++ a;//否则将位置前后掉换
}

//复制字符串中的每一个字符.
str = string.replace("abcdef23","(.)(.)",captureProc);
io.print(str); //显示badcfe5
```

## string.match 模式匹配

`string.match(str, pattern, pos)`

第一个参数指定目标字符串，每二个参数指定查找模式串。第三个参数可选指定开始位置
这个函数与string.find很象。但不会返回匹配的开始位置与结束位置。而仅仅是返回找到的字符串。
如果在模式串中用圆括号指定的匹配分组,则返回值有多个分别对应各个匹配分组的捕获结果。
分组可以相互嵌套，捕获结果返回的顺序对应模式串中匹配分组的左圆括号出现的前后顺序。
如果你希望第一个返回值是匹配结果的完整字符串,那么请将整个模式串包含在一对圆括号内。

``` aau
var v,v2 = string.match("abcd", "(ab)(cd)");

io.open( );
io.print(v,v2); //>显示v等于"ab" v2等于"cd"
```

如果不显示的用括号指定捕获，函数将捕获整个匹配模式。

``` aau
//\d表示数字 \d+表示最长匹配多个数字
var v = string.match("abcd1234", "\d+");

io.open();
io.print(v); //>显示v等于"1234"
```

## string.gmatch   全局模式匹配

`func = string.gmatch(str, pattern)`

string.gmatch()创建并返回一个迭代器，可用于for语句中迭代的进行全局查找。
迭代器每执行一次返回一个找到的字符串，如果在模式串中用圆括号指定的匹配分组,
则返回值有多个分别对应各个匹配分组的捕获结果。分组可以相互嵌套，捕获结果返
的顺序对应模式串中匹配分组的左圆括号出现的前后顺序。如果你希望第一个返回值
是匹配结果的完整字符串,那么请将整个模式串包含在一对圆括号内。

``` aau
io.open();

//for后面的变量对应查找模式串中的括号分组(有几对括号就有几个返回值)
for str,int in string.gmatch( "abcd=1234 xyz=999","(\a+)=(\d+)") {
   io.print(str,int);
}
```

string.gmatch函数比较适合用于泛型for循环。他可以遍历一个字符串内所有匹配模式的子串。
调用string.gmatch函数的时候，如果不显示的指定捕获，函数将捕获整个匹配模式。

实际上string.gmatch的返回值是一个迭代器函数,每调用这个函数一次就会向后查找一个匹配直到查找失败。
上面在泛型for中执行string.gmatch的过程实际上可以理解成这样：

``` aau
io.open();

f = string.gmatch( "abcd=1234 xyz=999","(\a+)=(\d+)");

str,int = f();
io.print(str,int);

str,int = f();
io.print(str,int);
```

## 范例：查找网页源代码中的超链接

下面是一个应用模式匹配的完整示例 - 下载网页并取得网页源代码中的所有超链接：

``` aau
io.open(); //打开控制台窗口
io.print("请稍候.......")

/*
大家知道，在web窗体中，我们可以用 wb:eleLinks() 得到所有的链接链（返回一组element，详见教程）
这需要我们用web窗体打开网页，然后再调用 wb:eleLinks()
那么，我们有没有更好的办法直接分析源代码，并取得所有的超链接呢？
有的，如下:
*/

//首先，我们下载 www.aardio.com 的主页到一个字符串(string对象)中

import inet.whttp;
http = inet.whttp()
strHtmlCode = http.get("http://www.aardio.com")
http.close()

//然后我们创建一个空的table数组
links = {}
/*
string.gmatch 全局查找子串，每个括号指定的一个分组匹配(对应一个分组捕获,在泛型for中增加一个返回值)
与 string.match 不同，string.gmatch发现一个完整匹配以后，会继续向后查找，
*/
pattern = //\s*href\s*=\s*\"?\'?([:\w\./@]+)\"?\'?\s*
for href in string.gmatch(strHtmlCode, pattern) {
	table.push(links, href) //发现一个超链接，添加到links列表中
}

/*
我们解释一下模式串 "\s*href\s*=\s*\"?\'?([:\w\./@]+)\"?\'?\s*"
\是转义符 \s表示空白字符 \s*表示空白字符出现一次或多次 \"表示引号( \转义符的使用与普通字符串相同 )
?表示出现一次或零次 \w表示字母和数字 \.表示.（因为.是特殊字符，所以需要\还原）
[]是一个自定义的字符类,如[0-9]匹配所有数字
+是修饰符表示前面的字符出现一次或多次
*/

import inet.url;

//好了，我们现在得到了所有的超链接，并保存在links列表中了，我们输出看一下
for i,link in links {
	var url = inet.url.split(link);
	if(url && url.scheme == "http" ){
		io.print( "发现一个链接: " , link )
		io.print( "","主机: ",url.host);
		io.print( "","路径: ",url.path);
	}
}

execute("pause") //按任意键继续
io.close();//关闭控制台
```
