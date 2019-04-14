# table库

 请参考：[数据类型 - table](the%20language/datatype/datatype#vartable)

**1、取得数组大小**

`min , max = table.range( tarr )`

获取table类型参数tab的数组大小，示例：

``` aau
io.open()
tarr = { 123;456;77;99 };//创建数组，数字索引默认从1开始

io.print( table.range( tarr ) )
```

**2、在数组中插入删除元素**

`table.insert(tab,value ,pos = 1)`
在table类型参数tab中`插入元素`(value),
pos指定插入位置,如果指定这个参数,table.insert首先在tab[pos]插入value并将后面的所有元素顺序向后移动。
pos为可选参数，默认值为1(即在数组开始插入)

`value = table.remove (tab ,pos = 1)`
在数组指定位置移除元素，然后从此位置开始将所有元素前移一位。
pos为可选参数，默认值为1(即在数组开始移除）
返回值为移除的元素 如果您不希望在删除元素后改变其他的元素的位置，可以使用赋值为null的方法删除一个元素

``` aau
tab = {"a";"b";"c";"d";"e"}
table.remove (tab ,2); //移除第二个元素,后面的元素全部向前移动一个单位.
tab[2] = null; //删除第二个元素,不会改变其他元素的位置。

io.open()
for name,value in tab{
     io.print( name,value);
}
```


**3、用数组实现堆栈操作**

 堆栈操作避免了数组的重新排序，效率高于table.insert,table.remove。

`table.push(tab ,value[, value , ... ] )`

 在数组尾部添加一个或多个值。table.push返回新数组的长度（最后一个元素所在的索引)
 如果连续push多个值，例如：

``` aau
// 如果连续push多个值，例如：
table.push(tab ,a)
table.push(tab ,b)
table.push(tab ,c)

// 应当放到一个push操作中效率会更好一些，例如
table.push(tab,a,b,c)
```

`table.pop(tab [, n] )`

在数组尾部弹出一个或n个值。 n为可选参数，默认为1
返回值为一个或n个移除的数组元素。

``` aau
//实现一个堆栈类
class Stack {
    @{ _get = self }
}
Stack.push = function( ... ){
    table.push( owner , ... );
}
Stack.pop = function( n ){
    return table.pop( owner , n );
}
sk = Stack();//创建新的堆栈对象

sk.push("a","b","c") //压入一个或多个参数

io.open();
io.print( sk.pop(3) ) //弹出一个或多个参数

```


**4、遍历数组**

用for循环顺序遍历有序数组所有元素。

``` aau
io.open();//打开控制台窗口,用来支持io.print函数
tab = {123;456;789};//创建数组，数字索引默认从1开始
for i=1; #tab;1 {
    io.print( tab[i] );
}
```

上面的方法对于稀疏数组是低效的。想象一下对下面这样的数组使用上面介绍的计数循环。

``` aau
tab = {1};
tab[100] = 100;
var min,max = table.range(tab);//取稀疏数组范围

io.open()
for(i=1;max;1){
    if( tab[i] !== null ) io.print( tab[i] )
}
//数组只有一个元素却要循环100次
```

这时候，我们可以用泛型for循环遍历稀疏数组元素。

``` aau
tab = {"字符串";123;"字符串2";23;56;78;99;123;0;test=123};//tab.test不是数组元素
tab[1000] = 123; //稀疏数组

io.open();//打开控制台窗口,用来支持io.print函数
for name,value in tab {
    if( type(name) == type.number ){
        io.print( name , value )
    }
}
```

**5、数组排序**

`table.sort (tab [, comProc])`

``` aau
comProc = function(b) begin
      return owner < b;
end;
```


对数组tab重新排序,comProc是一个可选参数,comProc是一个排序回调函数用于比较两个元素的大小。
table.sort在排序过程中，每遇到两个元素就调用comProc函数比较大小,并将两个元素作为参数传递给comProc函数。
如果comProc函数认为第一个参数比较小返回true,如果认为第二个参数比较小应当返回false。
如果没有提供排序回调函数,table.sort默认调用小于操作符比较两个元素的大小。

请看下面的例子：

``` aau
io.open()
tab ={3;4;7;8;6;5;2;1}
table.sort(tab);

//看看排序后的结果
for i=1; #tab; 1 {
    io.print( tab[i] );//显示 1 2 3 4 5 6 7 8
}

//table.sort会调用这个函数比较元素大小
comProc = function(b) begin
    return owner > b ;//反过来排序
end;

table.sort(tab,comProc);

//看看排序后的结果
for i=1; #tab; 1 {
    io.print( tab[i] );//显示 8 7 6 5 4 3 2 1
}
```

table.sort是对数组的值域进行排序,不能对字典排序，也不能对键域(下标域)进行排序。

如果我们需要对字典进行排序，可以自已写一个迭代器。将字典中的数据复制到一个数组中然后进行排序。

下面我们介绍如何使用table.eachName迭代器对table中名值域进行排序. table.eachName的源码在preload库中可以找到

``` aau
tab ={c=2;d=7;e=4;g=2;h=8;a=1;b=6;f=5;i=1;j=1;k=9};

io.open();

for k,v in table.eachName(tab)
    io.print(k,v); //table中的键按字母顺序排序了
```






**6、反序**

`table.reverse(tab)`

将一个table数组按原来的顺序反向排列。
注意这个函数没有返回值，直接修改原来的table

``` aau
io.open();

tab = { 1;2;3;4;5;6;7}
table.reverse(tab); //反序排列

for(i = 1;#tab;1){
	io.print( tab[i] )
}
```


**7、拆分数组**

`table.unpack(tab,i=1,e=#tab)`

参数tab：表对象
参数i：起始索引，默认为1
参数e：结束索引，默认数组长度。
返回值：从索引位置i，到索引位置e，索引位置可为负数(表示自数组尾部倒序索引),拆分并返回table对象的数组成员。

该函数并不支持稀疏数组.例如下面的代码不会返回7.

``` aau
table.unpack( {1;2;[7]=7}  )  //返回1,2
```

当起始索引与结束索引都大于零,table.unpack() 则不检测顺序数组的长度,并可支持疏数组,例如下面的代码:

``` aau
table.unpack( {1;2;[7]=7},1,7 )  //返回1,2,null,null,null,null,7
```

`table.left(tab,len)`

参数tab：表对象
参数len：从数组左侧返回的数组元素个数。
返回值：从数组左侧侧拆分并返回table对象的len个数组成员。

`table.right(tab,len)`

参数tab：表对象
参数len：从数组右侧返回的数组元素个数。
返回值：从数组右侧拆分并返回table对象的len个数组成员。



``` aau
io.open();

tab = { 1;2;3;4;5;6;7}
a,b,c,d,e = table.unpack(tab); //将数组全部拆分并返回。
io.print( table.unpack(tab,2,4) ); //返回第2个、第3个、第4个数组成员

io.print( a,b,c,d,e )

io.print( table.left(tab,4) ) //自左侧开始拆分指定长度数组元素
io.print( table.right(tab,4) ) //自右侧开始拆分指定长度数组元素
```

### 8、 序列化table

`table.tostring( tab )`

将table对象序列化为字符串形式，序列化的table必须使用合法的标志符、或数值作为键.

``` aau
io.open();

tab = {1;2;3;a=123;b='456'};
str = table.tostring( tab ); //序列化为字符串（aardio代码）
io.print( table.tostring( tab ) );
```

**9、 拼接table**

`table.concat(tab,tab2[,tab3 [,... ] ])`

将多个表连接为一个新的表，表中如包含数组，索引值修改为原索引值加上在新表中的位置

``` aau
io.open();

tab = {1;2;3};
tab2 = {4;5;6};
tab3 = table.concat(tab,tab2 ); //将多个表拼接为一个表
io.print( table.unpack( tab3 )  );
```


