# 执行命令

 执行命令以前必须调用 [wb.wait()](web/wait#wait) 等待网页打开.

## wb.exec

**1、函数原型：**

``` aau
wb.exec( "命令",参数,是否显示UI )
```


**2、函数说明：**

在网页上执行命令,除第一个参数必须以外,其他参数可选.可选命令如下:

2D-Position 允许通过拖曳移动绝对定位的对象。 
AbsolutePosition 设定元素的 position 属性为"absolute"(绝对)。 
BackColor 设置或获取当前选中区的背景颜色。 
BlockDirLTR 目前尚未支持。 
BlockDirRTL 目前尚未支持。 
Bold 切换当前选中区的粗体显示与否。 
BrowseMode 目前尚未支持。 
Copy 将当前选中区复制到剪贴板。 
CreateBookmark 创建一个书签锚或获取当前选中区或插入点的书签锚的名称。 
CreateLink 在当前选中区上插入超级链接，或显示一个对话框允许用户指定要为当前选中区插入的超级链接的 URL。 
Cut 将当前选中区复制到剪贴板并删除之。 
Delete 删除当前选中区。 
DirLTR 目前尚未支持。 
DirRTL 目前尚未支持。 
EditMode 目前尚未支持。 
FontName 设置或获取当前选中区的字体。 
FontSize 设置或获取当前选中区的字体大小。 
ForeColor 设置或获取当前选中区的前景(文本)颜色。 
FormatBlock 设置当前块格式化标签。 
Indent 增加选中文本的缩进。 
InlineDirLTR 目前尚未支持。 
InlineDirRTL 目前尚未支持。 
InsertButton 用按钮控件覆盖当前选中区。 
InsertFieldset 用方框覆盖当前选中区。 
InsertHorizontalRule 用水平线覆盖当前选中区。 
InsertIFrame 用内嵌框架覆盖当前选中区。 
InsertImage 用图像覆盖当前选中区。 
InsertInputButton 用按钮控件覆盖当前选中区。 
InsertInputCheckbox 用复选框控件覆盖当前选中区。 
InsertInputFileUpload 用文件上载控件覆盖当前选中区。 
InsertInputHidden 插入隐藏控件覆盖当前选中区。 
InsertInputImage 用图像控件覆盖当前选中区。 
InsertInputPassword 用密码控件覆盖当前选中区。 
InsertInputRadio 用单选钮控件覆盖当前选中区。 
InsertInputReset 用重置控件覆盖当前选中区。 
InsertInputSubmit 用提交控件覆盖当前选中区。 
InsertInputText 用文本控件覆盖当前选中区。 
InsertMarquee 用空字幕覆盖当前选中区。 
InsertOrderedList 切换当前选中区是编号列表还是常规格式化块。 
InsertParagraph 用换行覆盖当前选中区。 
InsertSelectDropdown 用下拉框控件覆盖当前选中区。 
InsertSelectListbox 用列表框控件覆盖当前选中区。 
InsertTextArea 用多行文本输入控件覆盖当前选中区。 
InsertUnorderedList 切换当前选中区是项目符号列表还是常规格式化块。 
Italic 切换当前选中区斜体显示与否。 
JustifyCenter 将当前选中区在所在格式化块置中。 
JustifyFull 目前尚未支持。 
JustifyLeft 将当前选中区所在格式化块左对齐。 
JustifyNone 目前尚未支持。 
JustifyRight 将当前选中区所在格式化块右对齐。 
LiveResize 迫使 MSHTML 编辑器在缩放或移动过程中持续更新元素外观，而不是只在移动或缩放完成后更新。 
MultipleSelection 允许当用户按住 Shift 或 Ctrl 键时一次选中多于一个站点可选元素。 
Open 目前尚未支持。 
Outdent 减少选中区所在格式化块的缩进。 
OverWrite 切换文本状态的插入和覆盖。 
Paste 用剪贴板内容覆盖当前选中区。 
PlayImage 目前尚未支持。 
Print 打开打印对话框以便用户可以打印当前页。 
Redo 目前尚未支持。 
Refresh 刷新当前文档。 
RemoveFormat 从当前选中区中删除格式化标签。 
RemoveParaFormat 目前尚未支持。 
SaveAs 将当前 Web 页面保存为文件。 
SelectAll 选中整个文档。 
SizeToControl 目前尚未支持。 
SizeToControlHeight 目前尚未支持。 
SizeToControlWidth 目前尚未支持。 
Stop 目前尚未支持。 
StopImage 目前尚未支持。 
StrikeThrough 目前尚未支持。 
Subscript 目前尚未支持。 
Superscript 目前尚未支持。 
UnBookmark 从当前选中区中删除全部书签。 
Underline 切换当前选中区的下划线显示与否。 
Undo 目前尚未支持。 
Unlink 从当前选中区中删除全部超级链接。 
Unselect 清除当前选中区的选中状态。

**3、调用示例：**

``` aau
//用于取消选中的阴影部分
wb.exec('Unselect');

//选中页面上的所有元素
wb.exec('SelectAll');

//复制
wb.exec('Copy');

//删除选中的区块
wb.exec('Delete');

//剪下选中的区块
wb.exec('Cut');

//打印整个页面
wb.exec('print');

//第二个参数为欲保存的文件名
wb.exec('SaveAs','my.html');

//将选中的区块设为指定的背景色
wb.exec('BackColor','#FFbbDD');

//指定前景色
wb.exec('ForeColor','#BBDDCC');

//指定字体大小
wb.exec('FontSize',7);

//字体必须是系统支持的字体
wb.exec('FontName','标楷体');

//字体变粗
wb.exec('Bold');

//变斜体
wb.exec('Italic');

//将选中的文字加下划线
wb.exec('Underline');

//在选中的文字上划粗线
wb.exec('StrikeThrough');

//将选中的部分文字变细
wb.exec('SuperScript');

//将选中区块的下划线取消掉
wb.exec('Underline');

//有序列排列
wb.exec('InsertOrderedList');

//实心无序列排列
wb.exec('InsertUnorderedList');

//空心无序列排列
wb.exec('Indent');

//插入超链接，弹出一个对话框输入URL
wb.exec('CreateLink','true',true);

//直接插入超链接
wb.exec('CreateLink',http://www.aardio.com');

//重设为button
wb.exec('InsertButton',"ID");

//重设为一个fieldset
wb.exec('InsertFieldSet',"ID");

//插入一个水平线
wb.exec('InsertHorizontalRule',"ID");

//插入一个iframe
wb.exec('InsertIFrame',"ID");

//插入一个image,参数三为true需要图片，为false不需要图片
wb.exec('InsertImage',"ID",true); 

//插入一个checkbox
wb.exec('InsertInputCheckbox',"ID");

//插入一个file类型的object
wb.exec('InsertInputFileUpload',"ID");

//插入一个hidden
wb.exec('InsertInputHidden',"ID");

//插入一个InputImage
wb.exec('InsertInputImage',"ID");

//插入一个Password
wb.exec('InsertInputPassword',"ID");

//插入一个Radio
wb.exec('InsertInputRadio',"ID");

//插入一个Reset
wb.exec('InsertInputReset',"ID");

//插入一个Submit
wb.exec('InsertInputSubmit',"ID");

//插入一个inputtext
wb.exec('InsertInputText',"ID");

//插入一个textarea
wb.exec('InsertTextArea',"ID");

//插入一个selectlistbox
wb.exec('InsertSelectListbox',"ID");

//插入一个singleselect
wb.exec('InsertSelectDropdown',"ID");

//插入一个换行
wb.exec('InsertParagraph');

//插入一个marquee
wb.exec('InsertMarquee',"ID");
```

## wb.execEle

**1、函数原型：**

``` aau
wb.execEle( ele,"命令",参数,是否显示UI )
```


**2、函数说明：**

该函数用法与wb.exec完全相同.唯一的区别是需要在第一个参数中指定节点(HTML DOM Element)对象.而且函数对指定的节点执行命令,而不是针对整个网页执行命象.

请参考: [使用 wb.getEle("id") 获取节点](web/getele)

## wb.execWb

**1、函数原型：**

``` aau
返回值 = wb.execWb( 命令ID,参数=null,?选项=1 )
```

**2、函数说明：**

第一个参数命令ID是一个数值,可选值如下:
_OLECMDID_OPEN = 1;
_OLECMDID_NEW = 2;
_OLECMDID_SAVE = 3;
_OLECMDID_SAVEAS = 4;
_OLECMDID_SAVECOPYAS = 5;
_OLECMDID_PRINT = 6;
_OLECMDID_PRINTPREVIEW = 7;
_OLECMDID_PAGESETUP = 8;
_OLECMDID_SPELL = 9;
_OLECMDID_PROPERTIES = 10;
_OLECMDID_CUT = 11;
_OLECMDID_COPY = 12;
_OLECMDID_PASTE = 13;
_OLECMDID_PASTESPECIAL = 14;
_OLECMDID_UNDO = 15;
_OLECMDID_REDO = 16;
_OLECMDID_SELECTALL = 17;
_OLECMDID_CLEARSELECTION = 18;
_OLECMDID_ZOOM = 19;
_OLECMDID_GETZOOMRANGE = 20
_OLECMDID_UPDATECOMMANDS = 21
_OLECMDID_REFRESH = 22
_OLECMDID_STOP = 23
_OLECMDID_HIDETOOLBARS = 24
_OLECMDID_SETPROGRESSMAX = 25
_OLECMDID_SETPROGRESSPOS = 26
_OLECMDID_SETPROGRESSTEXT = 27
_OLECMDID_SETTITLE = 28
_OLECMDID_SETDOWNLOADSTATE = 29
_OLECMDID_STOPDOWNLOAD = 30

第二个参数是该命令需要的参数,这是一个可选参数,一般不需要指定.

第三个参数可选项如下:
_OLECMDEXECOPT_DODEFAULT = 0;
_OLECMDEXECOPT_PROMPTUSER = 1;
_OLECMDEXECOPT_DONTPROMPTUSER = 2;
_OLECMDEXECOPT_SHOWHELP = 3
这是一个可选参数,默认参数为1

该函数一般无返回值.

**3、调用示例：**

<pre>wb.execWb(1,1)   //&#x6253;&#x5F00;
wb.execWb(4,1)   //&#x53E6;&#x5B58;&#x4E3A;
wb.execWb(10,1)   //&#x5C5E;&#x6027;
wb.execWb(6,1)   //&#x6253;&#x5370;
wb.execWb(6,6)   //&#x6253;&#x5370;&gt;&#x4E0D;&#x4F1A;&#x5F39;&#x51FA;&#x6253;&#x5370;&#x673A;&#x7A97;&#x53E3;&lt;/td&gt;&lt;/tr&gt;
wb.execWb(7,1)   //&#x6253;&#x5370;&#x9884;&#x89C8;
wb.execWb(8,1)   //&#x9875;&#x9762;&#x8BBE;&#x7F6E;
wb.execWb(10,1)   //&#x67E5;&#x770B;&#x9875;&#x9762;&#x5C5E;&#x6027;
wb.execWb(15,1)   //&#x64A4;&#x9500;
wb.execWb(17,1)   //&#x5168;&#x9009;
wb.execWb(22,1)   //&#x5237;&#x65B0;
wb.execWb(45,1)   //&#x5173;&#x95ED;&#x7A97;&#x4F53;&#x65E0;&#x63D0;&#x793A;&gt;&lt;/td&gt;&lt;/</pre>
