# 自动上传文件

 参考:[使用wb.post自动提交](web/control#post)

 构造上传文件的表单数据较复杂,标准库提供了web.uploadData类,自动构造上传文件数据包.

## web.multipartFormData

**1、语法：**

``` aau
import web.multipartFormData;
var form = web.multipartFormData();
form.add("字段名","字段值")
form.add("上传字段名","@上传路径");
```


**2、说明：**

web.multipartFormData是一个类,创建的表单对象可以使用add(字段名,段值)函数添加上传数据，字段名指网页表单中输入控件的名字(该控件html源码中的name属性)，可添加多个字段,如果该字段的值第一个字符是"@"字符则上传该文件。在标准库 web.rest.client中有上传文疾糠州有用到 web.multipartFormData 可以参考一下源码。 

**3、示例：**

``` aau
import web.form;
/*DSG{{*/
var winform = ..win.form( text="自动上传";right=744;bottom=523 )
/*}}*/

var wb = web.form( winform ); //创建web窗体
winform.show();

//构建上传数据包
import web.multipartFormData;
var formData = web.multipartFormData();
formData.add("username","用户名");
formData.add("password","密码");
formData.add("filename","@\main.aardio");

//上传数据
wb.post("http://httpbin.org/post"
	, formData.readAll() //上传数据包
	, formData.contentHeader()  //要添加的HTTP头
	);

//启动消息循环
win.loopMessage();
```
