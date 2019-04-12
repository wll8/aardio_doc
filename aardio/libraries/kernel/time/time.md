# time库

 日期时间函数库

## **datetime 时间对象**

aardio中的datetime对象是兼容WINAPI、兼容com中datetime对象的结构体。
可在在api函数，com函数中直接使用。

在标准库中的声明如下：
class datetime{
ushort year; //年
ushort month;
//月
ushort dayofweek; //星期
ushort day; //日期
ushort hour; //小时
ushort
minute; //分钟
ushort second; //秒
ushort milliseconds;
//这个字段正常情况下为0，只有在WINAPI函数中会起作用
format; //时间格式字符串
isdst
//是否夏令时
} datetime结构与WINAPI中的SYSTEMTIME可以相互兼容，可以直接用于WINAPI函数。

WINAPI中的SYSTEMTIME结构定义如下：
typedef struct _SYSTEMTIME {
WORD year; //年
WORD
month; //月
WORD dayOfWeek; //星期
WORD day; //日期
WORD hour; //小时
WORD
minute; //分钟
WORD second; //秒
WORD milliseconds; //微秒
}
SYSTEMTIME

## 创建时间对象

tm = time( 时间数据,时间格式字符串 );

tm = time(); //如果省略所有参数返回当前时间
tm = time.now(); //作用同上返回当前时间 
tm = time(null,"!%c") ; //返回当前时间(GMT时间)

//如果省略第二个参数，则时间格式化字符串默认为 "%c"
tm = time( num ); //时间数值以秒为单位
tm = time( str ); //以系统默认的方式格式化时间字符串。 
tm2 = time( tm ); //复制时间对象

//使用两个参数初始化时间对象，第二个字符串参数指定格式化模式。
tm = time( num ,format); //参数一是以秒为单位的时间数值
tm = time( str,format); //以参数二指定的方式格式化时间字符串。


 如果使用字符串格式化时间,aardio将自动忽略所有空格,是以无须考虑空白字符的严格匹配.

## datetime类型转换: 转换为字符串或数字

tm = time();

n = tonumber(tm); //返回时间数值，以秒为单位
s = tostring(tm); //返回格式化的时间字符串，可以通过 tm.format字段指定格式化模式。

## 检测时间对象

可以使用type.eq函数检查两个时间对象是否相等。
也可使用time.istime函数判断对象是否一个时间对象。

type.eq是严格判别类型，而time.istime是兼容性检测，只要拥有相同的结构体声明都会返回true.
time.istime检测返回为真的对象，同样意谓着可以通用于com函数，api函数，对于时间类型都会使用time.istime进行检测。

io.open()

tm = time();
io.print( time.istime(tm) ) //输出ture,内核time对象

import time.ole;
oletm = time.ole(); 
io.print( time.istime(oletm) ) //输了ture,兼容time对象

io.print( time.eq(oletm,tm) ) //输出false，不相等

## 时间格式化模式语法

创建一个time对象的语法如下：

创建时间的time对象构造函数的第二个参数可以指定格式化语法，不指时默认为 "%c"。
如果将! 作为第一个字符表示使用UTC标准时间，否则使用本地区域时间。UTF时间可以使用时间对象的local()函数转为本地时间，而本地时间可以使用对象的utc()转函数换为UTC时间。

