# Animation

## keyframe[序列帧]
keyframe 有两种形式，from-to形式和百分比形式.
```css
@keyframe animation-name{
    from {
        transform:translateX(-10em);
    }
    to {
        transfrom:translateX(0em);
    }
}
@keyframes bounce {
    0% {
        transform: translateY(0);
    }
    20% {
        transform: translateY(-60px);
        rotate: (0deg);
    }
    25% {
        transform: translateY(20px);
        rotate: (0deg);
    }
    35% {
        transform: translateY(0px);
        rotate: (0deg);
    }
    60% {
        transform: translateY(-20px);
        rotate: (0deg);
    }
    100% {
        transform: translateY(-20px);
        rotate: (360deg);
    }
}
```
## animaton[动画]
Animation是如下子属性简写：
```css
.demo{
    animation: name duration timing-function delay iteration-count direction fill-mode
}
```
一个简单的例子：
```css
div {
    animation: fade 1s linear 2s;
}
@keyframe fade{
    from{
        transform:translateX(0em);
    }
    to{
        transform:translateX(-20em);
    }
}
```
- name keyframe的名称
- duration 动画持续的时间
- timing-function 动画的执行曲线
- delay 动画延迟多少s之后开始执行
- iteration-count 动画循环播放的次数
- direction 动画的方向：forward backward 
- fill-mode 属性规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式
  
### timing-funtion
动画曲线详细参考 [https://easings.net/](https://easings.net/)
- ease
- ease-in
- ease-out
- ease-in-out
  
### direction
- normal 正序播放序列帧
- reverse 动画将采用倒序的形式播放序列帧
- alternate 动画第一次循环将采用正序播放，后面都是倒序播放
- alternate-reverse 动画第一次采用倒序播放，后面都是正序播放
### fill-mode
fill-mode 有如下属性值：
- forwards:动画结束时目标元素将保持序列帧最后一个关键帧的样式
- backwards:目标元素将保持序列帧第一个关键帧的样式直到动画结束
- both:上述两个规则都保持
- initial:
- inherit:

# transform


## translate translateX translateY (平面上下位移) 参数可以是具体单位也可以是百分比
```css
.translate-single {
    width: 100px;
    height: 100px;
    background-color: aqua;
    transform: translate(100px);
    /* Equal to: translateX(100px) or translate(100px, 0) */
}

.translate-double {
    width: 100px;
    height: 100px;
    background-color: blue;
    transform: translate(100px, 100px);
}

.translate-y {
    width: 100px;
    height: 100px;
    background-color: blue;
    transform: translateY(50%);
}

```

## rotate 
```css
.rotate0{
    transform:rotate(0);
}
.rotate90{
    transform:rotate(90deg); /* Equal to rotateZ(90deg) */
}
.rotate-turn{
    transform:rotate(0.25turn);
}
.rotate-rad {
    transform:rotate(3.14rad);
}
```

## scale 
```css
.scal2{
    transform:scale(2);/* 物体放大（2x,2y）两倍 */
}
.scalx0.5{
    transform:scaleX(0.5);/* 物体宽缩小一倍（0.5x,1y） */
}
.scalx0.5{
    transform:scaleY(2);/* 物体高放大一倍（x,2y） */
}
```

## matrix:
matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY() )
```html
<div>Normal</div>
<div class="changed">Changed</div>
```
```css
div {
  width: 80px;
  height: 80px;
  background-color: skyblue;
}

.changed {
  transform: matrix(1, 2, -1, 1, 80, 80);/* matrix(scalX(1),skewX(2deg),skewY(-1deg),scalY(1),translateX(80),translateY(80))*/
  background-color: pink;
}
```

## skew 在x，y上的倾斜程度
skew(ax),skew(ax, ay)

# transation
