# box-sizing
盒子模型包含标准盒模型(content-box)和IE盒模型(border-box)
## border-box
width/height = border + padding + content
## content-box
widith/height = content
## js获取盒子宽高
-  ```dom.style.width``` 只能取到行内样式的宽和高。style标签中和link外链的样式取不到
-  ```dom.currentStyle.width``` 可以取到渲染后的盒模型的宽高,仅支持IE
-  ```window.getComputedStyle(dom).width ```取得渲染后盒模型的宽高支持大部分浏览器，IE9以上支持
-  ```dom.getBooundingClientRect().width``` 在```getComputedStyle```基础上可以取到相对于视窗的上下左右的距离,根据视窗的距离去判断dom是否在视窗内，可以依据这个特性渲染viewport内的元素减少渲染的dom元素数量从而提升性能。

## 外边距重叠
普通文档流中两个垂直方向的盒子的外边距会发生重合，重合的部分取外边句较大的一方。
[](https://upload-images.jianshu.io/upload_images/79178-7f94accd5a09b830.png?imageMogr2/auto-orient/strip|imageView2/2/w/515/format/webp)
