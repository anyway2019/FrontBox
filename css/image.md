# filter
- url :图片的相对路径
- blur:图像模糊效果
```css
.blur5{
    filter: blur(5px);
}
```
- contrast :对比度
- grayscale:灰度
- hue-rotate:色相旋转
- drop-shadow:阴影（与box-shadow的区别？drop-shadow为图片服务，可以让图片周围投上阴影而box-shadow给矩形的边投上阴影）
```css
.drop-shadow-image{
    filter: drop-shadow(16px 16px 20px red) invert(75%);
}
```
# background-position[背景图]
background-position 属性设置背景图像的起始位置。可以依据background-position属性来展现雪碧图中不同的icon. 

background-position:
- background-position-x
- background-position-y

```css
.bg-薯条 {
    width: 32px; height: 32px;
    background: url('css_sprites.png') -62px -10px;
}
.bg-珍珠奶茶 {
    width: 32px; height: 32px;
    background: url('css_sprites.png') -10px -62px;
}
.bg-可乐 {
    width: 32px; height: 32px;
    background: url('css_sprites.png') -10px -10px;
}
```
## [在线生成sprite](https://www.toptal.com/developers/css/sprite-generator)

background:
- background-attachment
- background-clip
- background-color
- background-image
- background-origin
- background-position-x
- background-position-y
- background-repeat-x
- background-repeat-y
- background-size