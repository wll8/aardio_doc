# 成员操作符

 参考:[表对象](the%20language/datatype/datatype#vartable) [元表](libraries/kernel/table/table) [重载操作符](the%20language/operator/overloading) 成员符访问对象的成员.设有下面的table对象:


``` aau
tab = {
    member = 123;
    count = 20;
}
```



|  操作符 |  示例 |  说明 |
| --- | --- | --- |
| **.** | var a = tab.member | 成员操作符 |
| [] | var a = tab["member"] | 下标操作符 |
| [[]] | var a = tab[["member"]] |  直接下标操作符 获取或设置对象成员，不会调用元方法。 可用此操作符在元方法中避免递归调用元方法。 |

自以上示例可以看出,以上几种访问对象成员的方法作用类似.都可以存取访问对象的成员.

比较特殊的是直接下标[[]],这个操作符会禁止aardio调用对象的元方法.
直接下标仅支持table对象、字符串对象，其中字符串为只读访问(只能读取成员,不能写入),使用直接下标访问字符串成员时返回的是字符(字符串对象),而使用普通下标返回的是该字符的字节码(数值对象),示例如下:

``` aau
str ="abc"

io.open();
io.print( str[1] == 'a'# ) //下标越界会返回0
io.print( str[[1]] == 'a' ) //下标越界会返回null
```



将直接下标用于没有成员的数据类型,例如数值变量等,直接下标操作符不会象普通成员下标操作符那样抛出运行时异常,而是返回一个null值.使用这个特性,我们可以同时判断一个对象是不是集合对象,并且是否拥有指定的成员.

在win.ui库中有很多的函数,部分参数兼容win.form对象或普通的窗口句柄,这时需要快速的判断对象是不是一个表,是否有hwnd成员,而win.form创建的对象有指定_get元方法,对于不存在的对象不是返回null值,而是返回一个table,这样我们写起来可能非常麻烦,大概要这样写:

``` aau
hwnd = ( type(arg)==type.table && type(arg.hwnd)==type.number ) ? arg.hwnd : arg
```

或者写直白一点:

``` aau
if( type(arg)==type.table && type(arg.hwnd)==type.number )
   hwnd = arg.hwnd
else
   hwnd = arg;
```

因为arg可能是一个数值,对数值写arg.hwnd会出错,所以要先判断他是不是一个type.table,因为win.form对象还有元方法不存在的对象会返回table,这时后面又要判断他返回的是不是一个数值.

这时候我们可以用直接下标操作符,可以很简单的完成上面的所有事,禁止元方法,检测对象是否一个table,并且是否拥有指定的成员:

``` aau
hwnd = arg[["hwnd"]]: arg
```

aardio要求你使用这种麻烦一点的操作符郑重其事地表明：你真的知道这个arg对象可能会是一个数值或什么其他的东西。这不是一个粗心的失误。
