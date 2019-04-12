# eval() 函数

eval() 函数可将字符串转换为代码执行，并返回一个或多个值

## eval() 函数

**1、函数原型：**

``` aau
返回值 = eval( codeString )
```


**2、函数说明：**

eval() 函数可将字符串转换为代码执行，并返回一个或多个值.
 如果eval函数在执行时遇到错误,则抛出异常给调用者.

 类似的函数是 [loadcode](kernel%20functions/loadcode),loadcode并不立即执行代码,而是返回一个函数对象.
 并且loadcode支持路径参数,eval并不支持. eval并不支持代码中的return语句,而是将代码作为表达式直接计算出结果.

**3、调用示例：**

``` aau
import  console;

console.log(  eval("1+1")  )

console.pause();
```
