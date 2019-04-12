# com对象 事件接口

 参考:[COM基础知识](libraries/kernel/com/base)

## com.ImplInterface

**1、函数原型：**

``` aau
interface = com.ImplInterface( table对象,ProgID,接口名字 )
```


**2、函数说明：**

 函数将指定的table创建为指定的com接口.


**3、调用示例：**

``` aau
flash_callevent = {
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
flash_callevent_i =   com.ImplInterface( flash_callevent
    ,"ShockwaveFlash.ShockwaveFlash","_IShockwaveFlashEvents")
```

## 创建IDispatch接口对象

**1、函数原型：**

``` aau
dispatch = com.ImplInterface( table对象 | 函数对象 )
```


**2、函数说明：**

 如果指定一个函数对象作为参数，则仅支持使用匿名DISPID进行Invoke调用,DISPID将会传递给函数的owner参数.

 如果指定一个table成员,则可使用IDispatch接口公开table的命名成员..而owner参数将会是table对象自身(而不是DISPID) ,也可以使用DISPID作为成员的数值键以支持匿名DISPID调用,在查询DISPID时,aardio将使用[raw下标](the%20language/operator/member) (不会触发元方法)


**3、函数示例：**


``` aau
import com;
import console;

var dispatch = {

	[ 0/*_DISPID_VALUE*/ ] = function(...){
		return ...;
	}

	[ -5/*_DISPID_EVALUATE*/ ] = function(...){

	}

}

dispatchObject = com.ImplInterface(dispatch);

console.log( dispatchObject(123), );
console.pause();
```
