# float
float属性不为none时叫浮动元素，浮动元素同时存在普通文档流内外，块级元素和浮动元素不在同一层，但是行内元素却能感知浮动元素并且受浮动元素的影响。浮动元素会通过影响行内元素间接影响包含块的布局。例如下面这个例子

```html
<div>
    <h2 class="float-title-h2">标题一</h2>
    hello world
</div>
<h3 class="float-title-h3">标题二</h3>
``` 
```css
.float-title-h2 {
    height: 200px;
    float: left;
}

.float-title-h3 {
    height: 200px;
}
```

  
标题二本来应该在第一个div的下面，但是因为float元素标题一的影响跑到了标题一的右边。

float的属性值有：
- none：默认值，不启动浮动
- left:元素定位在容器的左侧
- right:元素定位在容器的右侧
# clear[清除浮动]

- 浮动元素会间接影响布局。上述例子空通过清楚浮动来解决布局错乱的问题
```css
.float-title-h3 {
    height: 200px;
    clear:both;
}
```
- 希望行内元素不要紧贴着浮动元素可以使用清楚浮动。
# float对容器的影响
因为float元素会脱离普通文档流的原因，容器内部的元素如果都是float元素，那么这个容器就会成为一个空的容器高度和宽度都将为0
如何解决这个问题？
- 将容器也变成float元素
- 将容器变成```BFC(例如容器设置 overflow:hidden```)，BFC容器包含float元素
- 在容器的after生成一个空内容然后使用浮动清除
```css
.container:after{
    content:'',
    display:table,
    clear:both
}
```
或者
```css
.container-with-generated-content:after{
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
```