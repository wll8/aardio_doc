# lambda 表达式

lambda表达式用于定义匿名函数，与普通匿名函数的区别如下：

``` aau
1、lambda 不需要写return语句就可以直接返回一个表达式。

   例如 lambda() 123 等价于 function() return 123;

2、lambda的函数体只能是一个表达式，不能使用其他语句或语句块，
   例如 lambda(){} 等价于 function() return {};

3、lambda表达式不包含逗号，不会返回多个值。

   例如 console.log( lambda() 123, 456 )
   等价于 console.log( function() { return 123 }, 456 )

4、lambda表达式的函数体不是语句,不包含分隔语句的分号。

   例如 console.log( lambda() 123; ) 是错误的写法

可选使用希腊字母λ代替 lambda关键字。
```
