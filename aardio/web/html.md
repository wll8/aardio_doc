# 网页基础知识

 参考:

## 什么是 HTML

HTML(HyperText Mark-up Language):超文本标记语言,用于编写网页.
在网页上点右键打开菜单，选"查看源代码"就可以查看网页的HTML源代码。

HTML类似XML语法。使用标记(Tag)来标识网页节点，每一个标记置于尖括号内.并用"/"标明结束标记.

例如;
<pre>&lt;html&gt;
      &lt;head&gt;
            &lt;title&gt;&#x7F51;&#x9875;&#x6807;&#x9898;&lt;/title&gt;      &lt;/head&gt;

      &lt;body&gt;
            body&#x4E4B;&#x95F4;&#x5219;&#x4E3A;&#x4E3B;&#x8981;&#x8BED;&#x6CD5;&#x6240;&#x5728;&#xFF0C;&#x4E5F;&#x662F;&#x7F51;&#x9875;&#x7684;&#x4E3B;&#x8981;&#x5448;&#x73B0;&#x90E8;&#x5206;&#x3002;            &lt;br /&gt;
            &lt;img src=&quot;&#x56FE;&#x7247;&#x8DEF;&#x5F84;&quot; /&gt;

            &lt;a href=&quot;&#x8D85;&#x94FE;&#x63A5;&#x7F51;&#x5740;&quot;&gt;&#x663E;&#x793A;&#x5728;&#x7F51;&#x9875;&#x4E0A;&#x7684;&#x8D85;&#x94FE;&#x63A5;&#x6587;&#x5B57;&lt;/a&gt;             &#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x767B;&#x5F55;&#x8868;&#x5355;&#xFF1A;
            &lt;form action=&quot;&#x63D0;&#x4EA4;&#x7684;&#x76EE;&#x6807;&#x7F51;&#x5740;&quot; method=&quot;post&quot;&gt;
                  &#x8BF7;&#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&#xFF1A;&lt;input name=&quot;username&quot; type=&quot;text&quot; /&gt;
                  &#x8BF7;&#x8F93;&#x5165;&#x5BC6;&#x3000;&#x7801;&#xFF1A;&lt;input name=&quot;password&quot; type=&quot;password&quot; /&gt;
            &lt;/form&gt;

      &lt;/body&gt;
&lt;/html&gt;
    </pre>

以上看到的就是一个最简单架构的网页源代码(HTML)。
HTML采用类似XML的语法，由很多成对的、可嵌套的标记组成。所
有的标记放在尖括号内，而结束标记需要加一个斜杠。

**例如：**
<pre>&lt;html&gt; &#x8868;&#x793A;html&#x6E90;&#x7801;&#x5F00;&#x59CB;&#xFF0C;&#x800C;&lt;/html&gt;&#x5219;&#x8868;&#x793A;html&#x6E90;&#x7801;&#x7684;&#x7ED3;&#x675F;&#x3002;</pre>

如果一个节点没有结束标记,则应在开始标记结束处的尖括号前添加一个正斜杠,如下:
<pre>&lt;br /&gt;  &#x8FD9;&#x8868;&#x793A;&#x4E00;&#x4E2A;HTML&#x6362;&#x884C;,&#x6CE8;&#x610F;&#x5728;&#x6B63;&#x659C;&#x6760;&#x524D;&#x9762;&#x9700;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x7A7A;&#x683C;.
&lt;img src=&quot;&#x56FE;&#x7247;&#x8DEF;&#x5F84;&quot; /&gt;</pre>

一份完整的网页主要包含了二个部分：
<pre>HTML&#x5934;: <span>&lt;head&gt;&#x4E4B;&#x95F4;&#x7684;&#x90E8;&#x5206;&lt;/head&gt; </span>
&#x7F51;&#x9875;&#x5185;&#x5BB9;: <span>&lt;body&gt;&#x4E4B;&#x95F4;&#x7684;&#x90E8;&#x5206;&lt;/body&gt;  </span>
</pre>

在HTML头的部分<head></head>中，有另一组子标记<title></title>。 在<title></title>这里面的文字就是网页的标题。

在HTML头的内容部分<body></body>中，有另一组子标记: <form>这中间表示一个表单</form>，通常在网页上输入并提交内容的部分都是一个表单。

## 什么是 HTML DOM

从上一节我们可以看到HTML就是由一个个内外嵌套的节点来表示文档中的对象，这种架构称为HTML DOM(Document Object Model 文档对象模式).

HTML DOM 是指用于 HTML/XHTML的文档对象模型。DOM定义了节点(Node)的接口以及组成DOM树（称之为文档）元素的Node子接口，节点之间可以包含嵌套。

最顶层的是document对象,是所有对象的根节点. 而HTML元素(element)是由HTML起始标签和结束标签以及内部包含的属性、元素等表示的节点对象。

下面是一个超链接元素的示例:

``` aau
点这里打开一鹤软件主页
```

HTML源码如下: <pre>&lt;a href=&quot;http://www.aardio.com/&quot; target=&quot;_blank&quot;&gt;&#x70B9;&#x8FD9;&#x91CC;&#x6253;&#x5F00;&#x4E00;&#x9E64;&#x8F6F;&#x4EF6;&#x4E3B;&#x9875;&lt;/a&gt;</pre>

上面就是一个典型的一个HTML节点,一个节点可以包含以下元素:

* 标记:

超链接的标记是a,起始标记为<a>,结束标记为</a>

* 属性(attribute)

属性就是一个个用空格分格的键值对,语法类似aardio里的[table对象](the%20language/datatype/datatype#vartable) ,不同的是table以分号分隔键值对,而HTML是用空格来分隔属性.

超链接的href属性表示链接打开的目标网址.
而target属性指定打开的窗口名字,"_blank"指在新窗口中打开href指定的链接.

* 内部文本(innerText)

指在节点开始标记与结束标记之间包含的文本,通常是用于显示在网页上的内容..
这里是"点这里打开一鹤软件主页"

* 子节点

一个HTML节点对象可以在内部包含其他的HTML节点对象,可以嵌套包含，例如上一节例子中html包含body子节点,而body子节点又包含form子节点,form子节点又包含input子节点.

* 内部HTML(innerHTML)

表示子节点的源代码,我们称之为内部HTML(innerHTML)




上面简单介绍了与aardio Web窗体设计有关的一些基础知识.
如果需要了解更多关于HTML的知识请参考网页制作的相关资料。
