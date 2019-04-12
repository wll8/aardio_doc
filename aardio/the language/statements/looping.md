# 循环语句

 参考： [条件判断语句](the%20language/statements/branching) [等式运算符](the%20language/operator/eq) [逻辑运算符](the%20language/operator/logic) [关系运算符](the%20language/operator/relational)

## while条件循环语句

while语句包含条件判断部分、执行代码部分。
而循环体可以是一个单独的语句，也可以是用{ } 包含的[语句块](the%20language/statements/blocks)，也可以是begin end包含的[语句块](the%20language/statements/blocks).

while 语法如下：
``` aau
while( 条件判断语句 ) {　
  //需要循环执行的语句
}
```

示例代码：

``` aau
io.open()

var countLoop = 0
while( countLoop<10 /*这里指定进入并重复执行循环语句的条件*/ ){
	countLoop++

	io.print("循环次数", countLoop);
};

execute("pause") //按任意键继续
io.close();//关闭控制台
```

## while var 条件循环语句

while var 语句类似while语句,但可以条件判断前添加循环变量初始化、判断条件前执行语句。

语法如下：
``` aau
while( var 初始化循环变量列表;判断条件前执行语句;条件判断语句 ) {　
  //需要循环执行的语句
}
```

示例代码：

``` aau
io.open()

while(
    var next,line = io.lines("~\lib\console\_.aardio"); //在循环开始前初始化局部变量
    line = next(); //语句或语句块，可省略不写,但不能省略分号
    line //循环条件表达式,不可省略
){
    io.print(  line );
};
```


while var 语句允许合并条件语句中的循环变量初始化赋值、判断为一个单独的var语句，例如：

``` aau
while(
    var i = test()
) {
	io.print(i)
}
```

 上面的循环语句会在循环语句内部定义 i 变量(也可以定义多个局部变量)，
并且在每次循环前都执行 i = test()，并判断i的值(如果定义了多个局部变量,仅判断第一个变量的值)，如果i为真值则继续循环。

## do...while条件循环语句

do...while语句包含条件判断部分、执行代码部分。
执行代码部分可以是一句代码，或者一个语句块，语句块可以是{ } 包含的语句块，也可以是begin end包含的语句块.

do...while语句是首先执行循环体，然后再判断循环条件。
循环体至少会执行一次。

语法如下：

``` aau
do{　
  //需要循环执行的语句
} while( 条件判断语句 )
```

下面是do..while语句示例:


``` aau
do{
    io.print(countLoop)
    countLoop++
}while( countLoop<123 ); //判断条件
```

## for计数循环语句(for loop)


for循环执行一个固定次数的循环，语法如下：

``` aau
for( 计数器变量= 初始数值; 最大数值; 步进数值) {　//步进可以省略，默认值为1。
  //需要循环执行的语句
}
```

for循环在开始指定循环计数范围(该语句可选被包含在括号中)，指定计数器范围的语句仅在循环开始时执行一次。
而循环体可以是一个单独的语句，也可以是用{ } 包含的语句块，也可以是begin end包含的语句块.

计数器变量仅在循环内部有效，你可以在循环体内部修改计数器到一个合法数值，但是不推荐你这么做。
循环体内部代码应当尽可能遵循黑盒原则、使循环体的条件控制仅仅置于循环体的开始或结束是好的习惯。

?> ![](../../icon/info.gif) 可以在for循环内部改变计数器变量的值,改变为非数字值将会自动恢复正常计数器值。

for计数循环他可以简化循环条件控制为简单的递增或递减，使代码结构清晰可读。
可能的话，应优先选择使用for计数循环来替代其他的循环语句。

下面是一个例子，计数器i从1循环到10，每次递增2。

``` aau
io.open();

for( i=1;10;2 ){ //计数器i从1循环到10，每次递增2
   io.print(i)
}
//支持修改计数器变量
for( i=1;10;1 )begin
   i++;//如果你将i赋值为非数字，在下次循环以前将会被自动恢复为计数器值
end;

//递减计数器
for( i=1;-10;-1 )begin
   io.print(i)
end;

execute("pause") //按任意键继续
io.close();//关闭控制台
```
 下面是用for循环计算阶乘的示例：


``` aau
//计算阶乘(指从1乘以2乘以3乘以4一直乘到所要求的数)
math.factorial = function(n){
   var result = 1;
   for(i=2;n) result *= i;
   return result;
}
io.open()
io.print( math.factorial(15) )

execute("pause") //按任意键继续
io.close();//关闭控制台
```

## **for...in泛型循环 语句。**

请参考：[泛型for与迭代器](the%20language/statements/iterator)

## 循环中断语句

一个好的习惯是：使循环的条件控制集中在循环体的开始或结束，使循环体内部保持良好的内聚性。
从而使代码的结构清晰并容易理解、中断语句在一定程度上破坏了这一规则，是以应谨慎的使用中断语句。
并且尽可能的使中断语句的使用简洁而清晰、并使他们保持一致性的规律(例如在相同的深度的嵌套层)。


### **1、break语句**

break语句中断并退出循环并跳转到指定循环的结束点以后开始执行。


### **2、continue语句**

continue语句跳过循环体剩下的部分，跳转到循环体的开始处并继续执行下一次循环。
类似一种不执行循环体剩余部分代码的条件语句。

