### 一、assert

assert断言第一个参数，如果第一个参数为真则将所有参数作为返回值返回。
如果第一个参数为假，则将第二个参数作为异常抛出。

在aardio里很多函数都支持assert，如果执行成功第一个值返回一个真值。
如果执行失败则返回两个参数，第一个为false或null，而第二个返回值为错误信息。
这恰好符合assert断言函数的逻辑。例如：

``` aau
var func = assert( loadcode("\notfound.aardio") );
```

loadcode如果执行成功，assert将返回值顺利的传递给func.
loadcode如果执行失败，第一个返回值为null，第二个返回值为错误信息，则导致assert断言失败并抛出错误信息。

### 二、assertf

assertf的作用与assert基本相似，但是断言逻辑是完全相反的。
assertf要求第一个参数必须为false(false,0或null)，如果为真(true,非零值，非null值)，则将第一个参数作为异常抛出。
如果第一个参数为假(断言成功)，则将第二个参数返回。

他与assert有以下区别
assert断言第一个参数必须为真，assertf断言第一个参数必须为假。
assert成功返回第一个参数，assertf成功返回第二个参数。
assert失败将第二个参数作为异常抛出，assertf失败将第一个参数作为异常抛出。
