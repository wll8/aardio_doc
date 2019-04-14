# 关系运算符

 关系运算符比较两个操作数，返回boolean类型的值(true 或false)

## 一、关系运算符

关系运算符小于、大于、小于等于和大于等于通常用于两个数值的比较运算，比较方式与算术比较运算相同。

|  运算符 |  说明 |
| --- | --- |
| > |  大于 |
| < |  小于 |
| >= |  大于等于 |
| <= |  小于等于 |

## 二、比较规则

关系运算符要求两个操作数都是数值、或者都是字符串，
数值之间直接比较大小，而两个字符串则从第一个字符开始比较字节码大小。

关系运算符不能用于字符串与数值之间的比较。
如果将字符串与数值比较，大于、小于会抛出异常、而大于等于、小于等于则永远返回false.因此这种比较是无意义的。

对于其他数据类型，如果指定了_lt运算符，则大于或小于运算符调用_lt元方法进行比较。
如果指定了_le运算符，则大于等于或小于等于调用_le元方法进行比较。
例如datetime对象即支持关系运算符的元方法：

``` aau
io.open();//打开控制台

tm = time.now()//创建当前时间
tm2 = time(tm);//复制时间对象
io.print( tm > tm2 ); //显示false

tm.addday(2); //增加2天
io.print( tm > tm2 ); //显示true

execute("pause") //按任意键继续
io.close();//关闭控制台
```