格式化时间时可以指定区域化参数，
例如 tm = time(,"%a %B %Y %m %d %H:%M:%S","enu") 
上面最后一个参数"enu"找定了格式化时使用英文语言，中文为"chs"，也可以在时间对象的 locale属性指定格式化使用的语法，如果不指定则使用默认的区域设置 - 默认设置可使用 setlocale()函数进行设置，例如：setlocale("time","chs"，例如:setlocale("all","chs") 或 setlocale("time","chs") 应用简体中文格式化,而使用 setlocale("time","enu") 应用英文语言格式化时间. 

在格式化串中，每一个%号声明一个格式化标记，全部可用的格式化标记如下表：

%c - 输出字符串时按当前区域首选的日期时间格式，不应使用此格式解析输入字符串生成时间。 
%x - 输出字符串时使用当前区域首选的时间表示法，不包括时间，输入字符串时使用"%m/%d/%y"
%X - 输出字符串时当前区域首选的时间表示法，不包括日期，输入字符串时使用"%H:%M:%S"

%a - 当前区域星期几的简写（解析文本时忽略此字段遇到的错误）
%A - 当前区域星期几的全称（解析文本时忽略此字段遇到的错误）
%b - 当前区域月份的简写
%B - 当前区域月份的全称
%d - 月份中的第几天，十进制数字（范围从 01 到 31）
%H - 24 小时制的十进制小时数（范围从 00 到 23）
%I - 12 小时制的十进制小时数（范围从 00 到 12）
%j - 年份中的第几天，十进制数（范围从 001 到 366）
%m - 十进制月份（范围从 01 到 12）
%M - 十进制分钟数
%p - 根据给定的时间值为 `am' 或 `pm'，或者当前区域设置中的相应字符串
%S - 十进制秒数
%U - 本年的第几周，从第一周的第一个星期天作为第一天开始
%W - 本年的第几周数，从第一周的第一个星期一作为第一天开始
%w - 星期中的第几天，星期天为 0
%y - 没有世纪数的十进制年份（范围从 00 到 99,解析文本时也兼容输入的4位年份）
%Y - 包括世纪数的十进制年份(解析文本时也兼容输入的2位年份)
%Z - 时区名或缩写
%% - 文字上的 `%' 字符

使用格式串解析文本并转换为时间时，除上述匹配时间的标记以外，
其他分隔字符支持宽松的模糊匹配，规则如下： 格式串不是使用%前导的字符如果没有精确匹配到对应字符,
 则模糊匹配连续的标点、或连续的字母，或连续的宽字符（例如汉字）。

 忽略目标字符串空格，忽略目标字符串以数值表示的时间字段前的非数值字符。

 支持iso8601兼容的省略间隔符的写法（即使格式串中指定了间隔符）
 省略间隔符时年月日组合的数值必须为8位或6位，其中月、日必须是两个数字，
 时分秒连写时每个部分都必须是两个数字。

 最后一个格式化标记解析成功以后如果还有剩余的字符串，
 首先跳过前面的空白字符，从前面取其他连续的非空白字符存入时间对象的endstr属性内。
endstr可用于后续解析iso8601等格式的时区。

下面是一个使用格式化代码的示例 **：**

//从字符串创建时间值
tm = time("2006/6/6 12:56:01","%Y/%m/%d %H:%M:%S");

//改变格式化模式串
tm.format = "%Y年%m月%d日 %H时%M分%S秒";

//从时间值创建字符串
str = tostring(tm);


io.open();

//打印结果到控制台窗口
io.print(str);

## **时间的加减运算**

时间可以使用tonumber函数转换为以秒为单位的数值(time.ole对象则转换为以天为单位的数值)进行运算，
也可以使用time对象提供的方法进行加减运算。

tm = time.now();

tm.year += 2;
io.print(tm,"增加2年")

tm.addsecond(30)
io.print(tm,"增加30秒")

tm.addminute(180)
io.print(tm,"增加180分")

tm.addhour(2)
io.print(tm,"增加两小时")

tm.addday(365)
io.print(tm,"增加365天")

tm.addmonth(-24)
io.print(tm,"倒退24个月")

tm2 = time.now()

io.print( tm2.diffmonth(tm) , "相差月份" )
io.print( tm2.diffday(tm) , "相差天数" )
io.print( tm2.diffhour(tm) , "相差小时数" )
io.print( tm2.diffminute(tm) , "相差分钟数" )
io.print( tm2.diffsecond(tm) , "相差秒数" )

io.print( tonumber(tm) - tonumber(tm2) ,"相差秒数,作用同上")


 使用 add...
系列函数修改时间将自动更新所有字段，而直接指定部分字段，aardio不保证时间的合法性，也不会自动更新 dayOfWeek 字段，可使用 tm.update()
函数重新计算时间并更新该字段。

## **datetime的关系运算**

tm = time.now();
tm.year += 2;

tm2 = time.now()

io.print('\n关系运算符，相等、不等')
io.print( "tm2==tm", tm2 == tm )
io.print( "time.now()== time.now()", time.now()== time.now() )

io.print('\n关系运算符，大于、小于')
io.print( "tm2>tm", tm2 > tm )
io.print( "time.now() > time.now()", time.now() > time.now() )

io.print('\n关系运算符，大于等于、小于等于')
io.print( "tm2 <= tm", tm2 <= tm )
io.print( "time.now() <= time.now()", time.now() <= time.now() )

execute("pause","按任意键继续")
io.close();//关闭控制台

## **datetime在winapi函数中的使用**

Kernel32 := raw.loadDll("Kernel32")
GetSystemTime = Kernel32.api("GetSystemTime", "void(struct& tm)")

tm = time(); 
io.open();
io.print( tostring( tm ) );

GetSystemTime(tm);
io.print( tostring( tm )); //GMT时间比北京时间慢8小时
