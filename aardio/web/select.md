# 选项控件

 参考:[创建web窗体](web/webform) [什么是DOM](web/html#dom) [ele节点属性和方法](web/ele) [使用web窗体获取ele对象](web/getele)

## 复选框

一个复选框如下:

?> <input type="checkbox" name="checkbox" id="checkbox" /> 这是复选框


HTML源码如下:
``` html
<input type="checkbox" name="checkbox" id="checkbox" />
```

控制复选框是否选中.

``` aau
//复选框
ele = wb.getEle("checkbox")
ele.checked = true;
```

## 单选框

一个单选框如下:

?> <input type="radio" name="radio" id="radio1" /> 这是单选框 <input type="radio" name="radio" id="radio2" /> 这是单选框2

HTML源码如下:
``` html
<input type="radio" name="radio" id="radio1" />
<input type="radio" name="radio" id="radio2" />
```

单选框通常有多个,并且名字相同,而ID不同,使用 [wb.getEles](web/getele#getEles) 函数可以返回所有同名单选控件的com对象数组.
改变选定状态与复选框类似,即改变checked属性.

``` aau
//单选框
ele = wb.getEles("radio")
ele(0).checked = true;
```

## 下拉选框

一个单选框如下:

?> <select name="select" id="select" onchange="alert('我被改变了')">
?>   <option value="值">选项</option>
?>   <option value="值2">选项2</option>
?> </select>

HTML源码如下:

``` html
<select name="select" id="select" onchange="alert('我被改变了')">
  <option value="值">选项</option>
  <option value="值2">选项2</option>
</select>
```

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

``` aau
import win.ui;
/*DSG{{*/
var winform = win.form(min=1;scroll=1;bottom=249;max=1;text="aardio Form";right=349 )
winform.add(  )
/*}}*/

import web.form;

//创建web窗体
var wb = web.form( winform
	,//可输入_UIFLAG_ 前缀的常量自定义外观
	,//可输入_DLCTL_ 前缀的常量以控制下载行为
	);


html = /*
<input type="radio" name="radio" id="radio" value="radio" />
<input type="radio" name="radio" id="radio2" value="radio2" />
<input type="checkbox" name="checkbox" id="checkbox" />
<select name="select" id="select" onchange="alert('我被改变了')">
  <option value="值">选项</option>
  <option value="值2">选项2</option>
</select>
 */

wb.write(html)
winform.show()

//单选框
ele = wb.getEles("radio")
ele(0).checked = true;

//复选框
ele = wb.getEle("checkbox")
ele.checked = true;

//下拉选框
wb.select("select","值2"); //参数二可以是索引,也可以是选项的值,或者选项的显示文本

//下拉选框
ele = wb.select("select",1) //此函数返回选项节点对象


//进入消息循环
win.loopMessage();
return wb,winform;
```
