# 执行网页脚本

 参考:[创建web窗体](web/webform) [在网页脚本中调用aardio函数](web/external)

## wb.doScript

**1、函数原型：**

``` aau
wb.doScript( 要执行的脚本代码,框架名字="",脚本语言名称="javascript" )
```

**2、函数说明：**

执行网页脚本,第二个参数、第三个参数都是可选参数。

**3、调用示例：**

<pre>
<span>//....&#x7701;&#x7565;&#x521B;&#x5EFA;web&#x7A97;&#x4F53;&#x7684;&#x4EE3;&#x7801;,&#x8BF7;&#x5728;&#x4E2D;&#x70B9;&#x51FB;&quot;&#x4E3B;&#x83DC;&#x5355;-&gt;&#x65B0;&#x5EFA;&#x6587;&#x4EF6;-&gt;&#x65B0;&#x5EFA;web&#x7A97;&#x4F53;&quot;</span>

wb.write(&quot;&lt;a href=&apos;#&apos; onclick=&apos;func()&apos;&gt;&#x6267;&#x884C;wb.doScript&#x521B;&#x5EFA;&#x7684;&#x51FD;&#x6570;&lt;/a&gt;&quot;)

js = <span>/*

	function func(){
		alert(&apos;&#x6211;&#x662F;js,&#x6211;&#x7684;&#x8BED;&#x6CD5;&#x4E0E;aardio&#x5F88;&#x76F8;&#x4F3C;,&#x90FD;&#x662F;C&#x7CFB;&#x8BED;&#x6CD5;&#x54E6;&apos;)
	}
	func();

*/</span>

wb.doScript( js )</pre>
