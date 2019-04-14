# 元表

 使用元表可以自定义对象的默认行为、操作符。

## 什么是元表

一个table对象可以用另一个table对象(元表)来定义一些`元方法(metamethods)`。
用来定义元方法的表称为元表(metatable)。元表(metatable)允许我们改变表(table)的行为。

元表(metatable)中的函数称为元方法，通常用来重定义运算符。
例如对两个表(table)进行相加时，他会检查两个表是否有一个表有元表(metatable)，
并且检查元表(metatable)是否有_add函数。如果找到则调用这个_add函数去计算结果。


## 保护元表

一个table对象指定了元表以后，默认创建的是保护元表、保护元表是禁止移除的（当然也就不能指定新的元表）
如果在元表中声明了 `_float` 属性，并赋值为真、则该元表不受保护并且可以随时被移除。

## 读取、设置元表

``` aau
tab = {

  @{ //使用@操作符设置元表

  _get = function(k) begin

    io.print(k)
    return owner[[k]] //不调用元方法

  end;
  _float = true; //允许移除元表
  }
}

tab@ = {}; //也可以这样设置元表
tab@ = {}; //这句会出错，因为元表没有指定_float属性时不能被移除

f = tab@._get; //读取元表
```


## 运算符重载

请参考：[运算符、表达式 - 运算符重载](the%20language/operator/overloading)

## 重载成员操作符

如果访问表中不存在的属性会调用 `_get`元方法，如果修改表中不存在的属性调用 `_set`元方法;

下面是一个示例，创建代理对象：

``` aau
/创建一个代理，为另一个table对象创建一个替身以监控对这个对象的访问
function table.createProxy(tab) {
    var proxy = {};//创建一个代理表
    var real = tab;//在闭包中保存被代理的数据表tab

    proxy@ = {};//创建元表
    proxy@._get = function(k) begin
        io.print(k+"被读了")
        return real[k];
    end;
    proxy@._set = function (k,v) begin
        io.print(k+"被修改值为"+v)
        real[k]=v; //删除这句代码就创建了一个只读表
    end

    return proxy; //你要访问真正的表？先问过我吧，我是他的经济人！！！
}

//下面是使用示例

tab = {x=12;y=15};
proxy = table.createProxy(tab);//创建一个代理表，以管理对tab的存取访问

io.open();
c = proxy.x; //显示 "x被读了"
proxy.y = 19; //显示 "y的值被修改为19"
io.print(proxy.y); //显示 "y被读了" 然后显示19
```

## 范例

下载是一个示例，通过修改元表重定义dll对象的api函数。

``` aau
User32 := raw.loadDll("User32.dll");

User32@.api2 = User32@.api
User32@.api = function(f,p,c){
   io.print(f,p,c)
   return owner.api2(f,p,c)
}

io.open();
::Kernel32 := ..raw.loadDll("Kernel32.dll");
::GetModuleHandle = Kernel32.api( "GetModuleHandleA", "pointer(string)")
```