可以在循环体的开始处使用continue语句是一种好的习惯，可以避免将循环体代码包含在一个大的if语句中。
使程序拥有清晰的结构。


### **3、带标号的break、continue语句(labeled break、labeled continue)**

aardio支持带标号的break、continue语句。

标号可以是一个数值，例如 break N; continue N;
N指定循环语句的嵌套序号。当前循环用1表示，上层循环为2，再上层为3，依此累加......

也可以在循环语句的开始，为循环语句指定一个具名标号，
然后使用break lable、continue lable中断指定的循环。

示例代码：

``` aau
io.open(); //打开控制台

while( true ){ 循环体2: //可以在循环体的开始指定一个标号
	io.print("循环体2开始" );

	while( true )begin
	 	io.print("循环体1开始" );

		break 2;//中断上层循环
		break 循环体2; //这句的作用与上面的break作用是一样的

		io.print("循环体1结束" );

	end;

	io.print("循环体2结束" );
}

execute("pause") //按任意键继续
io.close();//关闭控制台
```

## 巧用中断语句减少嵌套

请看下面的判断语句。
``` aau
io.open() //打开控制台窗口

var cond = 2;

if( cond == 1 ){
    io.print(1);
}
else{
    //可以在if语句块前面添加代码
    if( cond == 2 ){
        io.print(2);
    }
    else{
        //可以在if语句块前面添加代码
        if( cond == 3 ){
            io.print(3);
        }
    }

}
```

按上面的思路，你可以继续写下去，嵌套十层八层应当很容易，代码也会越来越混乱。
但是他的确符合了结构化编程的原则：一个入口、一个出口。

这时候我们不能再默守成规，将上面的判断语句放在一个do...while(false)语句块内部，这个"循环"语句块只会执行一次，并且可以随时可以用中断语句退出循环.改进后的代码如下：

``` aau
io.open();

var cond = 2;
do { // 循环

    if(cond == 1 ) begin
         io.print(1);
         break;//可以随时跳出语句块
    end;

    //可以在if语句块外部添加代码

    if(cond == 2 )begin
         io.print(2);
         break;//可以随时跳出语句块
    end;

    if(cond == 3 )begin
       io.print(3);
        break;//可以随时跳出语句块
    end;

}while( false ); //while条件为false则不再循环
```

这里我们虽然使用了break中断语句，但是所有break语句位于相同深度的嵌套层次，中断过程清晰一致。

现在我们不再需要else语句块来"**多管闲事**"，if语句完成自已的任务就可以离开。
`每个代码块(指语句块、子程序、或类、名字空间、甚至是按就近原则放在一起的逻辑语句块)都应当尽可能减少自已的责任。`

我们同样可以在函数中使用上面的技巧来避免条件语句过深的嵌套。
这时候我们需要创建一个函数、并用return语句代替退出子程序。


``` aau
io.open();

func = function(cond) { // 循环

    if(cond == 1 ) begin
         io.print(1);
         return;//可以随时跳出语句块
    end;

    //可以在if语句块外部添加代码

    if(cond == 2 )begin
         io.print(2);
         return;//可以随时跳出语句块
    end;

    if(cond == 3 )begin
       io.print(3);
        return;//可以随时跳出语句块
    end;

}

func (2);
```

## 嵌套循环

循环语句是允许多重嵌套的，一个循环语句允许包含另一个循环语句。
为了清晰的表示嵌套的层次，需要根据嵌套的层次使用tab制表符缩进。

!> ![](../../icon/warning.gif) 不要使用超过三层的嵌套，这样会使代码变得混乱难以理解并且要添加太多的缩进

### 七、使用简洁清晰的条件语句

无论循环的条件语句是在循环体的开始，还是在循环体的结束。
他们应当尽可能的清晰、简短。一个很长的而复杂的条件表达式意谓着你需要重新设计你的程序。

将难以理解的条件表达式从循环体的条件判断语句中分离出来，将他们赋值一个命名清晰的变量。或者用命名清晰的子程序来执行。

条件语句的责任只有一个，即判断循环条件。
不要试图在条件语句中改变什么、这是不好的习惯、aardio不允许你在条件表达式中赋值，这有利于形成良好的代码风格。

请看下面的设计糟糕的代码。

``` aau
import mouse;
var x,y,l,t = 0,0,0,0
var r = 500;
var b = 500;
function 下一个坐标(){
    x++;y++
    return x,y;
}
while(x>=l && x<=r && y>=t && y<=b && 下一个坐标() ){
    mouse.move(x,y,true);
    sleep(10)
}
```

while语句的条件判断式写的很长不会很"酷"，这是糟糕的错觉。
而且在循环体内部的函数做了他不应该做的事：改变坐标值。

需要修改的是将复杂的条件判断交给一个布尔变量或者一个函数。
而修改数据的代码应当放到循环体内部，如下：

``` aau
import mouse;

var l,t,r,b = 0,0,500,500 //变量名调整了位置，而不是将x,y与l,t莫名其妙的放在一起
function 在窗口范围内(x,y){
    return x>=l && x<=r && y>=t && y<=b
}

//循环体的条件判断语句只有一个责任：清晰明确的条件判断
var x,y = 0,0 //变量在靠近第一次使用处声明，减小跨度，增强可读性
while( 在窗口范围内(x,y) ){
    x++;y++;
    mouse.move(x,y,true);
    sleep(10)
}


```
