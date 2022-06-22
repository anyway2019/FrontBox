# @font-face
```local()```函数可以指定用户本地的字体文件，如果用户本地没有找到该字体文件就将使用```url()```下载相关字体文件
```css
@font-face {
  font-family: "Open Sans";
  src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
       url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
}
body{
    font-family:'Open Sans'
}
```
用到了用户本地字体"Helvetica Neue Bold"的备份；如果当前用户 (浏览器) 未安装该字体 (两种可能的字体名都已经试过)，就会用下载的字体"MgOpenModernaBold.ttf"来代替：
```css
@font-face {
  font-family: MyHelvetica;
  src: local("Helvetica Neue Bold"),
  local("HelveticaNeue-Bold"),
  url(MgOpenModernaBold.ttf);
  font-weight: bold;
}
```
@font-face的属性：
- font-family
- src:可以指定多个字体来源,直到找到第一个有效的字体
- font-style:
- font-display:
- font-weight:
- unicode-rang:指定unicode字体范围

这个例子新定义了一个字体，正常粗细的字采用字体 Times New Roman，粗体字采用 Consolas。
```css
@font-face {
    font-family: myFirstFont;
    src: local("Times New Roman");
    font-weight:normal;
}

@font-face {
    font-family: myFirstFont;
    src: local(Consolas);
    font-weight:bold;
}
```
# font-display
font-display属性用于控制浏览器在下载字体时的渲染行为。

font-display可以取以下值:
- font-display: block 这是浏览器的默认行为，即打开阻塞期。
- font-display: swap 这个值会关闭阻塞期，直接进入替换期，即浏览器不会出现文字显示不出来的情况。
- font-display: fallback 这个值设置阻塞期的长度是100毫秒，即文字有100毫秒显示不出来，然后立即进入替换期。等到字体下载结束，再使用下载的字体渲染。
- font-display: optional 这个值设置阻塞期也是100毫秒。然后，等到100毫秒结束，浏览器发现字体已经下载完成，就使用下载的字体渲染，否则就不再下载，永久性使用替代字体渲染。它主要用于网速较慢的环境，不让用户长时间等到字体下载。

一般来说，正常情况下都推荐使用```font-display:optional```。如果是图标字体等没有替代字体的情况下，可以使用```font-display: block```。
# font-size
设置网页字体大小,相关单位有px em rem
- em em是一种相对单位，1em等于当前元素的font-size。一般来说，浏览器默认的字体大小是16像素，所以1em默认等于16像素。
- rem rem单位与em几乎完全一致，只有一个差异，它总是等于根元素<html>的font-size大小，与当前元素或父元素的设置无关，这就避免了em的缺陷。
```css
html{
    font-size:16px;
}
```

```css
button {
    font-size: 0.875rem;
    // All the internal/external value use in 'em'
    // This value use of your "font-size" as the basic font size
    // And you will not have any problem with the font size of the container ( Example bottom )
    padding: .5em 1em;
    border: .125em solid #e3e3e3;
    @media (min-width: 48rem){ // min-width: 768px
      font-size: 1.125rem;
    }
    @media (min-width: 62rem){ // min-width: 992px
      font-size: 1.375rem;
    }
}
```

# 参考文档
- [https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face)
- [https://font-display.glitch.me/](https://font-display.glitch.me/)