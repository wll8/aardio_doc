# 泛型for与迭代器

 参考： [for循环语句](the%20language/statements/looping#for) [循环中断语句(break、continue)](the%20language/statements/looping#break)

## **迭代器**

请参考：[函数闭包](the%20language/function/closure)

迭代器简单的讲就是在for in语句中用于循环取值的函数，下面是一个最简单的例子：

``` aau
import console;

/*
创建一个迭代器函数,
迭代器接受一个参数，返回一个或多个值
*/
var 迭代器 = function(控制变量){
	if(!控制变量) return 1;
	if(控制变量//在for语句中循环调用迭代器函数,直到迭代器返回空值
for( 反馈结果 in 迭代器 ){ //for语句这对圆括号也可以省略
	console.log(反馈结果)
}

console.pause(true);
```

迭代：是指循环取值并不断逼近最终目标的过程，每次取值的结果总是作为下一次迭代的初始值。具体到迭代器函数，就是每一次调用迭代器得到的第一个返回值总会作为下一次调用迭代器的参数 - 这个关键的迭代结果值我们称之为`控制变量`。

迭代器就象一个生产者，而for语句就象一个消费者，这实现了类似协程的一种分工合作的机制，很好的分离了代码逻辑，在迭代器与for语句中交替的交换运行代码的控制权，例如我们在某个对象内部实现了迭代器（ 这个函数可能封装了大量的循环取值的代码 ），在使用该迭代器的时候只要简单的调用循环语句就可以（ 代码可能就只要一两句 ）。

实际上，在for语句中还可以指定集合对象，控制变量的初始值，例如：


``` aau
for 返回值列表 in 迭代器函数,集合对象,控制变量初始值 {

}
```

集合对象会在调用迭代器函数时 - 被指定为 owner 参数。
而控制变量初始值 - 则作为第一次调用迭代器函数的参数，这个控制变量通常省略，迭代器函数通常在得到一个空的初始值时开始工作。

我们可以写一个专门生成迭代器的函数，用于接受一些参数批量动态的创建不同的迭代器，例如：

``` aau
var 迭代器函数,集合对象,控制变量初始值 = 迭代器生成器( 创建迭代器的参数 )

for 返回值列表 in 迭代器函数,集合对象,控制变量初始值 {

}
```

当然，上面的代码实际上可以合并为一句，如下：

``` aau
for 返回值列表 in 迭代器生成器( 创建迭代器的参数 ) {

}
```

 在aardio标准库中，有大量的上面这样的迭代器生成器，例如遍历所有窗口的winex.each函数：

``` aau
import console;
import winex;

//winex.each就是一个迭代器生成器
for hwnd,title,theadId,processId in winex.each( ".+", ".+" ) {
    console.log(hwnd,title,theadId,processId )
}

console.pause();
```

## 无状态迭代器、与有状态迭代器

如前所述，for语句可以在调用迭代器时自动传递集合对象，控制变量：

``` aau
for 返回值列表 in 迭代器函数,集合对象,控制变量初始值 {

}
```

如果迭代器自身不保存任何状态，依赖for语句来保存迭代的进度，
我们就称之为`无状态的迭代器`，举个例子如下：

``` aau
import console;

//无状态的迭代器
var iterator = function(index){
	if(!index) index = 1;
	else index = index + 1;
	if(index<=#owner) return index,owner[index];
}

for( index,value in iterator,{123;456;789} ){
	console.log(index,value)
}

console.pause(true);
```

反之，如果迭代器不使用for语句来保存或传递迭代的进度和状态，而是自己负责存储状态，
那就称为`有状态的迭代器`，举个例子如下：

``` aau
import console;

//有状态的迭代器
each = function(value){

    var 集合对象 = value;
    var 控制变量 = 0;

    var 迭代器 = function(index){
        控制变量 = 控制变量 + 1;
        if(控制变量<=#集合对象) return 控制变量,集合对象[控制变量];
    }
    return 迭代器;
}

//循环语句
for( index,value in each( {123;456;789} ) ){
    console.log(index,value)
}

console.pause(true);
```

实际上我们也可以两种方式混用，所以不必太在意这种分类。

## 迭代遍历table表

如果在for in 语句中直接给一个table对象而不是一个迭代器，aardio会遍历该table对象，示例如下：

``` aau
import console;

var tab = { a=333;b=444;1;2;3 }
for k,v in tab {
 	console.log(k,v);
}

console.pause();
```

如果上面代码for语句中的tab即不是迭代器，也不是table对象，那么for语句会直接忽略（不会报错）

如果使用for in语句直接迭代一个表,在迭代语句内部只能修改被迭代表的键值,
但不可以增加新的键值，增加新键值可能导致表的迭代次序被打乱。

## 迭代器的析构器


有状态的迭代器编程更为简单,因为可以直观的看到作为局部变量的状态值,代码的可读性也更好一些,并且可以使用析构器释放资源.

下面是使用析构器的简单示例：

``` aau
迭代器生成器 = function(n){

    var 迭代器 = function(){

    }

    var 析构器 = function(){

    }

    return 迭代器,析构器;//必须返回两个值，并且都是函数
}

for(控制变量 in 迭代器生成器() ){

}
```

无论是正常的结束循环，还是用break意外中断当前循环,aardio保证都会调用指定的析构器函数。
当使用break n语句中断外层循环、或使用return语句退出时,当前循环的析构器不会被触发。所以迭代器的析构器只是提供一个尽可能马上释放资源的机会，但并不保证一定会释放资源，例如在迭代器中创建了一个句柄需要在迭代结束后保证被释放，这时候可以使用析构器，并使用gcdata为句柄对象自身添加析构函数以保证句柄一定会被关闭。

## 纤程生成器

我们前面说过迭代器的思路是在迭代器与for语句中不停交换执行代码的控制权，这与纤程的交换执行代码的控制权类似，实际上 我们还可以使用纤程来生成for语句的迭代器，下面看一个例子：

``` aau
import console;

function fib(max){
    var a, b = 1, 1;
    while a < max {
        fiber.yield( a );
        a, b = b, a+b;
    }
}

for v in fiber.generator(fib,console.getNumber( "请输入斐波那契数列范围:" )) {
    console.log( v )
}

console.pause()
```
