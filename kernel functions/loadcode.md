# loadcode() 函数

loadcode() 加载一aardio代码、或一个aardio代码文件,并创建一个函数对象.

## loadcode() 函数

**1、函数原型：**

``` aau
函数对象,错误信息 = loadcode( codeString | filepath )
```


**2、函数说明：**

参数可以是包含aardio代码的字符串值,也可以是aardio代码文件的路径.路径可以用斜杠作为首字符表示应用程序根目录。
	该函数 并不立即执行代码,而是返回一个函数对象.

 如果加载代码失败,则返回的函数对象为null值,并在第二个返回值中返回错误信息.

 一个类似的函数是 [eval](kernel%20functions/eval) 函数,eval立即运行代码,并将代码作为一个普通表达式计算并返回值.
eval会抛出异常而不是返回错误信息,并且eval不支持用文件路径参数.


**3、调用示例：**

``` aau
import console;

//生成一个测试用代码文件
string.save("/.test.aardio","
var a,b,c = ...;//文件也是一个匿名函数,可以这样接收参数
myTestFunc = function(){
    return'loadcode->myFunc';
}");

//加载代码文件返回一个函数对象
var func = loadcode("/.test.aardio")

//执行代码文件
func("a参数","b参数","c参数")

//执行该代码文件中定义的函数
var str=myTestFunc();

//暂停控制台并显示str变量
console.pause(,str);
```
