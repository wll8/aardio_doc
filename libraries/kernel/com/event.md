# com对象 事件接口

 参考: [在windows窗体上嵌入可视化控件](libraries/kernel/com/embed)

## com.Connect

**1、函数原型：**

``` aau
var 事件接收器,cookie = com.Connect( com对象, 事件表 )
```


**2、函数说明：**

 事件表(event table)是一个普通的table对象,com.Connect查找com对象的默认事件接口并进行挂接.
 挂接成功以后创建事件接收器(event sink)并返回,事件接收器是一个com对象,用于响应事件,并触发事件表中的事件函数.

cookie是一个数字值,用来记录连接点.可以使用此参数调用 com.ReleaseConnection 以释放接收器,并取消挂接.


**3、调用示例：**

``` aau
//下面的flash.shockwave是一个flash控件
//创建控件的代码请参考: 在窗体上创建flash控件

_IShockwaveFlashEvents = {
    OnReadyStateChange = function( newState ){
          io.print("OnReadyStateChange")
    }
    OnProgress = function( percentDone ){
          io.print(percentDone)
    }
    FSCommand = function( command ,args ){
          io.print( command , args );
    }

}

var sink,cookie = com.Connect(flash.shockwave, _IShockwaveFlashEvents);
```

## com.AddConnection

**1、函数原型：**

``` aau
var cookie = com.AddConnection( com对象, 事件接口 )
```


**2、函数说明：**

 此函数与com.Connect类似,不同的是参数二是一个com接口对象,而不是普通的table表.
com.AddConnection挂接到目标com对象的指定事件接口, 该接口使用 com.ImplInterface 创建.

cookie是一个数字值,用来记录连接点.可以使用此参数调用 com.ReleaseConnection 以释放接收器,并取消挂接. 

**3、调用示例：**

``` aau
//下面的flash.shockwave是一个flash控件
//创建控件的代码请参考: 在窗体上创建flash控件

flash.callevent = {
    OnReadyStateChange = function( newState ){
          io.print("OnReadyStateChange")
    }
    OnProgress = function( percentDone ){
          io.print(percentDone)
    }
    FSCommand = function( command ,args ){
          io.print( command , args );
    }

}
flash.callevent_i =   com.ImplInterface( flash.callevent
    ,"ShockwaveFlash.ShockwaveFlash","_IShockwaveFlashEvents")

cookie = com.AddConnection( flash.shockwave,   flash.callevent_i );
```


 请参考:[com.ImplInterface](libraries/kernel/com/interface#ImplInterface)

## com.ReleaseConnection

**1、函数原型：**

``` aau
com.ReleaseConnection( com对象 ) //释放挂接到默事件接口的接收器
com.ReleaseConnection( com对象, 事件对象,cookie ) //释放挂接到指定接口的接收器
```


**2、函数说明：**

 此函数与注销使用com.Connect、com.AddConnection创建的事件连接点。
 调用这个函数并不是必须的,不再使用的com对象会被aardio的内存回收器自动销毁,com对象销毁以前会自动释放所有的事件连接.


**3、调用示例：**

``` aau
//......此处代码略,参考上面com.AddConnection的示例代码

com.Release(flash.shockwave,flash.callevent_c,cookie)
```
