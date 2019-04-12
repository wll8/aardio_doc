# 选项控件

 参考:[创建web窗体](web/webform) [什么是DOM](web/html#dom) [ele节点属性和方法](web/ele) [使用web窗体获取ele对象](web/getele)

## 复选框

一个复选框如下: 

``` aau
这是复选框
```

HTML源码如下:
<pre>&lt;input type=&quot;checkbox&quot; name=&quot;checkbox&quot; id=&quot;checkbox&quot; /&gt;</pre>

控制复选框是否选中.

``` aau
//复选框
ele = wb.getEle("checkbox")
ele.checked = true;
```

## 单选框

一个单选框如下: 

``` aau
这是单选框 这是单选框2
```

HTML源码如下:
<pre>&lt;input type=&quot;radio&quot; name=&quot;radio&quot; id=&quot;radio1&quot; /&gt;
&lt;input type=&quot;radio&quot; name=&quot;radio&quot; id=&quot;radio2&quot; /&gt;</pre>

单选框通常有多个,并且名字相同,而ID不同,使用 [wb.getEles](web/getele#getEles) 函数可以返回所有同名单选控件的com对象数组.
改变选定状态与复选框类似,即改变checked属性.

``` aau
//单选框
ele = wb.getEles("radio")
ele(0).checked = true;
```

## 下拉选框

一个单选框如下: 

``` aau
选项
  选项2
```

HTML源码如下:
<pre>&lt;select name=&quot;select&quot; id=&quot;select&quot; onchange=&quot;alert(&apos;&#x6211;&#x88AB;&#x6539;&#x53D8;&#x4E86;&apos;)&quot;&gt;
  &lt;option value=&quot;&#x503C;&quot;&gt;&#x9009;&#x9879;&lt;/option&gt;
  &lt;option value=&quot;&#x503C;2&quot;&gt;&#x9009;&#x9879;2&lt;/option&gt;
&lt;/select&gt;</pre>

下拉选框有一个父节点select,然后有一系列的option选项节点.
web.form库提供wb.select函数以改变选项.



**1、函数原型：**

``` aau
ele =  wb.select("选项控件名", 查找参数,框架名)
```

**2、函数说明：**

框架名字是一个可选参数.
控件名字为select控件的name属性.

而查找参数可以指定选项数组的索引,选项数组是com对象,第一个元素的索引为0
如果查找参数是一个字符串,则该函数遍历所有选项,查找选项值或选项文本等于该参数的选项.
找到选项以后,将该选项置为选中状态,如果select控件指定了onchange事件,则自动触发该事件.
最后返回该节点对象.


## 完整示例

下面是一个完整示例,演示了控制选项控件的方法.

<pre>import win.ui;
/*DSG{{*/
var winform = win.form(min=1;scroll=1;bottom=249;max=1;text=&quot;aardio Form&quot;;right=349 )
winform.add(  )
/*}}*/

import web.form;

//&#x521B;&#x5EFA;web&#x7A97;&#x4F53;
var wb = web.form( winform
	,//&#x53EF;&#x8F93;&#x5165;_UIFLAG_ &#x524D;&#x7F00;&#x7684;&#x5E38;&#x91CF;&#x81EA;&#x5B9A;&#x4E49;&#x5916;&#x89C2;
	,//&#x53EF;&#x8F93;&#x5165;_DLCTL_ &#x524D;&#x7F00;&#x7684;&#x5E38;&#x91CF;&#x4EE5;&#x63A7;&#x5236;&#x4E0B;&#x8F7D;&#x884C;&#x4E3A;
	);

html = /*
&lt;input type=&quot;radio&quot; name=&quot;radio&quot; id=&quot;radio&quot; value=&quot;radio&quot; /&gt;
&lt;input type=&quot;radio&quot; name=&quot;radio&quot; id=&quot;radio2&quot; value=&quot;radio2&quot; /&gt;
&lt;input type=&quot;checkbox&quot; name=&quot;checkbox&quot; id=&quot;checkbox&quot; /&gt;
&lt;select name=&quot;select&quot; id=&quot;select&quot; onchange=&quot;alert(&apos;&#x6211;&#x88AB;&#x6539;&#x53D8;&#x4E86;&apos;)&quot;&gt;
  &lt;option value=&quot;&#x503C;&quot;&gt;&#x9009;&#x9879;&lt;/option&gt;
  &lt;option value=&quot;&#x503C;2&quot;&gt;&#x9009;&#x9879;2&lt;/option&gt;
&lt;/select&gt;
 */

wb.write(html)
winform.show()

//&#x5355;&#x9009;&#x6846;
ele = wb.getEles(&quot;radio&quot;)
ele(0).checked = true;

//&#x590D;&#x9009;&#x6846;
ele = wb.getEle(&quot;checkbox&quot;)
ele.checked = true;

//&#x4E0B;&#x62C9;&#x9009;&#x6846;
wb.select(&quot;select&quot;,&quot;&#x503C;2&quot;); //&#x53C2;&#x6570;&#x4E8C;&#x53EF;&#x4EE5;&#x662F;&#x7D22;&#x5F15;,&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x9009;&#x9879;&#x7684;&#x503C;,&#x6216;&#x8005;&#x9009;&#x9879;&#x7684;&#x663E;&#x793A;&#x6587;&#x672C;

//&#x4E0B;&#x62C9;&#x9009;&#x6846;
ele = wb.select(&quot;select&quot;,1) //&#x6B64;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x9009;&#x9879;&#x8282;&#x70B9;&#x5BF9;&#x8C61;

//&#x8FDB;&#x5165;&#x6D88;&#x606F;&#x5FAA;&#x73AF;
win.loopMessage();
return wb,winform;
</pre>
