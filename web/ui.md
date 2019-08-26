# 用web窗体设计程序界面

 参考:[创建web窗体](web/webform) [在网页脚本中调用aardio函数](web/external)

## web UI

使用 [wb.external](web/external) 可以在网页中轻松执行本机代码,这使在aardio中用网页制作程序界面、以替代传统的windows窗体非常的容易,网页有丰富的界面展现能力,使用网页制作工具可以轻松制作出非常漂亮的界面,这在传统UI设计中是非常困难的事.

下面是一个简单示例.

``` aau
import web.form;

/*DSG{{*/

var winform = ..win.form(text="webkit浏览器支持库";right=544;bottom=362;border="none")

 winform.add()

/*}}*/



//创建web窗体

var wb = web.form( winform ,0x8/*_UIFLAG_SCROLL_NO*/ | 0x4/*_UIFLAG_NO3DBORDER*/ );



wb.external = {

     hitmin = function(){

         return winform.hitmin();

     }

     hitmax = function(){

         return winform.hitmax()

     }

     hitCaption = function(){

         return winform.hitCaption()

     }

     close = function(){

         return winform.close()

     }

};



wb.html =/******

<!doctype html>

 <html>

 <meta charset="utf-8">

 <style>

 html,body{

     margin:0;

     background:#fff;

     height:100%;

 }



 *{

     -webkit-user-select: none;

 }



 /*标题栏*/

 #header{

     position:absolute;

     top:0px;

     left:0px;

     height:28px;

     width:100%;

     background:rgb(52,152,220);

     cursor:default;

 }



 /*中间内容栏*/

 #container{

     box-sizing:border-box;/*使高度包含padding*/

     height:100%;

     width:100%;

     padding-top:28px;

     padding-bottom:35px;

     margin:0 auto;

     overflow:auto;

 }



 /*底栏*/

 #footer {

     height:35px;

     width:100%;

     position: absolute;

     bottom:0;

     left:0;

     z-index:100;

     background:rgb(239,237,238);

     text-align:right;

     padding:3px 5px;

     box-sizing:border-box;

 }



 /*中间内容栏 左侧列*/

 #container .lside{

     height:100%;

     width:150px;

     float:left;

     background:rgb(110,179,210);

 }



 /*中间内容栏 右侧列*/

 #container .rside{

     height:100%;

     margin-left:150px;

     background:#FFF;

 }



 #footer button{

     padding:4px 13px;

     font-size:12px;

     background:rgb(27,174,93);

     color:white;

     border:0;

 }



 #footer button:hover {

     background:rgb(33,127,188);

     box-shadow: 0 0 5px rgba(81, 203, 238, 1);

     cursor:pointer;

 }



 #footer button:active {

     background:rgb(20,110,170);

     cursor:pointer;

 }



 #header .title-bar{

     margin-right:75px;

     padding-left:10px;

     height:28px;

     line-height: 28px;

     font-size:9pt;

     color:#eee;

 }



 #header .ctrls{

     width:75px;

     height:28px;

     float:right;

 }



 #header .ctrls a{

     display:block;

     float:left;

     height:14px;

     font-family:"Marlett";

     font-size:14px;

     padding:4px;

     color:#fff;

     cursor:default;

 }



 #header .ctrls a[id]:hover{

     background:#6ebccf;

 }



 #header .ctrls a[id]:active{

     background:#FF0000;

 }



 </style>

 <body>

     <div id="header">

         <div class="ctrls">

             <a id="window-min" onclick="external.hitmin()">0</a>

             <a id="window-max" onclick="this.innerText = external.hitmax()?'2':'1';">1</a>

             <a id="window-close" onclick="external.close()">r</a>

         </div>

         <div class="title-bar" onmousedown="external.hitCaption()"> <span class=title> 我 的 软 件 </span></div>

     </div>



     <div id="container">

     <div class="lside"> </div>

     <div class="rside"> </div>

     </div>



     <div id="footer">

         <button onclick="alert('hello')">点击这里</button>

     </div>

 </body>




import web.form;

/*DSG{{*/

var winform = ..win.form(text="webkit浏览器支持库";right=544;bottom=362;border="none")

 winform.add()

/*}}*/



//创建web窗体

var wb = web.form( winform ,0x8/*_UIFLAG_SCROLL_NO*/ | 0x4/*_UIFLAG_NO3DBORDER*/ );



wb.external = {

     hitmin = function(){

         return winform.hitmin();

     }

     hitmax = function(){

         return winform.hitmax()

     }

     hitCaption = function(){

         return winform.hitCaption()

     }

     close = function(){

         return winform.close()

     }

};



wb.html =/******

<!doctype html>

 <html>

 <meta charset="utf-8">

 <style>

 html,body{

     margin:0;

     background:#fff;

     height:100%;

 }



 *{

     -webkit-user-select: none;

 }



 /*标题栏*/

 #header{

     position:absolute;

     top:0px;

     left:0px;

     height:28px;

     width:100%;

     background:rgb(52,152,220);

     cursor:default;

 }



 /*中间内容栏*/

 #container{

     box-sizing:border-box;/*使高度包含padding*/

     height:100%;

     width:100%;

     padding-top:28px;

     padding-bottom:35px;

     margin:0 auto;

     overflow:auto;

 }



 /*底栏*/

 #footer {

     height:35px;

     width:100%;

     position: absolute;

     bottom:0;

     left:0;

     z-index:100;

     background:rgb(239,237,238);

     text-align:right;

     padding:3px 5px;

     box-sizing:border-box;

 }



 /*中间内容栏 左侧列*/

 #container .lside{

     height:100%;

     width:150px;

     float:left;

     background:rgb(110,179,210);

 }



 /*中间内容栏 右侧列*/

 #container .rside{

     height:100%;

     margin-left:150px;

     background:#FFF;

 }



 #footer button{

     padding:4px 13px;

     font-size:12px;

     background:rgb(27,174,93);

     color:white;

     border:0;

 }



 #footer button:hover {

     background:rgb(33,127,188);

     box-shadow: 0 0 5px rgba(81, 203, 238, 1);

     cursor:pointer;

 }



 #footer button:active {

     background:rgb(20,110,170);

     cursor:pointer;

 }



 #header .title-bar{

     margin-right:75px;

     padding-left:10px;

     height:28px;

     line-height: 28px;

     font-size:9pt;

     color:#eee;

 }



 #header .ctrls{

     width:75px;

     height:28px;

     float:right;

 }



 #header .ctrls a{

     display:block;

     float:left;

     height:14px;

     font-family:"Marlett";

     font-size:14px;

     padding:4px;

     color:#fff;

     cursor:default;

 }



 #header .ctrls a[id]:hover{

     background:#6ebccf;

 }



 #header .ctrls a[id]:active{

     background:#FF0000;

 }



 </style>

 <body>

     <div id="header">

         <div class="ctrls">

             <a id="window-min" onclick="external.hitmin()">0</a>

             <a id="window-max" onclick="this.innerText = external.hitmax()?'2':'1';">1</a>

             <a id="window-close" onclick="external.close()">r</a>

         </div>

         <div class="title-bar" onmousedown="external.hitCaption()"> <span class=title> 我 的 软 件 </span></div>

     </div>



     <div id="container">

     <div class="lside"> </div>

     <div class="rside"> </div>

     </div>



     <div id="footer">

         <button onclick="alert('hello')">点击这里</button>

     </div>

 </body>

 </html>

******/



//添加可拖动边框

import web.ui;

web.ui(wb,,,0,0);



//添加阴影

import win.ui.shadow;

win.ui.shadow(winform);



winform.show(true)



//进入消息循环

win.loopMessage();

```

 在上面的范例中我们直接使用wb.html写入网页内容,您也可以使 [wb.go](web/control#go) 打开硬盘上的网页,或 [链接到资源文件中的网页](web/control#res)
