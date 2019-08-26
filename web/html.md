# 网页基础知识

 参考:

## 什么是 HTML

HTML(HyperText Mark-up Language):超文本标记语言,用于编写网页.
在网页上点右键打开菜单，选"查看源代码"就可以查看网页的HTML源代码。

HTML类似XML语法。使用标记(Tag)来标识网页节点，每一个标记置于尖括号内.并用"/"标明结束标记.

例如;
``` html
<html>
      <head>
            <title>网页标题</title>
      </head>

      <body>
            body之间则为主要语法所在，也是网页的主要呈现部分。
            <br />
            <img src="图片路径" />

            <a href="超链接网址">显示在网页上的超链接文字</a>

            下面是一个简单的登录表单：
            <form action="提交的目标网址" method="post">
                  请输入用户名：<input name="username" type="text" />
                  请输入密　码：<input name="password" type="password" />
            </form>

      </body>

</html>
```

以上看到的就是一个最简单架构的网页源代码(HTML)。
HTML采用类似XML的语法，由很多成对的、可嵌套的标记组成。所
有的标记放在尖括号内，而结束标记需要加一个斜杠。

**例如：**
`<html> 表示html源码开始，而</html>则表示html源码的结束。`

如果一个节点没有结束标记,则应在开始标记结束处的尖括号前添加一个正斜杠,如下:

``` txt
<br />  这表示一个HTML换行,注意在正斜杠前面需要有一个空格.
<img src="图片路径" />
```

一份完整的网页主要包含了二个部分：

``` txt
HTML头: <head>之间的部分</head>
网页内容: <body>之间的部分</body>
```

在HTML头的部分`<head></head>`中，有另一组子标记`<title></title>`。 在`<title></title>`这里面的文字就是网页的标题。

在HTML头的内容部分`<body></body>`中，有另一组子标记: `<form>这中间表示一个表单</form>`，通常在网页上输入并提交内容的部分都是一个表单。

## 什么是 HTML DOM

从上一节我们可以看到HTML就是由一个个内外嵌套的节点来表示文档中的对象，这种架构称为HTML DOM(Document Object Model 文档对象模式).

HTML DOM 是指用于 HTML/XHTML的文档对象模型。DOM定义了节点(Node)的接口以及组成DOM树（称之为文档）元素的Node子接口，节点之间可以包含嵌套。

最顶层的是document对象,是所有对象的根节点. 而HTML元素(element)是由HTML起始标签和结束标签以及内部包含的属性、元素等表示的节点对象。

下面是一个超链接元素的示例:

<a href="http://www.aardio.com/">点这里打开一鹤软件主页</a>

HTML源码如下:

``` html
<a href="http://www.aardio.com/" target="_blank">点这里打开一鹤软件主页</a>
```

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
