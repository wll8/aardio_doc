# JS与aardio语法比较(面向对象部分)

 参考:[在网页脚本中调用aardio函数](web/external) [在aardio中执行网页脚本](web/doscript)

## 概述

Javascript在web编程、网页编程中是最重要的一种客户端脚本语言，而在aardio程序设计中，他又具有了一些新的应用，例如Web UI界面设计，通过aardio也扩展了Javascript的本地化编程应用，而Javascript也很好的扩展了aardio的功能。

Javascript、aardio的语法都是基于C系语法，而且同是动态语言，语法特性非常接近。而在aardio的Web编程中，Javascript可能是大家接触最多的语言。了解两种语法的异同有助于同时加深对Javascript,aardio两种语言的理解。

本文适合至少熟练掌握这两种语言中其中一种的用户，如果你熟悉Javascript或aardio,本文将有助于你快速的掌握另外一种语言.

aardio与Javascript的语法差异主要表现在面向对象有关的一些语法上。
下面我们以此为重点介绍两种语言在实现面向对象特性时的一些语法区别.
 参考资料: [aardio中的类](the%20language/class/class)

## 数据集合

在aardio中表示数据集合只有一种对象，即[table对象](the%20language/datatype/datatype#vartable)，table对象不但可以包含键值对，而且可以包含数组，[table对象](the%20language/datatype/datatype#vartable)所有成员放在大括号中，并用分号分隔。

> aardio用大括号表示集合，无论是指令集合(语句块)，还是数据集合(table)
 并且使用分号分隔元素，无论是指令元素(语句)，还是数据成员(table成员)
 保持语法的简洁，和概念一致性。

**例如：**

``` aau
//aardio代码:

var tab = {

    123;456;789;
    name = "张三";
    gohome = function(){
        io.print("I'm back")
    }

}

io.print( tab.name ) //显示 张三
io.print( tab[1] ) //显示123
```

而在Javascript，分为对象字面量,以及数组。

?> 字面量(Literals)：有时候叫直接量,对象直接量指的是定义对象的代码构造的匿名对象,因为对象在创建时还没有名字,表示的就是代码描述的值,即字面值或字面量.

对象字面量,用冒号分隔键值对，而使用逗号分隔成员，例如:

``` aau
//Javascript代码

var tab = {
    name:"张三",
    gohome:function(){
        document.write("I'm back")
    }

}

document.write(tab.name); //显示 张三
```

上面的冒号用的有些怪异,在aardio中取而代之的是等号.

数组则放在中括号中，并使用逗号来分隔。

``` aau
//Javascript代码

var tab = [123,456,789]
document.write(tab[1]); //显示 123
```


aardio在创建数组时仍然使用大括号，并且分号分隔元素。

## 类

Javascript中没有明确类的概念，也没有相关的语法关键字，而普通的对象，函数可都以模拟类的作部分功能.
用new关键词创建对象的副本，实际上这种过于的自由,一定程度上增加了学习理解、记忆的难度，新手要完全理解JS的面象对象机制有一定的难度.

用普通数据对象模拟类的实现

``` aau
//Javascript代码

var test = {}
test2 = new test; //当你使用new关键字,对象就模拟类的功能创建新的实例.
```

aardio中并不认为table对象是类,仅仅是提供了简单的深拷贝函数复制table对象,如下:

``` aau
//aardio代码:

var test ={}
var test_new = table.clone(test)
```



Javascript也可以用函数来模拟实现类，你如果习惯使用传统语言,可能有些难以理解,实际上你可以当他是一个类的构造函数.这种隐晦传递的语义使JS构建类的代码不太好理解.

``` aau
//Javascript代码

function myclass(){
    this.name = "张三";
    this.getName = function(){
        return this.name;
    }
    this.setName = function(name){
        this.name = name;
    }
}
```

在构造函数中,使用this表示创建的对象实例(每次运行构造函数会创建不同的对象实例)
这一点与aardio非常相似,在aardio的构造函数中,同样可以使用this访问对象实例.

``` aau
//aardio代码:

class myclass{

    ctor(  ){ //ctor定义类的构造函数
        this.name = "张三";
        this.getName = function(){
            return this.name;
        }
        this.setName = function(name){
            this.name = name;
        }
    };

    //下面的这样增加类实例成员的方法,javascript是不支持的
    age = 23;
    gohome = function(){
        io.print("I'm back")
    }

}
```

除了使用this关键字表示实例对象与javascript一致以外.
aardio显示的定义一个类,并可以显式的定义类的实例成员,语法更为接近传统编程语言.

而实际上JS用函数构建类,等于仅仅提供了aardio中ctor构造函数的功能,这时候函数同时具有多个责任,即表示一个类,又表示一个构造函数,这种设计实际上违背了一个函数一个职责的基本原则。


## 创建对象实例

JS用new关键字来创建对象实例

``` aau
obj = new 函数名或对象名
obj = new 函数名(构造参数)
```


,而aardio不需要使用new关键字,但是必须在后面加上表示调用构造函数的括号,如下：

``` aau
obj = 类名(构造参数)
```



## this的区别

在Javascript中,使用new关键字创建对象时,函数类似aardio中的类.

``` aau
obj = new 函数名或对象名
obj = new 函数名(构造参数)
```


 这时候,函数中的this与aardio中的this一样,都是表示当前创建的对象实例.


 但是,如果没有使用new关键字,直接调用函数,在Javascript函数中也可以使用this关键字,
 但是这时候表示的只是函数的所有者,也就是aardio中的owner对象.onwer指的是函数的当前名字空间前缀.

 如下JS代码:

``` aau
返回值 = 所有者.函数名(参数)
```


 上面的所有者就是此函数调用时的owner对象.
 当没有名字空间前缀时,aardio的owner为null空值,而这时候Javascript的this则等价于global全局对象.

 在Javascript中,有较多契约式的设计,例如函数在在一些前提下表示类,一些前提下又表示函数,this在一些前提下表示this,而在一些前提下又表示owner,这种设计风格不但表现在语言层面,也影响到使用Js的程序员,以及一些框架,例如jQuery的参数各种不同的变化可以写出一本厚厚的书. 这也是造成Javascript易学难精的一个主要原因.

## 原型表

javascript可以使用prototype指定对象的原型表

例如：

``` aau
//Javascript代码

function myclass(){
    this.name = "张三";
}

myclass.prototype.sex = "男" ;//成员变量
myclass.prototype.getName = function(){    //成员方法
    return this.name;
}
```

prototype就是一个表,下面的代码也可以写成下面这样:

``` aau
//Javascript代码

function myclass(){}
myclass.prototype = {
    name:"张三",
    sex:"男",
    getName:function(){
        return this.name;
    }
};
```


区别是放到了一个表里,并且把等号变成了冒号.

而在aardio中可以为一个对象指定元表，元表中的_get元方法则可指定一个原型表.
aardio中的元表比JS中的原型表功能更多一些,不但包含可以指定原型表的_get元方法,还可以使用其他的元方法自定义一些对象的行为,重载操作符等等.请参考:[元表](libraries/kernel/table/meta) [重载操作符](the%20language/operator/overloading)

在aardio中使用@表示对象的元表,通常在对象后面附加@后缀表示该对象的元表,
而在表构造器中用@前缀指定的一个元表.

我们可以使用元表实现类似JS中的prototype功能.如下:

``` aau
//aardio代码:

class myclass{

	ctor( ){

	};

    @prototype;
}

myclass.prototype._get = {
    name="张三";
    sex="男";
    getName=function(){
        return this.name;
    };

}
```

aardio中的元表还可以实现一些更强大的功能,例如属性表:

``` aau
//aardio代码:

import util.metaProperty

class myclass{
	ctor( /*输入构造函数所需要的参数*/ ){

	};
    @metaProperty;
}

myclass.metaProperty = util.metaProperty(

	属性 = {
		_get = function(){
			/*读取属性代码写在这里*/
			return null;
		}
		_set = function( value ){
			/*写入属性代码写在这里*/
			..io.print( owner,value)
		}
	};
	@{ _get = ..父属性表 } /*属性表可继承*/
)
```

属性表可以更好的支持面向对象技术,在aardio标准库中的应用非常多,例如win.ui.ctrl库.

## 静态方法

一个类创建的所有对象都可以访问的方法称为静态方法.对于一个类,静态方法只有一个实例.不会因为创建新对象而创新建新的静态方法.

aardio与JS使用静态方法的语法是一样的,都是在类名后直接跟上静态成员的名字,例如:

``` aau
类名.静态成员名字
```


而在C++语言里,也有类似的语法,用::代替.表示静态成员,例如:

``` aau
类名::静态成员名字
```

总之跟在类名后面的成员是静态成员,跟在对象名字后面的是实例成员,这在大多数语言中都一致.

## 私有成员

在JS以及aardio中都可以在类的构造函数中用var语句声明私有的局部变量.
aardio的构造函数作用域为整个类(与普通函数不同),因此构造函数中定议的局部变量在类定义范围有效，而在类外部无法直接访问。

## 只读成员

在aardio可以为成员常量添加下划线作为前缀表示只读成员,只读成员一旦初始化以后就不能再修改其值.
而Javascript中不能定义类的只读成员.

## 继承

javascript通过prototype实现继承

``` aau
//Javascript代码

function parent(){
    this.familyname = "张"
    this.name = "张三他爸"
    this.getFamilyName  = function(){
        return this.familyname;
    }
}

function child(){
    this.name = "张三";
}
child.prototype = new parent();//注意要用new
```

而在aardio里继承的方法比较多,一种是类似上面的将原型表指定为父类构建的实例,称为间接继承.

也可以使用更简单的直接继承,如下:

``` aau
//aardio代码:

class parent{
    familyname = "张";
    name = "张三他爸";
    getFamilyName  = function(){
        return this.familyname;
    }
}

class child{
	ctor(){
		this = ..parent()
	}
    name = "张三";
}
child.prototype = parent();
```



## 名字空间

在Javascript里对名字空间的支持非常有限,
而aardio有非常完整的模块化、名字空间机制，在aardio中每个类有自已的名字空间,类的名字空间里的成员也是类的静态成员.请注意这方面的差异，具体请查看： [aardio的名字空间](the%20language/namespace)
