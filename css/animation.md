# Animation

## keyframe[序列帧]

keyframe 有两种形式，from-to 形式和百分比形式.

```css
@keyframe animation-name {
  from {
    transform: translateX(-10em);
  }
  to {
    transfrom: translateX(0em);
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

Animation 是如下子属性简写：

```css
.demo {
  animation: name duration timing-function delay iteration-count direction
    fill-mode;
}
```

一个简单的例子：

```css
div {
  animation: fade 1s linear 2s;
}
@keyframe fade {
  from {
    transform: translateX(0em);
  }
  to {
    transform: translateX(-20em);
  }
}
```

- name keyframe 的名称
- duration 动画持续的时间
- timing-function 动画的执行曲线
- delay 动画延迟多少 s 之后开始执行
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

# transform 形变+位移

transform 翻译成中文就是转换，转变包含了物体的形变和位移
形变和位移在数学中被表示为四元矩阵通常用来表示一个物体的位置和形变。

transform 的位移描述属性：translate 系列
transform 的形变描述属性：rotate 系列 scale 系列 skew 系列

而上述我提到的四元矩阵一般前三元 x,y,z 代表形变,最后一元代表物体的位移 w
在 css 中也有矩阵的概念：matrix
语法：matrix(scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY())

二位空间矩阵的表现形式：结合矩阵的乘法作用可求出物体在矩阵作用下的目标转换
a c tx
b d ty
0 0 1

三维空间矩阵的表现形式：
a c 0 tx
b d 0 ty
0 0 1 0
0 0 0 1

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
.rotate0 {
  transform: rotate(0);
}
.rotate90 {
  transform: rotate(90deg); /* Equal to rotateZ(90deg) */
}
.rotate-turn {
  transform: rotate(0.25turn);
}
.rotate-rad {
  transform: rotate(3.14rad);
}
```

## scale

```css
.scal2 {
  transform: scale(2); /* 物体放大（2x,2y）两倍 */
}
.scalx0.5 {
  transform: scaleX(0.5); /* 物体宽缩小一倍（0.5x,1y） */
}
.scalx0.5 {
  transform: scaleY(2); /* 物体高放大一倍（x,2y） */
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
  transform: matrix(
    1,
    2,
    -1,
    1,
    80,
    80
  ); /* matrix(scalX(1),skewX(2deg),skewY(-1deg),scalY(1),translateX(80),translateY(80))*/
  background-color: pink;
}
```

## skew 在 x，y 上的倾斜程度

skew(ax),skew(ax, ay)
单位：deg 读书 0-360 rad：弧度
//弧度的定义

- 弧长正好等于圆的半径时，两条射线的夹角为 1 弧度。

  角度转弧度 π/180*角度。 1rad = π/180
  弧度变角度 180/π*弧度。 1deg = 180/π

# transation 过渡

顾名思义描述一个元素两个状态之前的转换过程，是一个典型的有限状态机，着重体现了状态机中的过渡过程，
而状态的状态由其他的 css 属性决定
例如：

```
transation:margin-right 2s
```

miaohu 当 margin-right 发生变化时，用 2s 的线性动画完成状态的转换,包含如下属性：

- transition-property :需要过渡的属性,即你想通过动画的方式完成的状态变化

- transition-duration : 动画用时

- transition-delay:动画延时几秒播放

- transition-timing-function:动画曲线函数

```css
/* Apply to 1 property */
/* property name | duration */
transition: margin-right 4s;

/* property name | duration | delay */
transition: margin-right 4s 1s;

/* property name | duration | easing function */
transition: margin-right 4s ease-in-out;

/* property name | duration | easing function | delay */
transition: margin-right 4s ease-in-out 1s;
```
