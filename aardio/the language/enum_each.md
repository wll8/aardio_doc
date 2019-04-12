# 枚举与迭代

 枚举与迭代都提供遍历集合对象元素的功能。

## 什么是集合对象

集合对象表示被其他对象管理的一组具有类似行为的对象，例如[table对象](the%20language/datatype/datatype#vartable)、所有桌面窗口。

## 枚举

枚举：指调用一个枚举函数、一次性列举出集合中的元素，通常需要指定一个触发器函数作为参数。
枚举函数以enum作为前缀，例如winex.enum枚举函数可以列举所有桌面窗口：

``` aau
io.open();//打开控制台

import winex;

winex.enum(

	function(hwnd,depth){
		..io.print( depth/*深度*/,hwnd/*窗口*/,win.getText(hwnd)/*标题*/ )
		/*return false*/
	}

)
```

所有枚举函数在设计时必须遵守一致的约定：返回false停止枚举，

例如枚举桌面顶层窗口的win.enumTop函数定义：

``` aau
function enumTop( onfind ) {
    // 须是一个字符串
    assert( where===null || type(where) == type.string ,"查询条件必须是字符串")

    var EnumwndProc = function( hwnd,lparam ){

		if( onfind( hwnd ) === false) //注意这里用的恒等式来排除null空值
			return 0; //枚举函数遵守一致的约定：返回false停止
		else
			return 1 ;
    }

    pEnumwndProc = ..raw.tostdcall(EnumwndProc,"int(int hwnd,int lparam )"/* ,{ tag='crane' }  */ );
    EnumWindows(pEnumwndProc ,0); //回调函数声明了_topointer元方法，因此可以自动转换为pointer指针
    pEnumwndProc = null;//确认不会再用到的回调函数，可以显示声明为null进行释放

}
```

请参考：[定义函数](the%20language/function/definitions)

## 迭代

枚举：迭代函数通常用于for...in语句中，创建一个迭代器，用以遍历集合成员。
迭代函数以each作为前缀，例如com.each函数、winex.each函数

``` aau
io.open();//打开控制台

import winex;

for hwnd,title,theadId,processId in winex.each( ) {
	io.print( hwnd,title,theadId,processId )
}
```

请参考：[for...in 语句](the%20language/statements/looping#forin)

## 迭代与枚举的区别

枚举与迭代有类似的语义，但是注意在aardio中他们的区别。
枚举一般指使用回调触发器机制来遍历对象，而迭代一般是使用用for...in语句来循环迭代对象。

枚举是一次性列举出集合中的元素。
迭代函数不是一次性列举出所有元素，他是在一个循环中每次迭代出集合中的一个成员。

枚举可以通过返回值来被动退出遍历过程。
而迭代随时可以用break语句来主动中断遍历过程。在控制上更自由一些。

这就好像演出，枚举是一次性全站台上。
而迭代是一个一个的轮流上台，你随时可以叫停。

迭代是广度遍历，通常在同一深度遍历集合对象。
而枚举是枚举可以通过递归深度遍历集合。

例如：winex.enum可以枚举出所有的桌面窗口，以及窗口的所有子级窗口。
而winex.each只能迭代遍历同级窗口。



## 常用的枚举、迭代函数

待补充......
