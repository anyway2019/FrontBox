# text-overflow:ellipsis [文本省略]
## single-line ellipsis
```css
.single-line-text{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
```

## multi-line ellipsis
```css
.multi-line-text{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;//
    -webkit-line-clamp:2;//
    -webkit-box-orient: vertical;//
}
```
## float multi-line ellipsis
[float 实现多行省略文本]([url](https://www.jianshu.com/p/3bce7924a466))

# direction [文本阅读方向]
```css
.text-direction{
    direction:rtl;//default：ltr 从左往右 rtl 从右向左
}
```
Equals to
```html
<p dir="rtl">text right to left</p>
```
# text-align [文本对齐方式]
```css
.text-left{
    text-align:left;//left right center justify start end inherit
}
```
- left:左对齐
- rigjt:右对齐
- center:居中对齐
- justify:两端对齐，最后一行是做对齐
- inherit:继承父元素的值
- start:direction熟悉ltr左对齐，否则右对齐
- end:与上述相反
# vertical-align [文本垂直对齐方式]
常见的垂直居中
```css
.text-vertical{
    vertical-align:middle;
}
```
- baseline:默认值，对齐父元素的基线（[什么是基线？](https://zhuanlan.zhihu.com/p/30169829)）
- top:
- bottom:
- middle:
- text-top:
- text-bottom:
- sub:垂直对齐文本的下标志
- super:垂直对齐文本的上标志
- length:升高或降低特定的长度，可使用负值
- %:使用line-height属性的百分比来排列词元素（w3c说明不使用负值，在谷歌浏览器实际操作是可以为负数）
- inherit:

##  reference : [w3school-vertical-align](https://www.w3school.com.cn/cssref/pr_pos_vertical-align.asp)
# word wrap
```css
.wordwrap{
    word-wrap:break-word;
}
```
- normal
- break-word
# word break
```css
.wordbreak{
    word-break:keep-all;
}
```
- normal
- break-all
- keep-all
# hyphens[连词器]   
```css
.hy{
    hyphens:manual;
}
```
- none
- manual
- auto
  
[Example](https://www.w3school.com.cn/tiy/t.asp?f=cssref_hyphens)

