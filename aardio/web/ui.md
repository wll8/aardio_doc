# 用web窗体设计程序界面

 参考:[创建web窗体](web/webform) [在网页脚本中调用aardio函数](web/external)

## web UI

使用 [wb.external](web/external) 可以在网页中轻松执行本机代码,这使在aardio中用网页制作程序界面、以替代传统的windows窗体非常的容易,网页有丰富的界面展现能力,使用网页制作工具可以轻松制作出非常漂亮的界面,这在传统UI设计中是非常困难的事.

下面是一个简单示例.

<pre>
<p>
<font>import</font><font> web.form;
</font><font>/*DSG{{*/</font><font>
</font><font>var</font><font> winform = ..win.form(text=</font><font>&quot;webkit&#x6D4F;&#x89C8;&#x5668;&#x652F;&#x6301;&#x5E93;&quot;</font><font>;right=544;bottom=362;border=</font><font>&quot;none&quot;</font><font>)
 winform.add()
</font><font>/*}}*/</font><font>

</font><font>//&#x521B;&#x5EFA;web&#x7A97;&#x4F53;
</font><font>var</font><font> wb = web.form( winform ,0x8</font><font>/*_UIFLAG_SCROLL_NO*/</font><font> | 0x4</font><font>/*_UIFLAG_NO3DBORDER*/</font><font> );
   
wb.external = {
     hitmin = </font><font>function</font><font>(){
         </font><font>return</font><font> winform.hitmin();    
     }
     hitmax = </font><font>function</font><font>(){
         </font><font>return</font><font> winform.hitmax()
     }
     hitCaption = </font><font>function</font><font>(){
         </font><font>return</font><font> winform.hitCaption() 
     }
     close = </font><font>function</font><font>(){
         </font><font>return</font><font> winform.close()  
     }
};
 
wb.html =</font><font>/******
&lt;!doctype html&gt;
 &lt;html&gt;
 &lt;meta charset=&quot;utf-8&quot;&gt;
 &lt;style&gt;
 html,body{
     margin:0; 
     background:#fff;
     height:100%; 
 }

 *{
     -webkit-user-select: none;
 }

 /*&#x6807;&#x9898;&#x680F;*/
 #header{
     position:absolute;
     top:0px;
     left:0px;
     height:28px;
     width:100%;
     background:rgb(52,152,220);
     cursor:default;
 }

 /*&#x4E2D;&#x95F4;&#x5185;&#x5BB9;&#x680F;*/
 #container{
     box-sizing:border-box;/*&#x4F7F;&#x9AD8;&#x5EA6;&#x5305;&#x542B;padding*/
     height:100%;
     width:100%; 
     padding-top:28px;
     padding-bottom:35px;
     margin:0 auto; 
     overflow:auto;   
 }

 /*&#x5E95;&#x680F;*/
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

 /*&#x4E2D;&#x95F4;&#x5185;&#x5BB9;&#x680F; &#x5DE6;&#x4FA7;&#x5217;*/
 #container .lside{
     height:100%;
     width:150px; 
     float:left; 
     background:rgb(110,179,210);
 }

 /*&#x4E2D;&#x95F4;&#x5185;&#x5BB9;&#x680F; &#x53F3;&#x4FA7;&#x5217;*/
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
     font-family:&quot;Marlett&quot;;
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

 &lt;/style&gt;
 &lt;body&gt;
     &lt;div id=&quot;header&quot;&gt;
         &lt;div class=&quot;ctrls&quot;&gt; 
             &lt;a id=&quot;window-min&quot; onclick=&quot;external.hitmin()&quot;&gt;0&lt;/a&gt;
             &lt;a id=&quot;window-max&quot; onclick=&quot;this.innerText = external.hitmax()?&apos;2&apos;:&apos;1&apos;;&quot;&gt;1&lt;/a&gt;
             &lt;a id=&quot;window-close&quot; onclick=&quot;external.close()&quot;&gt;r&lt;/a&gt;
         &lt;/div&gt;
         &lt;div class=&quot;title-bar&quot; onmousedown=&quot;external.hitCaption()&quot;&gt; &lt;span class=title&gt; &#x6211; &#x7684; &#x8F6F; &#x4EF6; &lt;/span&gt;&lt;/div&gt;
     &lt;/div&gt; 
     
     &lt;div id=&quot;container&quot;&gt; 
     &lt;div class=&quot;lside&quot;&gt; &lt;/div&gt; 
     &lt;div class=&quot;rside&quot;&gt; &lt;/div&gt; 
     &lt;/div&gt;
     
     &lt;div id=&quot;footer&quot;&gt;
         &lt;button onclick=&quot;alert(&apos;hello&apos;)&quot;&gt;&#x70B9;&#x51FB;&#x8FD9;&#x91CC;&lt;/button&gt;
     &lt;/div&gt;
 &lt;/body&gt;<!--StartFragment   -->
