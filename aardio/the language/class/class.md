# 类

 我们也可以将一个普通table对象转换为原型类，参考：[table.declare](libraries/kernel/table/declare)

## 定义类



使用class关键字定义类。类可以动态创建数据结构相同的table对象。

定义类的语法：

``` aau
//定义类
 类名字 = class{

   //构造函数可以省略
 	ctor( 构造参数列表 ){
 		//构造函数代码
 	}

 	类属性 = "属性值";

 	类方法 = function(参数){
 	}

 }
```

也可以使用下面的格式定义类：

``` aau
//定义类
 class 类名字{

   //构造函数可以省略
 	ctor( 构造参数列表 ){
 		//构造函数代码
 	}

 	类属性 = "属性值";

 	类方法 = function(参数){
 	}

 }
```

定义类成员的语法与定义table成员相同，请参考：[table数据类型](the%20language/datatype/datatype#vartable)

示例如下：

``` aau
class cls{
	a = 123;
	func = function(){
		//类有自已的名字空间，访问全局对象要加上..前缀
		..io.print("我是对象内部的成员函数")
	}

}

//创建对象
obj = cls();
obj2 = cls();

io.open()

//访问对象属性
io.print( obj.a )

//调用对象方法
obj2.func();
```

## 类的名字空间

请参考：[名字空间](the%20language/namespace)

每一个类拥有独立的名字空间，名字空间中的变量也就是类的公用静态成员。
在类内部访问外部名字空间需要使用完整路径。在类外部可以使用类的名字访问类的名字空间。

``` aau
io.open(); //打开控制台窗口

//定义一个类
class cls{
    a = 123;
}
//每一个类拥有独立的名字空间，名字空间中的变量也就是类的公用静态成员。
cls.A = "类的静态成员A";c = cls(); //创建新对象io.print( "c.a" , c.a ) //显示123
io.print( "cls.A" , cls.A ) //显示"类的静态成员A";
```

如果在外部库名字空间中使用类名字,类应当是库路径的最后一个名字空间.请看下面的代码:

``` aau
import my.cls.c
import my.cls //如果my.cls是一个类,因为类会创建新的名字空间,那么上面导入的my.cls.c会被删除。
```


 请参考: [import](libraries/import)

## this对象

在类内部，可以使用this对象引用动态创建的对象。

示例如下：

``` aau
class cls{
	a = 123;
	func = function(){
		//类有自已的名字空间，访问全局对象要加上..前缀
		..io.open()
		..io.print( this.a )
	}

}

//创建对象
obj = cls();

//调用对象方法
obj.func();
```


当一个table对象调用成员函数时,默认会传递一个owner对象给函数。
而在类创建的对象成员函数里，owner对象与this对象是指向同一个对象。

this对象与owner对象的区别在于。 
this是类内部指向当前创建对象的指针，this指针不会因为函数的table前缀改变而改变。而owner对象是会根据函数调用时函数名前缀的table对象而相应改变。

请参考：[owner](the%20language/function/owner)

示例如下：

``` aau
class cls{

	func = function(){
		//类有自已的名字空间，访问全局对象要加上..前缀

		..io.print("owner", owner  )
		..io.print("this", this )
		..io.print("owner == this", owner == this  )
	}

}

//创建对象
obj = cls();

//打开控制台
io.open()

//调用对象方法
obj.func(); //默认table与owner是同一个对象

func = obj.func;

func();//这里owner为null空值，而this对象没有改变
```

## 构造函数

使用ctor关键字定义构造函数，构造函数在调用类创建对象时被调用。
构造函数可以接收参数，并返回对象。

定义构造函数除了用ctor关键字代替function关键字以外，与定义函数的语法一致。
请参考：[定义函数](the%20language/function/definitions)

构造函数必须是类的第一个成员。

示例如下：

``` aau
//定义类
 class cls{

    //使用ctor关键字定义构造函数
 	ctor( a,b ){
 		this.a = a;
 		this.b = b;
 	}

 }

 //调用类的构造函数创建对象
 obj = cls(123,456);

 //打开控制台
 io.open()

 //访问对象属性
 io.print( obj.a, obj.b )
```

## 类的直接继承

你可以在构造函数中指定this对象，因此可以在运行时指定继承关系，这是动态语言的曼妙之处。
util.metaProperty库里面就使用了这种技巧，动态指定一个基类改变this对象。

类的直接继承也称为装饰继承。

//创建一个基类 
base = class{
a = 123;
b = 456;
c = 789
}
namespace base{
static = 123; //类的静态成员
}

class inheritance{ //类的实例继承

//构造函数
ctor( )begin 
this = ..base(); //调用基类构造对象原型。
end;

c = "覆盖基类成员";
d = "子类的新成员";

}

io.open()
obj = inheritance();//从子类创建对象

//输出所有对象
for(k,v in obj){
io.print(k,v);
}

execute("pause")
io.close()

## 类的间接继承 - 原型链继承

通过对象的元表可以重定义对象的_get操作符到一个原型表table，也可以实现继承的功能。
间接继承的好处继承原型指向静态的公用模板，并不会实际生成新的对象(浅拷贝)，可以占用较少的空间，但是其缺点是访问速度不如直接继承快，并且占用了_get元方法，当我们需要使用_get元方法来做一些其他的事（例如实现属性方法）时就比较麻烦。在间接继承中可以通过owner来访问当前对象（类似直接继承中的this对象）。


base = class{
a = 123;
b = 456;
c = 789
}
class inheritance{

c = "覆盖基类成员";
d = "子类的新成员";

@{ _get = ..base() }; //get元方法可以指向一个table，也可以使用基类构造函数构建的对象
}

io.open()
obj = inheritance();//从子类创建对象

//与类的直接继承不同
//遍历只能输出子类的所有对象
for(k,v in obj){
io.print(k,v);
}

//通过元方法继承仅在使用成员操作符时生效
io.print("这是挪用base表的成员", obj.a );

execute("pause")
io.close()

## 属性元表

在我们设计windows窗体时，会在上面放一些控件，例如我们放一个图像控件button控件，当我们访问他的text属性时，无论读或是写都应当实时调用API从控件中读写。
因为实际的数据是在控件中，而不是我们用来封装botton的对象表中。例如一个winform窗体上有一个button2控件，我们可能这样读他的属性。

> var text = winform.button2.text

实际上，我们应当调用一个函数来动态的返回text属性。一般我们想到通过_get元方法来拦截所有的成员读写操作，并转换为方法。

但是发生了两个问题

> 1、所有的控件有一些共同的属性，例如大小、字体等等，而_get元方法已经为了实现属性字段被占用了，已经拥挤了大量的逻辑，

2、实现原型链继承很困难，一切都变的复杂！

3、属性字段越来越多，我们假设有二十个属性，我们的_get函数里的代码将会非常的多，而实际上，我们每次访问的仅是其中一小部分代码。

aardio的早期版本并没有属性表的概念，win.ui.controls库的设计臃肿混乱、为了解决所有的问题，让可变的代码与不变的代码合理分离，将继承关系与属性方法实现进行合理分离，
我设计了util.metaProperty库，这是一个外部库，你可以在库面板中查看其源码，很简短，解决了所有的问题。win.ui.controls.metaProperty则是util.metaProperty的一个扩展。提供类似的功能。应用属性表以后，win.ui.controls减少了很多并更为清晰。

我们看下面win.ui.controls里的部分代码:

class picturebox{
ctor(tvalue){
tvalue.style |= 0xE/*_SS_BITMAP*/;
tvalue.cls = "static" 
if(tvalue.edge) tvalue.exstyle |= 0x20000/*_WS_EX_STATICEDGE*/; 
if(tvalue.transparent)tvalue.exstyle |= 0x20/*_WS_EX_TRANSPARENT*/;
if(tvalue.notify)tvalue.style |= 0x100/*_SS_NOTIFY*/ 
tvalue.style |= 0x2000000/*_WS_CLIPCHILDREN*/ | 0x4000000/*_WS_CLIPSIBLINGS*/;
}
@_metaProperty; //属性元素必须使用此变量名字 
}

picturebox._metaProperty = win.ui.controls.metaProperty(

image = {
_get = function(){ 
return null;
}
_set = function( value ){
var pic,imgtype = ..win.ole.LoadHbitmapFromFile(v); 
if( imgtype ==0x1/*_IMAGE_ICON*/ )
{ 
var style = ::GetWindowLong(owner.hwnd, 0xFFFFFFF0/*_GWL_STYLE*/); 
::SetWindowLong(owner.hwnd,0xFFFFFFF0/*_GWL_STYLE*/,style | 0x3/*_SS_ICON*/ );
::SendMessage(owner.hwnd,0x170/*_STM_SETICON*/, topointer(0x1/*_IMAGE_ICON*/),pic); 
}
else if( imgtype ==0x0/*_IMAGE_BITMAP*/ ){
var style = ::GetWindowLong(owner.hwnd, 0xFFFFFFF0/*_GWL_STYLE*/); 
::SetWindowLong(owner.hwnd,0xFFFFFFF0/*_GWL_STYLE*/,style | 0xE/*_SS_BITMAP*/ );
SendMessage(owner.hwnd,0x172/*_STM_SETIMAGE*/, topointer(0x0/*_IMAGE_BITMAP*/),pic);
}
} 
}; 
)
//红色部分创建了属性元表、蓝色部分创建了一个属性字段

当我们在窗体winform上创建一个picturebox控件，我们可以直接通过winform.picturebox.image读写属性。当然图片在屏幕的控件上，而不是picturebox这个对象里面，无论是读或写都要从控件中实时读写，这就需要把他们映射为函数，我们看蓝色部分的代码，当省略_get时可以创建一个只写属性，而省略_set时可以创建一个只读属性，你可能在C#里看过类似的语法。
 我们可以仅仅在需要属性表时加载
util.metaProperty，这样不会影响普通表存取的速度。
 无论是util.metaProperty的实现、还是util.metaProperty的使用都非常的简洁、直观并易于扩展。

 属性表的意义在于扩展了_get _set元方法、使每一个属性字段都可以定义自已的_get _set方法 ， 方便的定义只读、只写属性。属性元表不但可以自定义对象的元方法，而且可以通过属性表定义对象的原型，该原型（属性表）是支持多级继承的 。并且在多级继承中始终可以访问当前owner对象。

## 信息隐藏、成员保护

**1、在构造函数中可以使用var语句创建对象的私有数据。**

构造函数的局部变量作用域为类范围。因此构造函数中定义的局部变量在类内部都可以访问。
而在类外部无法访问他们。 利用此特性可以创建对象的私有数据，实现对象的信息隐藏。

请参考：[var语句](the%20language/statements/assignment#var)


**2、成员保护**

使用下划线作为首字符的类成员是只读成员，只读成员的数据只能读取不能修改。
可以使用只读成员保护对象内部不希望被修改的数据。

另外，使用元表也可以创建只读的成员，例如使用util.metaProperty创建的属性表可以指定_get方法而省略_set方法实现只读成员。
