# 在网页中调用aardio代码

 参考:[创建web窗体](web/webform) [在aardio中执行网页脚本](web/doScript)

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
<pre><span>//....&#x7701;&#x7565;&#x521B;&#x5EFA;web&#x7A97;&#x4F53;&#x7684;&#x4EE3;&#x7801;,&#x8BF7;&#x5728;&#x4E2D;&#x70B9;&#x51FB;&quot;&#x4E3B;&#x83DC;&#x5355;-&gt;&#x65B0;&#x5EFA;&#x6587;&#x4EF6;-&gt;&#x65B0;&#x5EFA;web&#x7A97;&#x4F53;&quot;</span>

<span>//&#x53EA;&#x8981;&#x662F;web&#x7A97;&#x4F53;external&#x5185;&#x7684;&#x6210;&#x5458;&#xFF0C;&#x90FD;&#x53EF;&#x4EE5;&#x4ECE;&#x7F51;&#x9875;&#x4E0A;&#x8C03;&#x7528;</span>
wb.<strong>external</strong> = {
    <strong>showmsg</strong> = function (txt){
        win.msgbox(txt, &quot;aardio&quot;);
        return true;
    }
}

<span>//&#x5728;&#x7F51;&#x9875;&#x7684;javascript&#x91CC;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8C03;&#x7528;external&#x6210;&#x5458;</span>
wb.write( &quot;
&lt;button onclick=&apos;<span>external.showmsg</span>(123)&apos; &gt;&#x6211;&#x662F;&#x7F51;&#x9875;&#x4E0A;&#x7684;&#x6309;&#x94AE;&lt;/button&gt;
&quot; )</pre>
external使用的是IDispatch接口,请参考:
[创建IDispatch接口](libraries/kernel/com/interface#IDispatch)
