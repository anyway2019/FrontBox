# 简单选择器
```css
* {

}
#id{

}
.class-name{

}
p{

}
div{

}

```
# 组合选择器
```css
a b{

}
a>b{

}
a+b{

}
a~b{

}
a,b{

}
/*<div class="a b"><div>*/
.a.b{

}
```
# 属性选择器
属性选择根据场景适当使用，一般用于官网之类的网站，对性能有要求的业务管理网站谨慎使用，因为属性选择器需要遍历dom树去查询符合条件的节点这对性能有一定损耗。
```css
//包含指定属性的元素，可以指定多个属性
img[alt]{
    width:32px;
}
a[href][title]{
    color:red;
}
//找到指定属性值的元素，可以指定多个条件
a[title="head"]{
    text-transform:capitalize;
}
a[href="http://xxx.com/"][title="xxx"] {
    color: red;
}
//找到包含指定属性值的元素
a[href～="https"][title~="import"] {
    color: red;
}
//找到指定属性值开头val或者val-开头的元素
//<p lang="en">Hello!</p>
//<p lang="en-us">Greetings!</p>
*[lang|="en"] {
    color: red;
}
//找到以制定属性值开头的元素
div[data^"prefix"]{
    opacity:0;
}
//找到以指定属性值结束的元素
div[data$"affix"]{
    opacity:1;
}
//找到包含属性值的元素
div[data*"vip"]{
   background-color:blue;
}

```
# 伪类
一般是冒号:开头，通常代表节点的某种状态
```css
.search-btn:hover{
    cursor:pointer;
}
.search-btn:active{
   
}
.search-btn:focus{
    
}
.search-btn:visited{
   
}
.search-btn:disabled{
    
}
/*:nth-of-type(n) 选择器匹配属于父元素的特定类型的第 N 个子元素的每个元素.n 可以是数字、关键词或公式。*/
.p:nth-of-type(1){

}
/* 使用公式 (an + b)。描述：表示周期的长度，n 是计数器（从 0 开始），b 是偏移值。在这里，我们指定了下标是 3 的倍数的所有 p 元素的背景色：*/
p:nth-of-type(3n+0)
{
    background:#ff0000;
}
```
# 伪元素
一般是双冒号开头::，通常代表与节点关联的元素
```css
//节点后的部分
.container::after{
    content:"",
    clear:both;
}
//节点前的部分
.container::before{
    content:"",
    clear:both;
}
//首字母
.container::first-letter{
  text-transform:uppercase;
}
//首行
.container::first-line{
    text-transform:uppercase;
}
/* 被用户用鼠标等设备选中或者高亮部分 */
.container::selection{
   background-color: cyan;
}
/*  Backdrop 只有通过 dialog.showModal() 打开对话框时会被显示 */ [::backdrop](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::backdrop)
dialog::backdrop {
  background: rgba(255,0,0,.25);
}
```