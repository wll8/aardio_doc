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

``` aau
//....省略创建web窗体的代码,请在中点击"主菜单->新建文件->新建web窗体"

wb.write("<a href='#' onclick='func()'>执行wb.doScript创建的函数</a>")

js = /*

	function func(){
		alert('我是js,我的语法与aardio很相似,都是C系语法哦')
	}
	func();

*/

wb.doScript( js )
```
