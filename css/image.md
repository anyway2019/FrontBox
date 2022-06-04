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