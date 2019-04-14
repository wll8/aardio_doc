# 查找字符串

 下面介绍不使用模式匹配语法的字符串查找函数，请参考：[模式匹配函数](libraries/kernel/string/pattern%20matching)

### 一、查找字符串

`string.indexAny(str,chars | bytecode)`

查找chars 中的任意一个字符位于str的位置。也可以在第二个参数指定一个字节码。

``` aau
io.open(); //打开控制台窗口
io.print( string.indexAny("abcdefg","cde") ) //显示3
io.print( string.indexAny("abcdefg",'c'# ) ) //显示3
```

### 二、反向查找字符串

`string.lastIndexAny(str,chars | bytecode )`

自后向前查找chars 中的任意一个字符位于str的位置。也可以在第二个参数指定一个字节码。io.open(); //打开控制台窗口
io.print( string.lastIndexAny("abcdefg","cde") ) //显示5

### 三、在字符串开始查找

`string.startWith(str,substr,是否忽略大小写=false)`

判断substr是否位于str开始处。参数三为可选参数(默认为false) io.open(); //打开控制台窗口

``` aau
io.print( string.startWith("abcdefg","abc") ) //显示true
io.print( string.startWith("abcdefg","efg") ) //显示false
```

### 四、在字符串尾部查找

`string.endWith(str,substr,是否忽略大小写=false)`

判断substr是否位于str结束处。参数三为可选参数(默认为false)

``` aau
io.open(); //打开控制台窗口
io.print( string.endWith("abcdefg","abc") ) //显示false
io.print( string.endWith("abcdefg","efg") ) //显示true
```
