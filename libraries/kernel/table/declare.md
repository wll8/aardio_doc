# 原型类

 原型类可以使普通table对象具有构造新对象的功能。请参考：[类](the%20language/class/class)
 使用原型类必须首先调用 import util.declare;导入原型类支持库.

## 使用 util.declare 函数定义原型类

**1、函数原型：**

``` aau
原型类 = util.declare(原型,...)
```


**2、函数说明：**

 该函数需要导入util库支持.

 该函数定义并返回一个原型类.
 原型类可以象普通类一样使用并构造新对象.
 原型类拥有prototype成员,是构造新对象的原型.

 参数可以是原型表，也可是原型类 
 原型使用传入util.declare的一个或多个原型对象混合而成。
 混合使用table.mixin()函数,混入对象总是替换目标的同名对象.
util.declare的参数如果超过两个,则第一个参数作为原型类的基类,可以使用_base成员访问基类成员.

 原型对象可选指定constructor成员作为原型类的构造函数使用.
 可以使用 原型类.prototype.constructor 访问或修改定义的构造函数

**3、调用示例：**


``` aau
import console
import util.declare;
var base = util.declare(  console,{
    constructor = function( ... ){
        io.print("基类构造函数")
    }
    destructor = function(){
        io.print("基类析构函数")
    }
} )

import util.declare;
var cls = util.declare( base ,{
    constructor = function( ... ){
        io.print("子类构造函数")
        io.print("成员属性",owner.b )
    }
    destructor = function(){
        io.print("子类析构函数")
        io.print("注意类没有独立的名字空间，访问外部名字空间不需要加..")
    }

    b = 456
} )

var obj = cls();
obj.log( obj.b )
```

## 定义原型类 简单示例


 注意原型类没有独立的名字空间.

``` aau
import util.declare;

 cls = util.declare(

	abc = 123;
	func = function(){
		io.print( "成员函数",owner.abc );
	}
	constructor = function(...){
	//构造函数写在最后面
		io.open()
		io.print( "构造函数",owner.abc );
		return owner
	}
)

obj = cls()
obj.func() ;
```

## 使用多个原型定义原型类


util.declare()函数支持不定个数的参数,可以混合多个原型生成原型类.
 无论你指定几个原型,util.declare()总是会创建一个新的原型,而不会修改所有传入的原型表


``` aau
import util.declare;原型 = { a = 1 }
原型2 = { b = 2 }

cls = util.declare( 原型,原型2, {

	abc = 123;
	func = function(){
		io.print( "成员函数",owner.abc );
	}
	constructor = function(...){
		//构造函数写在最后面
		io.open()
		io.print( "构造函数",owner.abc );
		return owner
	}
} )

obj = cls()
obj.func() ;
io.print( obj.a,obj.b )
```

## 访问基类成员


 原型类以及使用原型类创建的对象,都可以使用_base属性访问基类成员.

 所有原型类都会创建一个inherited函数,可以用于调用基本的成员或成员函数.

``` aau
import util.declare;

super_class = {
	a = 23;
	func = function(){
		io.print("基类",owner.a )
	}
	constructor = function(){
		//构造函数写在最后面
		io.print("执行基类构造")
	}
}

_class = util.declare(super_class,{
	a = 456;
	func = function(...){
		io.print("基类 a成员",owner.inherited("a") )
		io.print("子类 a成员",owner.a )
		owner.inherited("func",...)
	}
	constructor = function(){
		//构造函数写在最后面
		io.print("执行子类构造")
	}
} );

io.open()
obj = _class ();
obj.func();
```


 注意调用类构造对象时,基类的构造函数会自动调用,不需要调用 owner.inherited() 函数.

## 原型类与普通类的区别


使用class定义的类, 成员的原型默认是不暴露在外的,不可修改,
但原型类可以使用_prototype访问原型,并可使用util.extend()函数扩展类的原型.

class定义类时,使用ctor关键字定义构造函数,构造函数只能在类的开始,
而原型类使用constructor名字的函数作为构造函数.

class定义的类,在类内部,可使用this访问实例对象. 
而原型类中只能使用owner访问当前调用对象(也就是调用语句中函数名字前面的对象),相对来说,owner是可变动的具有一定的不确定性.

在class内部定义的类,每个实例的成员函数都有独例的副本,并可使用构造函数定义的局部变量,有较好的封装性.
而原型类的成员函数是在原型表中,为所有实例共享,有较好的性能,但是隐蔽性不好，默认不能为每个实例的成员函数建独立的闭包.

实际上,在使用class定义类时,也可以使用元表来指定原型,实现多继承的效果,
例如属性表(util.metaProperty)在类中的运用,大家可以根据需要选用, 一般情况下,建立使用class定义类.