<p>
</p></font><font>import</font><font> web.form;
</font><font>/*DSG{{*/</font><font>
</font><font>var</font><font> winform = ..win.form(text=</font><font>&quot;webkit&#x6D4F;&#x89C8;&#x5668;&#x652F;&#x6301;&#x5E93;&quot;</font><font>;right=544;bottom=362;border=</font><font>&quot;none&quot;</font><font>)
 winform.add()
</font><font>/*}}*/</font><font>

</font><font>//&#x521B;&#x5EFA;web&#x7A97;&#x4F53;
</font><font>var</font><font> wb = web.form( winform ,0x8</font><font>/*_UIFLAG_SCROLL_NO*/</font><font> | 0x4</font><font>/*_UIFLAG_NO3DBORDER*/</font><font> );
   
wb.external = {
     hitmin = </font><font>function</font><font>(){
         </font><font>return</font><font> winform.hitmin();    
     }
     hitmax = </font><font>function</font><font>(){
         </font><font>return</font><font> winform.hitmax()
     }
     hitCaption = </font><font>function</font><font>(){
         </font><font>return</font><font> winform.hitCaption() 
     }
     close = </font><font>function</font><font>(){
         </font><font>return</font><font> winform.close()  
     }
};
 
wb.html =</font><font>/******
&lt;!doctype html&gt;
 &lt;html&gt;
 &lt;meta charset=&quot;utf-8&quot;&gt;
 &lt;style&gt;
 html,body{
     margin:0; 
     background:#fff;
     height:100%; 
 }

 *{
     -webkit-user-select: none;
 }

 /*&#x6807;&#x9898;&#x680F;*/
 #header{
     position:absolute;
     top:0px;
     left:0px;
     height:28px;
     width:100%;
     background:rgb(52,152,220);
     cursor:default;
 }

 /*&#x4E2D;&#x95F4;&#x5185;&#x5BB9;&#x680F;*/
 #container{
     box-sizing:border-box;/*&#x4F7F;&#x9AD8;&#x5EA6;&#x5305;&#x542B;padding*/
     height:100%;
     width:100%; 
     padding-top:28px;
     padding-bottom:35px;
     margin:0 auto; 
     overflow:auto;   
 }

 /*&#x5E95;&#x680F;*/
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

 /*&#x4E2D;&#x95F4;&#x5185;&#x5BB9;&#x680F; &#x5DE6;&#x4FA7;&#x5217;*/
 #container .lside{
     height:100%;
     width:150px; 
     float:left; 
     background:rgb(110,179,210);
 }

 /*&#x4E2D;&#x95F4;&#x5185;&#x5BB9;&#x680F; &#x53F3;&#x4FA7;&#x5217;*/
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
     font-family:&quot;Marlett&quot;;
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

 &lt;/style&gt;
 &lt;body&gt;
     &lt;div id=&quot;header&quot;&gt;
         &lt;div class=&quot;ctrls&quot;&gt; 
             &lt;a id=&quot;window-min&quot; onclick=&quot;external.hitmin()&quot;&gt;0&lt;/a&gt;
             &lt;a id=&quot;window-max&quot; onclick=&quot;this.innerText = external.hitmax()?&apos;2&apos;:&apos;1&apos;;&quot;&gt;1&lt;/a&gt;
             &lt;a id=&quot;window-close&quot; onclick=&quot;external.close()&quot;&gt;r&lt;/a&gt;
         &lt;/div&gt;
         &lt;div class=&quot;title-bar&quot; onmousedown=&quot;external.hitCaption()&quot;&gt; &lt;span class=title&gt; &#x6211; &#x7684; &#x8F6F; &#x4EF6; &lt;/span&gt;&lt;/div&gt;
     &lt;/div&gt; 
     
     &lt;div id=&quot;container&quot;&gt; 
     &lt;div class=&quot;lside&quot;&gt; &lt;/div&gt; 
     &lt;div class=&quot;rside&quot;&gt; &lt;/div&gt; 
     &lt;/div&gt;
     
     &lt;div id=&quot;footer&quot;&gt;
         &lt;button onclick=&quot;alert(&apos;hello&apos;)&quot;&gt;&#x70B9;&#x51FB;&#x8FD9;&#x91CC;&lt;/button&gt;
     &lt;/div&gt;
 &lt;/body&gt;
 &lt;/html&gt;
******/</font><font>  

</font><font>//&#x6DFB;&#x52A0;&#x53EF;&#x62D6;&#x52A8;&#x8FB9;&#x6846;
</font><font>import</font><font> web.ui;
web.ui(wb,,,0,0);

</font><font>//&#x6DFB;&#x52A0;&#x9634;&#x5F71;
</font><font>import</font><font> win.ui.shadow;
win.ui.shadow(winform);

winform.show(</font><font>true</font><font>) 

</font><font>//&#x8FDB;&#x5165;&#x6D88;&#x606F;&#x5FAA;&#x73AF;
</font><font>win.loopMessage(); 
</font></p>

</pre> 在上面的范例中我们直接使用wb.html写入网页内容,您也可以使 [wb.go](web/control#go) 打开硬盘上的网页,或 [链接到资源文件中的网页](web/control#res)
