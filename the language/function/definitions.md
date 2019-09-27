# 定义函数

aardio所有文档请严格按本页示范的格式、HTML样式编写。

## 函数

函数是预定义子程序，封装一段可复用的代码，接受零个或多个参数，计算并返回零个或多个值。
函数内部是一个语句块，包含一组语句、以执行预定义的程序指令，实现程序员定义的算法，并返回计算结果。
函数的作用类似操作符，接受操作数作为参数，应用算法，执行指令，并返回结果，与操作符不同的是参数的数目不限，且返回值的数目不限。并且函数可以有自定义的名字。

## 定义函数

 定义函数的基本语法：

>

``` aau
function 函数名字(形参,形参2,...) {
           //函数内部代码

           //多个返回值以逗号分隔，如果省略return语句，函数默认返回null空值。
           return 返回值,返回值2;
}
```

 也可以使用begin end标记函数体

>

``` aau
function 函数名字(形参,形参2,...) begin
    //函数内部代码

    //多个返回值以逗号分隔，如果省略return语句，函数默认返回null空值。
    return 返回值,返回值2;
end
```

函数也可以赋值给成员变量、具名常量。

>

``` aau
函数名字 =function(形参,形参2,...) {
    //函数内部代码

    //多个返回值以逗号分隔，如果省略return语句，函数默认返回null空值。
    return 返回值,返回值2;
}
```

 函数定义可以不指定名字 - 即匿名函数　。

>

``` aau
io.open(); //打开控制台

io.print("匿名函数"); //在控制台窗口输出对象
io.print(

    function(形参,形参2,...) begin
        //函数内部代码

        //多个返回值以逗号分隔，如果省略return语句，函数默认返回null空值。
        return 返回值,返回值2;
    end

);
```

## 定义局部函数

函数也可以作为局部变量。局部函数像局部变量一样作用域限于当前语句块。

定义局部函数的基本语法：

>

``` aau
var function 局部函数名字(形参,形参2,...) {
           //函数内部代码

           //多个返回值以逗号分隔，如果省略return语句，函数默认返回null空值。
           return 返回值,返回值2;
}
```

 也可以使用赋值语句定义局部函数

>

``` aau
var 局部函数名字 = function (形参,形参2,...) begin
    //函数内部代码

    //多个返回值以逗号分隔，如果省略return语句，函数默认返回null空值。
    return 返回值,返回值2;
end
```

## 局部函数的递归问题

当局部函数递归调用自身时，因为定义函数时是先创建函数、然后指定局部变量名，因此在局部函数体中并不知道自已的名字是一个局部变量，这样导致局部函数在函数体内部不认识自已的名字。

例如：

``` aau
var 递归 = function ( 计数 ){

	if (  计数 <= 0   )
		return  计数
	else
		return 递归(  计数-1 )   // 出错了找不到函数名字"递归"

}

//调用递归函数
递归( 5 )
```


 解决办法：


``` aau
//在定义函数以前声明局部变量名字
var 递归;

//然后再定义函数体
递归 = function ( 计数 ){

	if (  计数 <= 0   )
		return  计数
	else
		return 递归(  计数-1 )   // 找到函数名字"递归"

}

io.open()

//调用递归函数
io.print( 递归( 5 )   )
```

## 调用函数


调用函数的语法，如下：

``` aau
接收返回值的变量列表 = 函数名字(参数一,参数二,更多参数列表);
```

实参的数目如果多于形参的数目，多余部分被丢弃。
实参的数目如果少于形参的个数，不足的部分添加null值。

可以丢弃部分返回值，如下：

``` aau
返回值一,,,返回值四 = 函数名字(参数一,参数二,更多参数列表);
```

可以丢弃返回值，使用单独的函数调用构成独立语句，如下：

``` aau
函数名字(实参列表);
```

可以省略部分参数，如下：

``` aau
返回值一,,,返回值四 = 函数名字( 参数一, ,  , 参数四, , 参数六 );
```


 调用函数时，不管有没有参数，都要使用括号，不能省略括号，如下是错误的写法;

!> io.open; ![](../../icon/error.gif)

## 函数参数

**形参**：函数定义时括号中预定义的形式参数，形参可以在函数体内部作为局部变量使用。
**实参**：函数调用时括号中指定的实际参数。

``` aau
//这里的a,b,c称为形参，可以将形参看成函数内部的局部变量名字function test(a,b,c){
    return a+b+c; //形参可以在函数体内部作为局部变量使用
}
返回值= test(2,3,4); //这里的2,3,4 称为实参
```

更多关于函数参数的使用技巧请参考： [函数参数用法](the%20language/function/parameter)


## 函数局部变量


 在函数体中可以用var语句定义局部变量，函数的形参也可以作为局部变量使用。
 函数中的局部变量与外部变量命名相同时，在各自的作用域内生效，并不冲突。


 例如：


``` aau
io.open();//打开控制台

str = "我是外部变量"

//定义函数
function func() begin
	var str = "我是局部变量"
	io.print( str , ..str ) //显示变量值
end;

//调用函数
func();

io.print(str) //显示全局变量值
```

根据最少知道原则，在函数中应尽量避免使用全局对象，尤其要避免修改全局对象。
并且局部变量存取速度更快。无论是为了效率，还是降低程序复杂度，都应当优先使用局部变量。

更多关于局部变量的内容请参考：[局部变量](the%20language/variables%20constants#var) [定义局部变量](the%20language/statements/assignment#var)

## 定义成员函数

### 1、定义成员函数

定义成员函数原型：

``` aau
tab = {};

tab.函数名字 = function( 形参列表 ) {
    //函数内部内码
}
```

也可以使用下面的格式定义成员函数：

``` aau
tab = {};

function tab.函数名字( 形参列表 ) {
    //函数内部内码
}
```

### 2、调用成员函数原型：

``` aau
tab.函数名字( 实参列表 );
```

### 3、成员函数的owner对象

请参考：[owner](the%20language/function/owner)