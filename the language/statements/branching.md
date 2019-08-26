# 判断语句

 参考：[等式运算符](the%20language/operator/eq) [逻辑运算符](the%20language/operator/logic) [关系运算符](the%20language/operator/relational)

## if语句

if语句包含条件判断部分、执行代码部分。 执行代码部分可以是一句代码，或者一个语句块，语句块可以是{ } 包含的[语句块](the%20language/statements/blocks)，也可以是begin end包含的[语句块](the%20language/statements/blocks)

?> 而if语句将条件语句返回的结果与布尔值true 进行比较、比较使用[等式运算符](the%20language/operator/eq) (支持自动类型转换、_eq元方法)。

if语句可选包含任意多个elseif分支判断语句，可选包含一个else语句。并可以嵌套使用。

一个标准的if语句如下:
``` aau
io.open() //打开控制台

var a=1

if(b==1){
    if(a==1) begin
        io.print("if")
    end
}
elseif(a==11){
    io.print("elseif")
}
else{
    io.print("else")
}
```

## select case语句

select指定一个选择器变量或表达式，case语句列举不同的值或条件值，第一个符合条件的case语句将会执行（执行第一个符合条件的case语句以后退出select语句，不会执行多个case语句）。

?> ![](../../icon/info.gif) case语句默认调用[恒等式运算符](the%20language/operator/eq) 进行比较。也可以自行指定操作符。

例如：

``` aau
io.open() //打开控制台

var a = 0;

select( a ) {

    case 1 { //判断 1===a 是否为真
        io.print("a==1")
        //其他代码
    }
    case 1,9,10 { //判断 a　是否其中的一个
        io.print("a是1,9,10其中之一")
    }
    case 10;20 { //判断 ( 10<=a and a <=20 ) 是否为真
        io.print("a在10到20的范围")
    }
    case !=0{ //判断 a是否不等于0，这是自已指定关系运算符的示例
        io.print("a不等于0")
    }
    else{ //所有条件不符时执行else语句块
        io.print("a是其他值(0)")
    }
}

```

select case语句可以嵌套使用。
