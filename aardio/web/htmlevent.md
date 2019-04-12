# HTML事件触发器

 参考:[创建web窗体](web/webform) [什么是DOM](web/html#dom)

## HTML事件

**1、基本语法：**

``` aau
var doc = wb.getDoc()
var ok = doc.attachEvent("HTML事件名称",IDispatch接口对象 )
```


**2、函数说明：**

请参考: [wb.getDoc()](web/getele#getDoc)
文档对象提从attachEvent方法,可以为指定的事件绑定一个Dispatch接口对象作为事件触发器.
使用[com.ImplInterface](libraries/kernel/com/interface#IDispatch)创建IDispatch接口.

可选的HTML事件名称请参考:[http://bbs.aardio.com/doc/html/dhtml/events.html](http://bbs.aardio.com/doc/html/dhtml/events)

**3、调用示例：**

``` aau
//创建web窗体的代码省略,请在中点击新建web窗体

//打开目标网站
wb.go("http://www.aardio.com/")
//显示窗体
winform.show(true)

io.open()

htmlEvent = com.ImplInterface(
   function(event){
   	  io.print("点击坐标", event.screenX,event.screenY )
   	  io.print("触发节点", event.srcElement.innerText )
   }
)
var doc = wb.waitDoc()//等待并返回document对象
doc.attachEvent("onclick",htmlEvent)

//进入消息循环
win.loopMessage();
```


HTML事件触发时会传递一个event参数,该参考的成员请参考下面的网页:

[http://bbs.aardio.com/doc/html/dhtml/objects/obj_event.html](http://bbs.aardio.com/doc/html/dhtml/objects/obj_event)
