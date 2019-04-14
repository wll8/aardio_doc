# 取长运算符

 取字符串长度、或table数组元素个数。 如果对象是null空值,返回0,
 如果对象是字符串返回字符串长度,
 如果对象是table数组,返回table数组长度 - 该操作符取的是索引自1开始的序列数组的长度，而稀疏数组应使用table.range()函数获取索引范围。

 否则检查对象是否定义了_len元方法，如果存在就调用_len元方法返回值,否则抛出异常.


|  运算符 |  说明 |
| --- | --- |
| # |  取长运算符(单目运算符) |


 例如：

``` aau
str = ""
if( #str ){
    io.print ( "字符串非空",str )
}
else{
    io.print ( "null或空串" )
}
```


 因为#操作符对于一个空字符串或null值都会返回0,如果要判断非null并非空字符串时,可以使用#操作符简化判断语句.