# 远程CALL

 使用raw库函数raw.remoteApi可以在外部进程中创建远程CALL函数.

## 什么是CALL

CALL的本意在编程术语中指的是函数调用,用于将程序的执行交给其他的代码段，通常是一个子程序(函数)，同时保存必要的信息，从而使被调用段执行完毕后返回到调用点继续执行。 请参考:[函数](the%20language/function/definitions)

由于查找外部进程的CALL并调用CALL已成为了一种流行的技术,一般我们提到的CALL都是指REMOTE CALL、游戏CALL，指一种注入外部EXE程序从外部调用函数的技术.找CALL一般使用OD等工具，而CALL的使用一般需要编写复杂的汇编代码，在aardior) 中推出了一种通用CALL技术，可以象声明普通API函数一样声明CALL,并且使用该CALL函数就象普通函数一样简单.

请参考:[进程](libraries/std/process/process)

## raw.remoteApi

**1、声明CALL语法：**

``` aau
func_call = raw.remoteApi( 进程ID|进程句柄,函数原型, 这里是函数地址,调用约定="stdcall" )
```


**2、声明CALL说明：**

第一个参数为进程ID或进程句柄.
函数原型、调用约定的使用方法与声明API的语法完全一致,请参考: [定义API函数](libraries/kernel/raw/api) [静态数据类型](libraries/kernel/raw/datatype)

**3、在目标进程创建DLL API语法：**

``` aau
func_call = raw.remoteApi(  进程ID|进程句柄,函数原型
    , DLL文件名,函数名字,调用约定="stdcall")
```

**4、在目标进程创建DLL API说明：**

第一个参数为进程ID或进程句柄.
函数原型、调用约定的使用方法与声明API的语法完全一致,请参考: [定义API函数](libraries/kernel/raw/api) [静态数据类型](libraries/kernel/raw/datatype)

调用约定默认为stdcall

**5、调用示例:**

``` aau
import winex;

//遍历桌面所有窗口
for hwnd,title,tid,pid in winex.each() {
    if(title!="" && win.isVisible(hwnd) /*不然下面的看不到了*/){

         //在目标进程内声明一个函数，加载user.dll，并获取user.dll中的MessageBoxA函数指针
         var messageBox_call = raw.remoteApi(pid
             ,"void ( int hWnd, ustring text,ustring caption ,INT uType )"
             ,"User32.dll","MessageBoxW");//DLL名以及函数名也可以更换为一个函数地址

         //象普通函数一样使用
         messageBox_call(0,"这是一个外部进程！在此进程加载了User32.dll，并获取执行了MessageBoxA函数指针","aardio call" ,0)

         break ;
    }
}
```

## 使用process库创建CALL

使用process库创建的进程对象拥有更高的权限,请参考:[prcs.remoteApi](libraries/std/process/process#remoteApi)
