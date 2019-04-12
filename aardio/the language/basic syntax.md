# 基本语法

## 数据类型

关于基本数据类型的详细说明请查看：[数据类型](the%20language/datatype/datatype)

## 标识符

标识符是指编程语言中由起标识作用的英文字母、数字或中文字符、以及下划线组成的命名符号，
一般用来标识用户或系统定义的数据或方法，例如常量名、变量名、函数名等。

**标识符基本规则：**

* 标识符由英文字母、中文字符、数字、下划线"_"三种字符组成。
* 数字不允许作为首字符。
* 变量名包含中文时，中文字符前面不能有字母或数字。
* 可以使用美元符号($)作为变量名或变量名的第一个字符。
* 可以使用下划线作为变量名或常量名的首字符,当下划线作为首字符时表示常量,单个下划线表示变量.
* 标识符区分大小写

## 关键字

语法系统保留的关键字，关键字在编辑器默认显示为蓝色。aardio全部关键字如下:

`var` 用于定义局部变量
`def` 用于定义关键字
`null` 用于表示空值
`and not or` 逻辑运算符
`begin end ` 用于包含语句块
`false true` 用于表示布尔值
`if else elseif` 用于条件判断语句
`select case` 用于条件判断语句
`for in` 用于循环语句
`while do` 用于循环语句
`break continue` 循环中断语句
`try catch` 用于捕获异常
`class ctor` 用于创建类
`function` 用于创建函数
`return` 用于函数中返回值
`namespace` 用于创建或打开名字空间
`import` 用于引用库
`with` 用于打开名字空间
`this` 用于在类内部表示当前实例对象
`owner` 用于成员函数中表示调用函数的主体对象
`global` 用于表示全局名字空间
`self` 用于表示当前名字空间

?> 另外aardio中的关键函数在编辑器中也默认显示为蓝色。请参考：[关键函数](the%20language/variables%20constants#const-function)

aardio支持自定义关键字，例如：

``` aau
def 如果 = if
def 否则 = else
def 否则是 = elseif
def 名字空间= namespace
def 循环 = while

io.open();

如果 1== 1 {
    io.print(" 1等于1 ")
}
否则{
    io.print(" 1不等于1 ")
}
```

如果在库中定义关键字、需要在preload库中加载定义关键字的库，才能保证在编译前生效。

**当关键字置于成员符之后,aardio会将关键字作为普通成员变量名,如下:**

``` aau
io.namespace = "io"
```

## 分隔符

aardio使用半角空格、制表符、回车换行、分号等作为分隔符，不允许使用全角空格('\u3000')或HTML空格('\u00A0')作为语法分隔符。在HTML模板语法中，还可以使用<? ?> 作为代码分隔符。

## 注释

注释是被标明不是程序代码、在运行时跳过不执行的附加说明内容。


### 1、单行注释

单行注释以 `//开始，到行尾结束`;

### 2、 多行注释

多行注释以 `/*开始，到 */`结束，首尾的`*`字符可以有一或多个，但`*`字符的数目必须首尾匹配。

## 操作数(operand)

操作数是指代码中表示数据的最小数据单元：[变量、常量](the%20language/variables%20constants)

## 操作符(operator)

操作符指代码中的所有标点符号(不允许使用全角标点、在aardio编辑器中全角标点、全角空格将以红色纠错背景显示)。 用于表达式中对操作数计算求值的操作符本手册称为运算符。

关于运算符请参考下面的链接：

[算术运算符](the%20language/operator/arithmetic)

[按位运算符](the%20language/operator/bit)

[等式运算符](the%20language/operator/eq)

[逻辑运算符](the%20language/operator/logic)

[关系运算符](the%20language/operator/relational)

[连接运算符](the%20language/operator/concat)

[取长运算符](the%20language/operator/len)

[优先级](the%20language/operator/priority%20)

[运算符重载](the%20language/operator/overloading)

其他操作符将在其他语法章节介绍，例如你可以在[数据类型](the%20language/datatype/datatype#vartable)中了解到构造操作符"{}"，成员操作符"."，索引操作符"[]"


## 表达式(expression)

表达式用来表示右值数据，右值都是表达式，左值都是具名对象。

> 右值是指存储在内存，并使用表达式表示的只读数据值(read value)，通常用于赋值语句的等号右侧、或作为函数的输入参数、函数的返回值使用，它与左值相对，不能对右值执行赋值操作(即不能置于等号左侧)。

单个操作数可以构成一个表达式。
操作数、运算符可以组成表达式，使用运算符对操作数进行运算并返回一个新的值。
一个表达式可以作为另一个表达式的操作数。
函作返回值可以作为表达式。
赋值语句不能作为表达式。

## 语句(statement)

我们编写的程序由语句组成，
程序中的最小指令单元称为语句。

基本语句由关键字、操作数、操作符、表达式等组成。
包含多个语句、或语句块的语句称为复合语句。

一个基本语句是由尾部的分号表示结束的逻辑行，
如果能保持语句在语义上的独立完整性，分号";"通常可以省略。

语句块由一对大括号界定（ 也可以使用 begin end 替代 ）
语句块可以包含多个基本语句或者复合语句。

1、基本语句:
[赋值语句](the%20language/statements/assignment)
[函数调用语句](the%20language/function/definitions#call)
[import语句](libraries/import)

2、语句块
[语句块](the%20language/statements/blocks)

3、控制语句
[条件判断语句](the%20language/statements/branching)
[循环语句](the%20language/statements/looping)
[容错语句](the%20language/statements/try)

4、定义语句
[定义名字空间](the%20language/namespace)
[定义函数](the%20language/function/definitions)
[定义类](the%20language/class/class)

## 语句与表达式的概念区别

aardio语言严格区分表达式、语句的概念，单独的表达式不能作为语句。

``` aau
1+1; //错误：单独的表达式不能作为语句!
var num = 1+1: //正确，表达式组成语句!
io.print( num );
//函数调用构成独立语句!
io.print; //错误：函数对象不能作为语句!
var func = io.print: //正确，函数对象可以作为操作数构成表达式!
var tfunc = type( func ); //函数返回值是一个表达式
num++; //正确，自增赋值语句!
num = num++;//错误：赋值语句不能作为表达式!
```


### 1、表达式只能用来表示右值

表达式只能用来表示右值。

> 右值是指存储在内存，并使用表达式表示的只读数据值(read value)，通常用于赋值语句的等号右侧、或作为函数的输入参数、函数的返回值使用，它与左值相对，不能对右值执行赋值操作(即不能置于等号左侧)。

你可以像下面这样写:

``` aau
num = 1+1
```



1+1是一个表达式，下面这样写就是错的:

``` aau
1+1 = num; //表达式只能存在于右值中，不能置于等号左侧作为左值使用
{} = tab; //这样也是错的!
```

### 2、表达式可以包含在括号里

你可以像下面这样写:

``` aau
num = ( (1+1)+2 )
```

所有表达式都可以放在括号里。

但是下面这样就不对了：

``` aau
(num) = ( (1+1)+2 ) //出错了
```

等号左侧不是表达式、不能用括号包含。


### 3、语句可以用分号标明结束

你可以像下面这样写:

``` aau
num = ( (1+1)+2 );
```

赋值语句是一个语句，可以用语句分隔符。

但是下面这样就不对了：

``` aau
num = ( (1+1); +2 ) //在表达式后面加分号出错了
```

### 3、返回值表达式

函数调用语句的返回值是一个右值表达式，可以作为表达式使用。



