# ele节点属性和方法

 参考:[创建web窗体](web/webform) [使用web窗体获取ele对象](web/getele)

## 节点(node)、元素(element)

根据 [HTML DOM(HTML文档对象模型)](web/html)，HTML 文档中的每个组成部分都是一个节点。

* 整个文档( document )是文档根节点
* 每个 HTML 标签是一个元素(element)节点
* 包含在 HTML 元素中的文本是文本节点
* 每一个 HTML 属性是一个属性节点
* 注释属于注释节点


相应的,在aardio中:

* 使用[wb.document](web/getele#document) [wb.getDoc(框架名)](web/getele#getDoc) 可以获取一个HTML文档的document节点.
* 而使用[wb.getEle(元素名字或ID)](web/getele#getEle) 等函数可以获取element元素节点,element对象返回的变量在aardio中约定以缩写ele表示.
* 使用元素节点的 ele.innerText 属性则可以获取文本节点.
而使用ele.innerHTML则可获取包含在元素节点内部的HTML源码.
* 使用ele.getAttribute(属性名字) 则可以获取属性节点,用 ele.setAttribute(属性名字,新的值) 则可以修改属性节点的值, 也可以直接使用 ele.属性名字 = 新的值.

下面是一个超链接的HTML源码:
<pre>&lt;a id=&quot;myid&quot; href=&quot;http://bbs.aardio.com/doc/html/&quot; onclick=&quot;alert(&apos;&#x4F60;&#x70B9;&#x4E86;&#x6211;&apos;)&quot;&gt;
    &#x70B9;&#x8FD9;&#x91CC;&lt;b&gt;&#x83B7;&#x53D6;&#x66F4;&#x591A;HTML&#x6559;&#x7A0B;&lt;/b&gt;
&lt;/a&gt;
    </pre>

上面的HTML源码<a>........</a>就是一个元素节点
使用 ele = wb.getEle("myid") 就可以在web窗体中获取该节点对象.
而使用 ele.href 就可以读写超链接属性.
属性 ele.onclick 是一个事件,on开头的属性一般都表示一个事件,click是鼠标单击的意思,鼠标单击超链接时触发这个事件,事件里写的是javascript脚本,我们使用 ele.fireEvent("onclick") 可以触发这个事件,自动执行里面的脚本.
而使用 str = ele.innerText 我们会获取内部的文本节点,即"点这里获取更多HTML教程"
使用 str = ele.innerHTML 会获取到内部的源代码,即"点这里<b>获取更多HTML教程</b>"

下面是该节点呈现在网页上的效果:

``` aau
点这里获取更多HTML教程
```

aardio支持标准的HTML DOM对象,可以直接使用DOM对象的属性和方法.
而且aardio的语法与Javascript很接近,使用aardio与Javascript也可以很容易的直接交互(参考:[wb.doScript](web/doScript) [wb.external](web/external)) ,所以使用aardio进行web编程有无可比拟的优势,而所有标准的网页教程都可以作为aardio web编程的重要参考资料.我为大家整理了一系列的HTML、以及HTML DOM有关的教程,您可以点下面的链接在线浏览或直接下载(每教程首页顶部有下载CHM电子版的链接) [http://bbs.aardio.com/doc/html](http://bbs.aardio.com/doc/html/ "HTML DOM教程,Javascript教程")

下面我们详细介绍ele对象在web模拟自动化中常用的一些属性和方法,大家要注意并不是所有的属性和方法都会出现在开发环境的自动提示列表中,因为不同的ele节点有不同的属性和方法,而这需要在运行时才能获取,在设计时是无法自动感知的.

## ele.innerHTML

ele.innerHTML
  可以获取一个节点内部的HTML源码,例如:

``` aau
ele = wb.document.all(1)
str = ele.innerHTML
```

## ele.innerText

ele.innerText 可以获取一个节点内部的文本内容(去除HTML源码),例如:

``` aau
ele = wb.document.all(1)
str = ele.innerText
```

## ele.getAttribute

**1、函数原型**

``` aau
value = ele.getAttribute( 属性名字 )
```

**2、函数说明**

返回一个element元素节点指定名字的属性值,也可以直接使用 ele.属性名字 来访问属性值

**3、调用示例**

``` aau
//遍历所有超链接
for(k,ele in wb.eachLinks()){
    io.print( ele.getAttribute("href") )
    io.print( ele.href ) //ele.href的作用与ele.getAttribute("href") 是一样的
}
```

## ele.setAttribute

**1、函数原型**

``` aau
ele.setAttribute( 属性名字,新的值 )
```

**2、函数说明**

修改一个element元素节点指定名字的属性值,也可以直接使用 ele.属性名字 = 新的值 直接修改.

**3、调用示例**

``` aau
//让所有超链接在当前窗口打开
for(k,ele in wb.eachLinks()){
	ele.target ="_self"
}
```


 上面的代码可以禁止链接时新开窗口,通常可以将上面的代码写在 [wb.DownloadComplete](web/event#DownloadComplete) 事件函数中,在每一个网页打开以后自动修改所有的超链接.

## ele.click()

**1、函数原型：**

``` aau
ele.click()
```

**2、函数说明：**

模拟鼠标自动点击节点,该函数并不使用真正的鼠标,而是在后台发送指令控制节点.

## ele.value

**1、函数原型：**

``` aau
value = ele.value
ele.value = value
```


**2、函数说明：**

如果ele是form表单中的控件(例如input节点,按钮或输入框等),那么节点有value属性可以读写控件的数据.

## ele.form.submit

**1、函数原型：**

``` aau
ele.form.submit()
```

**2、函数说明：**

如果ele是form表单中的控件(例如input节点,按钮或输入框等),那么节点有form属性指向表单容器节点.而form节点有submit()方法可以自动提交表单.

**3、调用示例：**

``` aau
ele = wb.getEle("username")
ele.value = "用户名"

ele = wb.getEle("password")
ele.value = "密码"

ele.form.submit()
```

## ele.fireEvent

**1、函数原型：**

``` aau
ele.fireEvent( 脚本事件名 )
```

**2、函数说明：**

如果节点存在事件属性,例如onclick,onchange等属性,这些属性通常在鼠标键盘操作时触发,在HTML源码中你可以在该元素的源码中看到on开头有属性名字,而属性的值通常是一段javascript脚本.

执行[ele.click](web/ele#click) 或 [ele.submit](web/ele#submit) 时并不能触发事件,你需要调用 ele.fireEvent来触发该事件.
事件中的js脚本通常会使用this参数表示该element节点自身,这时候使用 [wb.doScript](web/doScript) 就比较麻烦,而使用 ele.fireEvent 非常方便.

**3、调用示例：**

``` aau
ele=wb.getEle("options") //获取下拉选框节点
ele.selectedIndex=10?
ele.fireEvent("onchange")

ele=wb.getEle("form1") //获取表单节点
ele.target="_self";
ele.fireEvent("onsubmit")
```
