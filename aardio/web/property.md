# web窗体属性

 参考:[创建web窗体](web/webform) [什么是DOM](web/html#dom)

## 简介

属性是web窗体提供的数据成员.

?> 本手册中约定使用 wb变量名表示web.form类创建的web窗体对象.使用ele表示web窗体中的元素对象,这也是aardio中默认约定具有特殊意义的变量名,不应将这些默认变量名用于其他目的.

## wb._browser

wb._browser 是浏览器控件对象,这是一个com对象,可以使用com.DumpTypeInfo例出成员

``` aau
io.open()

com.DumpTypeInfo( wb.document )
```

## wb._object

web窗体使用 com.CreateEmbed函数创建,所有 com.CreateEmbed创建的对象都用_object成员.实际上wb._browser就是从wb._object获取的接口.请参考: [com.CreateEmbed](libraries/kernel/com/embed)

## wb._host

所有 com.CreateEmbed创建的对象都用_host成员,此成员提供一个close方法,在这里就是wb._host.close()用以关闭web窗体.销毁所有com对象.请参考: [com.CreateEmbed](libraries/kernel/com/embed)

## wb._form

该成员指向创建web窗体的winform窗体对象.请参考: [com.CreateEmbed](libraries/kernel/com/embed)

## wb.host

返回当前网页所在的主机域名.

## wb.location

返回当前网址

## wb.application

返回当前web窗体的应用程序接口

## wb.silent

将该成员的值设为真,则打开组件对话框、脚本错误对话框静默模式,禁止显示这些对话框.

在web窗体的构造参数中也可以指定_DLCTL_SILEN _DLCTL_SILEN 开启静默模式.

``` aau
//....省略创建web窗体的代码,请在中点击"主菜单->新建文件->新建web窗体"

//创建web窗体
var wb = web.form( winform
	,
	,0x40000000/*_DLCTL_SILENT*/
	);

wb.silent = true;
```

## wb.noScriptErr

将此属性设为真，则禁止所有脚本错误对话框，并使脚本继续运行。
与wb.silent不同,wb.noScriptErr仅对脚本错误对话框起作用,并且不会阻止脚本执行,如果仅需禁用脚本错误,首选使用 wb.noScriptErr = true 来设置.

如果 wb.silent 为真时,wb.noScriptErr属性将被忽略.

## wb.showhelp

设置是否允许web窗体调用并显示帮助文档.
