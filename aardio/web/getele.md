# 获取DOM节点对象

 参考:[创建web窗体](web/webform) [什么是DOM](web/html#dom) [ele节点属性和方法](web/ele)

## DOM简介

网页上是一个个的HTML节点表示的DOM节点对象,节点象一颗树,所有节点的根是 wb.document对象,一个节点可以包含另外的一个或多个节点,在web窗体中,我们通过获取节点对象就可以读写网页上任意节点的数据、并控制这些节点的行为，从而实现自动化的目的。

?> 本手册中约定使用 wb变量名表示web.form类创建的web窗体对象.使用ele表示web窗体中的元素对象,这也是aardio中默认约定具有特殊意义的变量名,不应将这些默认变量名用于其他目的。

在获取节点对象以前,我们必须调用[wb.go](web/control#go)打开网页,并调用[wb.wait](web/wait#wait)等待网页下载完毕并完全打开。

## wb.document

wb.document是网页上所有节点对象的根节点,这是一个com对象,可以使用com.DumpTypeInfo函数列出该对象的成员,请参考HTML DOM文档以了解document的成员.
  .

``` aau
io.open()

com.DumpTypeInfo( wb.document )
```

## wb.getDoc

**1、函数原型：**

``` aau
doc = wb.getDoc( 框架名 )
```


**2、函数说明：**

获取指定框架窗口的document对象,框架名可省略.
如果无参数,该函数返回 wb.document

如果页面未成功创建文档对象,该函数返回null,调用该函数以前必须调用 [wb.wait()](web/wait#wait) 等待网页下载完毕.
而使用 [wb.waitDoc()](web/wait#waitDoc) 则实现等待该节点下载并返回该节点的功能,而无须等待整个网页下载完.

## wb.body

wb.body是网页上所有可见元素的根节点,这是一个element对象,可以使用com.DumpTypeInfo函数列出该对象的成员

``` aau
io.open()

com.DumpTypeInfo( wb.body )
```

## wb.getEle

**1、函数原型：**

``` aau
ele = wb.getEle( HTML节点的ID名name, 框架名 )
```


**2、函数说明：**

该函数查找并返回页面上的element节点对象,
该对象同样是一个com对象,可以使用com.DumpTypeInfo函数列出该对象的成员.

可以通过第二个参数指定框架窗口,该参数可以省略.

调用wb.getEle之前必须调用 [wb.wait()](web/wait#wait) 等待网页下载完毕.
而使用 [wb.waitEle()](web/wait#waitEle) 则实现等待该节点下载并返回该节点的功能,而无须等待整个网页下载完.

## wb.fromPoint

**1、函数原型：**

``` aau
ele = wb.fromPoint( x坐标,y坐标, 框架名 )
```


**2、函数说明：**

自指定的窗口坐标获取节点,

可以通过第三个参数指定框架窗口,该参数可以省略.

## wb.getEles

**1、函数原型：**

``` aau
tele = wb.getEles( HTML节点的name属性, 框架名 )
```


**2、函数说明：**

该函数返回网页上所有name属性相同的同名节点.返回值为一个com数组.注意com数组使用()括号读取成员而不是使用索引操作符[]

可以通过第二个参数指定框架窗口,该参数可以省略.

**3、调用示例：**

``` aau
//....省略创建web窗体的代码,请在中点击"主菜单->新建文件->新建web窗体"

tele = wb.getEles( HTML节点的name属性, 框架名 )
tele(1).setAttribute("属性名字", "修改第一个节点属性值")
```

## wb.eachAll

**1、函数原型：**

``` aau
for(k,ele in wb.eachAll( HTML标记,框加名) ){

}
```


**2、函数说明：**

wb.eachAll创建一个用于for...in语句的迭代器,用以遍历页面上指定的节点.
参数一指定[HTML标记](web/html)可以通过第二个参数指定框架窗口,该参数可以省略.

**3、调用示例：**

``` aau
//....省略创建web窗体的代码,请在中点击"主菜单->新建文件->新建web窗体"

io.open()
for(k,ele in wb.eachAll( "a" ) ){

	io.print( ele.innerHTML ) //输出页面上所有的超链接包含的HTML
}
```

## wb.eachLinks

**1、函数原型：**

``` aau
for(k,ele in wb.eachLinks( 框架名) ){

}
```


**2、函数说明：**

此函数类似wb.eachAll,无需指定HTML标记,默认列出页面上所有的超链接.

**3、调用示例：**

``` aau
//....省略创建web窗体的代码,请在中点击"主菜单->新建文件->新建web窗体"

io.open()
for(k,ele in wb.eachLinks() ){

	io.print( ele.innerHTML ) //输出页面上所有的超链接包含的HTML
}
```
