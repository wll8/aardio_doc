# call() 函数

call() 函数用于调用一个aardio函数,并可自定义owner对象,并获取错误信息

## call() 函数。

**1、函数原型：**

``` aau
返回值,错误信息 = call(函数,owner,其他参数 ... )
```


**2、函数说明：**

call函数可以调用并执行一个函数对象,
 与普通函数调用不同的是:可显式指定owner对象,并可获取错误信息而不是直接抛出异常.

**3、调用示例：**

``` aau
call(io.open,io)
ok = call(io.print,io,123)

ok,err = call(notfound,io,123)
if(!ok) io.print("出错了",err)

execute("pause")
```
