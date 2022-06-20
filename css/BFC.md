# 什么是BFC
BFC是块级格式化上下文的缩写(什么是格式化上下文？
格式化上下文就是css2.1的一个规范，用来规定一个渲染区域的布局定位规则。),BFC是一个独立的容器,内部元素不会影响外部布局，外部的布局也不会影响内部的布局。

# 为什么使用BFC
- BFC计算宽高的时候考虑float元素，因此float元素可以撑开BFC
- BFC之间没有外边距重叠的问题；但是BFC内部的元素仍然存在外边距重叠的问题
- BFC可以避免元素被float元素覆盖

# 如何启用BFC？
- ```body 根元素```
- overflow:hidden;//```auto scroll```
- diplay:flex;//table-cells,```inline-block```
- position:absolute fixed
- ```float:left,right```

