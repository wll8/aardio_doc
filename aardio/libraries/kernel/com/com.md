# com库

com具有与语言，平台无关的特性，aardio提供com库对com组件提供支持。

## 引用com库

com库在aardio中默认是不加载的，在使用前必须调用import语句导入com库。

``` aau
import com; //载入com库
```

## com.CreateObject

**1、函数原型：**

``` aau
com对象 = com.CreateObject( progID )
```


**2、函数说明：**

progID参数指定控件的注册类名,也可以是CLSID,如果是CLSID则必须置于大括号中.
请参考:[CLSID与ProgID](libraries/kernel/com/base#id)

**3、函数示例：**

``` aau
import com; //引用com库
xml = com.CreateObject("MSXML.DOMDocument") //使用ProgID创建com对象
xml = com.CreateObject("{2933bf90-7b36-11d2-b20e-00c04f983e60}") //使用CLSID创建com对象
```

## com.GetObject

**1、函数原型：**

``` aau
com对象 = com.GetObject( progID )
```


**2、函数说明：**

返回已运行的com对象
progID参数指定控件的注册类名,也可以是CLSID,如果是CLSID则必须置于大括号中.
请参考:[CLSID与ProgID](libraries/kernel/com/base#id)

**3、函数示例：**

``` aau
excel = com.GetObject("Excel.Application")
excel =com.GetObject("e:\\SAMP.XLS") //打开指定的文件
```

## com.QueryObject

**1、函数原型：**

``` aau
com对象 = com.QueryObject( com指针 )
```


**2、函数说明：**

参数一可以一个IUnknown指针对象、也可是一个普通的pointer类型指针,查询并返回com.IDispatch对象

## com.ShowHelp

**1、函数原型：**

``` aau
com.ShowHelp( com对象  )
```


**2、函数说明：**

查看帮助

**2、函数示例：**

``` aau
import com; //引用com库

conn = com.CreateObject("ADODB.Connection"); //创建数据库连接
assert(conn,"创建数据库连接时遇到错误");

com.ShowHelp(conn); //打开ADO帮助文档
```

## com.DumpTypeInfo

**1、函数原型：**

``` aau
com.DumpTypeInfo( com对象  )
```


**2、函数说明：**

在控制台窗口显示类型信息.

**2、函数示例：**

``` aau
import com; //引用com库

xml = com.CreateObject("MSXML.DOMDocument")
com.DumpTypeInfo(xml) //输出xml对象的类型信息、成员属性、成员方法列表
```

### 访问com对象属性

``` aau
import com; //引用com库

conn = com.CreateObject("ADODB.Connection"); //创建数据库连接
conn.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=test.mdb"
```

## 数据类型

各种aardio数据类型能自动支持com，例如常见的数值、字符串类型、时间对象、table数组等等。

如果一个table数组内部仅有一个字符串，则会自动转换为com支持的字节码数组，示例如下：

......此处的代码请参考web库源代码

``` aau
post = function(url,postdata,headers='\r\nContent-Type: application/x-www-form-urlencoded',target="_self"){

    this._browser.Navigate(url,0,target,{ postdata/*将字符串转换为字节数组*/ } ,headers)

}
```

注意红色部分代码，一个字符串被转换为字节数组。

## com对象 - 读写属性、调用成员函数

``` aau
import com; //引用com库

//创建com对象
conn = com.CreateObject("ADODB.Connection");

//读写com对象成员属性
conn.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=test.mdb"

//调用com对象成员函数
conn.Open();
```

需要注意com对象的同一个成员属性名字，即可以作为一个属性名来获取对应的值( DISPATCH_PROPERTYGET )，也可以作为一个函数来调用（ DISPATCH_PROPERTYGET | DISPATCH_METHOD ）。 aardio会自动识别你的代码，如果使用的是"."成员操作符,并且紧接一个函数调用,例如 comObj.name(); 这时候aardio将comObj.name作为一个函数并调用该函数，其他获取属性的写法例如：

``` aau
var name = comObj["name"];
var name = comObj.name;
```

 这样就会直接获取com对象原本的属性值（而不是将comObj.name返回为一个函数对象），COM对象的属性通常会支持以上两种写法,例如文本属性 ele.innerHTML返回一个字符串，而ele.innerHTML()以函数调用的方法同样返回字符串。

COM对象的文本属性可以使用UTF16或UTF8编码的字符串赋值 - 即该字符串的string.getUtf(str)返回值为16或8。也可以成员名字前面添加"Unicode"后缀访问文本属性，例如用ele.innerTextUnicode获取 ele.innerText,这时候会返回一个Unicode文本，注意这种方式获取文本不能写为ele.innerTextUnicode()。

也可以成员名字后面添加"get"或"set"前缀,这时候aardio会返回一个函数，get前缀返回一个用于读取属性的函数,而set前缀返回一个用于写入属性的函数.

``` aau
//comobj是一个com对象

comobj.setText( "文本" ) //等价于 comobj.Text = "文本"

txt = comobj.getText(); //等价于 txt = comobj.Text
```

## com对象 数值索引成员

com对象有两种使用数值索引获取成员的方法.
其一是像aardio一样使用[]索引操作符,例如 val = comobj[2];
另外一种很常见的方式是使用()操作符,以函数调用的形式获取成员,例如:

``` aau
comobj.item(0).Text="testitem"
```

如果comobj.item是一个函数,那么一定要像上面这样写,将索引放到参数里.
如果comobj.item不是一个函数,根据不同的com对象,可能是使用(),也可能是使用[]来传入索引,不清楚的情况下可以两种都试一下.

如果是一个普通的数组(而不是接口对象),则使用[]索引操作符访问数组成员.
需要注意的是Javascript并不支持普通数组,我们需要利用js提供的特殊对象VBArray来转换,如下:

``` aau
//创建web窗体代码省略............

//在网页上执行javascript脚本

wb.doScript("
    var aardioArray = external.getTableArray(); //获取aardio返回的table数组
    var jsArray = new VBArray( aardioArray ).toArray()
    alert( jsArray[1] ) //jsArray已经被aardio修改了
    ")
```


如果是使用com.ImplInterface创建的IDispatch接口,或者web窗体里的external接口,不支持普通数组索引.
这时候我们可以仿效com的机制用函数实现一个接口.例如:

``` aau
//创建web窗体代码省略............

//创建external接口
wb.external = {
    [1] = "123";
    [2] = "456";
    item = function(index){
    	return owner[index+1] //注意aardio下标从1开始,而Javascript从0开始
    }

 }

//在网页上执行javascript脚本
wb.doScript("
    alert( external.item(1) )
    ")
```



如果集合对象支持枚举,则可以使用com.each()创建迭代器来遍历所有数组成员,如下:

......此处的代码请参考本页开始的示例

``` aau
// 获取所有的地区标签
var 地区 = xml.getElementsByTagName("地区");

for index, 市 in com.each( 地区) {

   //获取市标签Node
   var 市 = 市.getElementsByTagName("市");
   io.print( "　　　市 Id: ", 市.item(0).attributes.item(0).nodeValue );
   io.print( "　　　市 value: ", 市.item(0).text );
   io.print( "　　　市 Id: ", 市.item(1).attributes.item(0).nodeValue );
   io.print( "　　　市 value: ", 市.item(1).text );

}
```

## 获取IUnknown托管指针

**1、函数原型：**

``` aau
托管指针 = com.GetIUnknown( com对象 |IUnknown托管指针|pointer指针 )
```

**2、函数说明：**

返回com对象的IUnknown托管指针.托管指针是一个type.cdata对象.
指针对象已定义_gc元方法,可自动管理引用计数自动释放.托管指针已定义_topointer元言法,在API函数参数中可自动转换为pointer指针.

aardio禁止你将com对象作为API函数参数中的指针使用,并提供com.GetIUnknown()函数,
允许你显式的获取com对象的原始指针.

如果参数是一个IUnknown托管指针,则com.GetIUnknown直接返回该对象.

如果参数是一个普通的pointer裸指针,则com.GetIUnknown将此指针封装为托管指针.
注意,你必须确定pointer指针的确是一个IUnknown指针,并承担误用非IUnknown指针的风险.
实际上,使用pointer类型的指针总是有较大的风险、指针很快很自由，但是需要你有高超的技术。

## 获取IUnknown指针

**1、函数原型：**

``` aau
指针 = com.GetPointer( com.IDispatch对象 )
```

**2、函数说明：**

返回com对象的IUnknown裸指针,该函数会自动调用对象的AddRef()函数增加引用计数.
裸指针不会自动释放,必须显式调用com.Release()函数释放.

com.GetPointer返回不是一个安全的托管指针,必须由你自已小心的控制引用计数,你必须熟悉com引用计数的规则.
忘记调用com.Release(),或调用com.Release()释放已释放的指针都会导致com对象引用计数错误,并导致错语的释放操作.

##

## 封装IUnknown指针

**1、函数原型：**

``` aau
指针 = com.boxpointer( IUnknown指针 )
```

**2、函数说明：**

参数必须是IUnknown裸指针,该函数会将裸指针转换为安全的托管指针.并自动管理引用计数并自动释放.
与com.GetIUnknown()类似,托管指针有相同的元类型:com.IUnknown

## 自动释放com对象

com.IDispatch对象、:com.IUnknown托管指针都会在废弃不用时自动释放.
可以显式启动内存回收进行自动释放,如下:

``` aau
import com; //引用com库

conn = com.CreateObject("ADODB.Connection"); //创建数据库连接
conn.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=test.mdb"
conn.Open();//打开数据库

conn.close();//关闭数据库，首先调用com对象自已的关闭、释放函数

conn = null; //删除所有引用该对象的变量

// 下面这句可以省略，垃圾回收器会在需要的时候自动执行
collectgarbage(); //执行垃圾回收，如果没有变量引用该对象，对象被安全删除
```

## 显式释放com对象

**1、函数原型：**

``` aau
指针 = com.Release( IUnknown裸指针 | IUnknown托管指针 | com.IDispatch对象 )
```

**2、函数说明：**
COM对象不再使用时会由aardio自动销毁，一般不需要手动去释放对象，但也可以显式的调用 com.Release安全的释放COM对象(com.IDispatch对象,com.IUnknown对象）。对一个COM对象重复调用com.Release会被忽略.

但如果参数是一个指针类型，那么每次调用com.Release指针的COM引用计数都会减一，你必须严格遵守COM引用计数规则， 如果参数不是一个真正的IUnknown指针,或者没有正确的按com规则释放都会导致问题。

com.GetPointer(对象或指针) 的作用与com.Release相反，此函数会返回COM的原生指针、并增加COM引用计数。

**3、函数示例：**

``` aau
//....... 省略前面的代码，请参考 lib/com/ipicture.aardio 库文件中的代码

var hr,picture = ::OleLoadPicture(pIStream, #strBmp, 0, IID_IPicture, pIPicture );//用OleLoadPicture获得IPicture接口指针
if(hr)return; //不等于0为出错c

..com.Release(pIStream) //因为OleLoadPicture在获取com对象指针时，指针自动Addref增加了引用计数，所以需要调用com.Release释放pIStream

//注意，你需要确认Release的是一个pointer指针类型，并且是一个com指针，
// 并且你需要确认你在获取此指针时已经调用了AddRef，例如OleLoadPicture会隐含调用AddRef.
// 如果不是对这些非常熟悉，请谨慎使用此函数直接释放pointer指针对象.
```

## COM与aardio间的数据类型转换

aardio调用com函数时会根据COM函数的参数类型定义、以及实际传入的参数自动转换为合适的COM类型，对于返回值也会自动转换为合适的aardo类型。

table如果包含数组则转换为COM安全数组(SAFEARRAY)。转换为数组时遵守以下规则：
1.如果数组元素是字符串，则转换为COM安全数组的元素类型为_VT_BSTR。
2.如果数组元素是数值，则转换为COM安全数组的元素类型为_VT_R8。
3.数组元素是其他类型或混合不同类型时，则转换为COM安全数组的元素类型为_VT_VARIANT。

如果table对象在_safearray成员中指定了一个数组,传给COM函数时该对象将自动转换为COM安全数组。这种table可选添加一个_type属性显示指定组元素类型,例如：

``` aau
{ _safearray = { "数组成员1";"数组成员2"}; _type = 8/*_VT_BSTR*/ }
```


_safearray也可以是字符串表示的数组、或缓冲区(buffer)表示的字节数组，例如:

``` aau
{ _safearray = "SAFEARRAY" }
```


如果不指定_type属性，字符串或buffer表示的字节数组默认组元素类型类型为VT_UI1（字节数组）, 包含字符串的数组元素类型为VT_BSTR，包含数值的数组元素类型为_VT_R8，其他类型或混合不同类型时元素类型为_VT_VARIANT。

如果table对象的元表使用 _safearray_type 指定了安全数组的COM类型，例如

``` aau
{ 1;2;3; @{_safearray_type=0x11/*_VT_UI1*/} }
```


aardio会将其作为COM安全数组使用。
可以使用

``` aau
var array = com.SafeArray(COM类型)
```


生成符合此规格的COM安全数组，aardio在获取COM安全数组时也会自动转换为此格式(COM字节数组则会转换为aardio中的buffer类型)。

当COM返回给aardio的值是无符号字节数组（类型为 VT_UI1 ）时会自动转换为aardio中的buffer类型，反过来aardio中的buffer类型对象传入COM函数时也自动表示为COM中的字节安全数组（元素类型为VT_UI1)。

其他table类型对象则转换为IDispatch对象, 函数对象也会自动转换为为IDispatch对象。
关于IDisptch的转换细节请参考 [com.ImplInterface](libraries/kernel/com/interface#IDispatch)

在web.form控件中Javasript中的VBArray对象就是元素类型为_VT_VARIANT的SAFEARRAY,这时候需要显式指字元素类型为_VT_VARIANT类型。
