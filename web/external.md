# 在网页中调用aardio代码

 参考:[创建web窗体](web/webform) [在aardio中执行网页脚本](web/doscript)

## wb.external

**1、接口语法：**

``` aau
wb.external = {
	成员名字 = 值
}
```

**2、函数说明：**

定义wb.external为一个table对象,然后我们可以在网页脚本中直接访问external对象.
aardio要求你显示的指定external以及external的成员,是需要你基于本机安全去考虑哪些方法应当公开给网页访问.

**3、调用示例：**

``` aau
//....省略创建web窗体的代码,请在中点击"主菜单->新建文件->新建web窗体"

//创建external接口
wb.external = {
    //可以通过javascript脚本访问external接口的所有成员
	 aardio_func = function( arg ){
		 win.msgbox("我被网页上的脚本调用了" + arg + "
aardio的语法与Javascript很接近哦" )
	 }
}

//在网页上执行javascript脚本
wb.doScript("javascript:external.aardio_func(123);")
```

**4、调用示例：**
``` aau
//....省略创建web窗体的代码,请在中点击"主菜单->新建文件->新建web窗体"

//只要是web窗体external内的成员，都可以从网页上调用
wb.external = {
    showmsg = function (txt){
        win.msgbox(txt, "aardio");
        return true;
    }
}


//在网页的javascript里可以直接调用external成员
wb.write( "
<button onclick='external.showmsg(123)' >我是网页上的按钮</button>
" )
```

external使用的是IDispatch接口,请参考:[创建IDispatch接口](libraries/kernel/com/interface#IDispatch)
