# com库 嵌入控件

 使用com.CreateEmbed函数在windows窗体上嵌入可视化控件.参考: [事件触发接口](libraries/kernel/com/event)

## com.CreateEmbed

**1、函数原型：**

``` aau
容器对象 = com.CreateEmbed( 容器对象,窗体对象,ProgID )
```

``` aau
容器对象 = 窗口或控件对象.createEmbed(ProgID )
```


**2、函数说明：**

容器对象必须是一个table对象,窗体对象指win.form对象或该窗体上的控件对象,[ProgID](libraries/kernel/com/base#id) 指定要创建的嵌入的com对象类名.

如果容器对象指定了Invoke成员,aardio会自动为容器对象创建IDispath接口.当Invoke被控件调用时,自owner参数可以获取发生调用的DISPID.请参考:[创建IDispatch接口](libraries/kernel/com/interface#IDispatch)

com.CreateEmbed在创建com对象成功后,自动为控件容器添加以下成员:

1. **容器对象._host**

指向OLE宿主对象,该对象仅有一个成员函数:
控制对象._host.close() 用于关闭控件窗口.

2. **容器对象._form**

指向调用com.CreateEmbed的第二个实参.即创建控件的容器窗口.

3. **容器对象._object**

使用指定[ProgID](libraries/kernel/com/base#id) 创建的com.IDispath对象

在aardio中,下划线开始的成员是只读的不可修改,同时也是在提醒你这是隐藏的对象.如果不是清楚的了解这些对象的作用，不应当去使用这些成员对象。在开发环境中,智能提示默认不会提示下划线开始的成员,而是试图隐藏他物，只有你输入下划线以后，这些隐藏的成员才会出现在自动提示列表中。

**3、调用示例：**

``` aau
//视频播放器控件
import win.ui;
/*DSG{{*/
var winform = ..win.form(text="mediaplayer 视频播放器控件";right=626;bottom=482)
winform.add(
btnDump={cls="button";text="显示成员";left=427;top=445;right=515;bottom=472;db=1;dr=1;z=4};
btnPlay={cls="button";text="播放";left=224;top=445;right=312;bottom=472;db=1;dr=1;z=2};
btnStop={cls="button";text="停止";left=328;top=445;right=416;bottom=472;db=1;dr=1;z=3};
static={cls="static";left=32;top=16;right=606;bottom=434;db=1;dl=1;dr=1;dt=1;edge=1;z=1}
)
/*}}*/

//创建控件
var wmplay = winform.static.createEmbed("{6BF52A52-394A-11d3-B153-00C04F79FAA6}");
wmplay._object.Url  = "mms://winmedia.cctv.com.cn/kids/300K/90152santudi.wmv"
wmplay._object.stretchToFit = true;

/*
下面的代码防止拖动改变窗口大小时视频闪烁
注意 winform.static 不要设为透明
*/
winform.static.modifyStyle(, 0x2000000/*_WS_CLIPCHILDREN*/ )
winform.modifyStyle(, 0x2000000/*_WS_CLIPCHILDREN*/ )

winform.btnStop.oncommand = function(id,event){
    wmplay._object.controls.stop()
}
winform.btnPlay.oncommand = function(id,event){
    wmplay._object.controls.play()
}
winform.btnDump.oncommand = function(id,event){
    io.open()
    com.DumpTypeInfo(wmplay._object)
    io.print("请按 CTRL+C 关闭此窗口")
}

winform.show(true)
win.loopMessage();
```
