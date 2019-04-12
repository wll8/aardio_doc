# owner参数

 请参考：[定义函数](the%20language/function/definitions)

## 成员函数的owner参数

请参考：[定义成员函数](the%20language/function/definitions#member)

在成员函数内部可以使用owner参数获取当前的调用该函数的主体对象。
通俗的说也就是调用函数语句中 - 函数名前面的名字前缀（table对象）。
如果调用函数时，并没有使用名字前缀，那么owner参数为null空值。

例如：执行 tab.func() 时，tab.func内部的owner参数指向tab。
当函数作为一个table的成员被调用时，owner参数指向此table对象。

下面是示例代码：

``` aau
//打开控制台
io.open()

//定义函数
一个函数 = function(){
	io.print( owner.name ,"调用了我" )
}

//定义集合
tab = {};
tab.name = "我是tab";

//指定成员函数
tab.成员函数 = 一个函数

//定义集合
tab2 = {};
tab2.name = "我是tab2";

//指定成员函数
tab2.成员函数 = 一个函数

//调用成员函数
tab.成员函数()

//调用成员函数
tab2.成员函数()
```

我们为什么需要owner对象呢？请看下面的示例：

``` aau
tab = {x=0};

function tab.func() {
	return tab.x; //这里会出错,执行函数时tab个变量已经不存在了
};

tab2 = tab;
tab = null; //tab这个变量已经不存在了

//执行函数
tab2.func();
```

我们在函数体里面使用owner参数解决上面的问题，如下：

``` aau
tab = {x=0};

function tab.func() {
	return owner.x; //解决了，owner能正确的找到调用该函数的table对象。
};

tab2 = tab;
tab = null; //tab这个变量已经不存在了

//执行函数
tab2.func();
```

owner参数是最少知道原则的一个应用，函数应当尽可能的避免直接引用外部变量。因为外部的变量总是存在未可预知的变数。



## aardio代码文件的owner参数

注意一个独立的aardio代码文件编译后也相当于一个匿名的函数，代码文件的默认owner参数遵守以下规则：

* 1、在aardio开发环境中独立运行的aardio代码文件，文件级别的owner参数为null。
* 2、使用import语句加载的aardio库文件,owner参数为加载路径、或资源文件数据。


 根据以上规则，可以在库文件中使用 if( owner ) {  } 语句判断库是被加载还是在开发环境中直接执行，
  可用于执行独立测试代码。

请参考：[import](libraries/import)

## 元方法中的owner参数

请参考：[重载操作符](the%20language/operator/overloading)

在元表元方法中，owner表示左操作数。

``` aau
//打开控制台
io.open();

//定义表
tab = { x=10 ; y=20 };
tab2 = { x=10 ; y=20 }

//默认是按引用比较，不指向同一个对象就不相等，结果为false
io.print( "tab==tab2 ",tab == tab2 );

//创建一个元素
tab@ = {
	//元表中的__eq函数重载比较运算符"=="。
	_eq = function( b){
		return ( (owner.x == b.x) and (owner.y == b.y) )
	};
}
tab2@ = tab@;//为tab2添加元表， 比较运算符需要为两个操作数添加同一个元表。

io.print("重载操作符以后 tab==tab2 ", tab==tab2 ); //现在可以使用重载的==操作符按值比较了
```

## 迭代器中的owner参数

请参考：[for in语句、迭代器](the%20language/statements/looping#forin)

在迭代器函数中，owner表示迭代目标对象。

示例：

``` aau
//迭代器工厂函数，用来创建迭代器函数
function iter_factory(tab) {
    //没有在闭包中用局部变量保存任何状态值

    //使用泛型for提供的参数得到迭代器状态。
    function iter ( i ) { //接收for循环传递的参数得到迭代器控制变量
        i++; //i是控制变量，自动加一取下一个索引
        var v = owner[i]; //用新的索引从owner参数取得下一个元素的值
        if( v  )return i, v; //如果找到了值就返回，否则返回null空值
    }
    //迭代器工厂返回迭代器iter,集合对象tab，控制变量0
    return iter, tab, 0
}

tab = {12;345;6789};//创建一个测试用的数组

io.open();
for i,v in iter_factory(tab) {
    io.print(i,v);
}
```
