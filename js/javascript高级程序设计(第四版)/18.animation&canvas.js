//18
//18.1 reqestAnimationFrame

//18.2 基本的画布功能
let panel = document.getElementById("panel");
let context;
if (panel.getContext) {
  //validate browser support canvas
  console.log("browser support canvas!");
  context = drawing.getContext("2d"); //获取2d绘画上下文
}

//18.3 2d绘画上下文

//18.3.1 填充和描边

//18.3.2 绘制矩形

//18.3.3 绘制路径
//arc(x,y,radius,startAngle,endAngle,couterclockwise)
//arcTo(x1,y1,x2,y2,radius)
//bezierCurveTo(c1x, c1y, c2x, c2y, x, y)
//lineTo(x,y) 绘制上一个点到x,y的直线
//moveTo(x,y) 绘制光标移动到x,y
//quadraticCurveTo()
//rect(x,y,width,height)以给定宽度和高度在坐标点(x, y)绘制一个矩形。这个方法
//与 strokeRect()和 fillRect()的区别在于，它创建的是一条路径，而不是独立的图形
//closePath()
//fill()
//stroke()
//clip()

//18.3.4 绘制文本
//font：以 CSS 语法指定的字体样式、大小、字体族等，比如"10px Arial"。
// textAlign：指定文本的对齐方式，可能的值包括"start"、 "end"、 "left"、 "right"和
//"center"。推荐使用"start"和"end"，不使用"left"和"right"，因为前者无论在从左到右
//书写的语言还是从右到左书写的语言中含义都更明确。
//textBaseLine ： 指 定 文 本 的 基 线 ， 可 能 的 值 包 括 "top" 、 "hanging" 、 "middle" 、
//"alphabetic"、"ideographic"和 "bottom"。

//18.3.5 变换
//rotate(angle) 围绕原点旋转angle度
//scale(scalex,scaley) 整体放大或缩小
//translate(x,y) 移动到（x,y）坐标
//transform() 通过矩阵乘法修改矩阵
//setTransform() 把矩阵重制后再用传入的参数调用transform
//save()
//restore()

//18.3.6 绘制图像
//drawImage(image, dx, dy)
//drawImage(image, dx, dy, dWidth, dHeight)
//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

//18.3.7 阴影
// shadowColor： CSS 颜色值，表示要绘制的阴影颜色，默认为黑色。
// shadowOffsetX：阴影相对于形状或路径的 x 坐标的偏移量，默认为 0。
// shadowOffsetY：阴影相对于形状或路径的 y 坐标的偏移量，默认为 0。
// shadowBlur：像素，表示阴影的模糊量。默认值为 0，表示不模糊。

//18.3.8 渐进
//context.createLinearGradient(sx,sy,ex,ey);
//context.createRadialGradient();

//18.3.9 图案

//18.3.10 图像数据 getImageData(x,y,width,height);
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d"),
    image = document.images[0],
    imageData,
    data,
    i,
    len,
    average,
    red,
    green,
    blue,
    alpha;
  // 绘制图像
  context.drawImage(image, 0, 0);
  // 取得图像数据
  imageData = context.getImageData(0, 0, image.width, image.height);
  data = imageData.data;
  for (i = 0, len = data.length; i < len; i += 4) {
    red = data[i];
    green = data[i + 1];
    blue = data[i + 2];
    alpha = data[i + 3];
    // 取得 RGB 平均值
    average = Math.floor((red + green + blue) / 3);
    // 设置颜色，不管透明度
    data[i] = average;
    data[i + 1] = average;
    data[i + 2] = average;
  }
  // 将修改后的数据写回 ImageData 并应用到画布上显示出来
  imageData.data = data;
  context.putImageData(imageData, 0, 0);
}
//18.3.11 合成
//context.createPattern();
//18.4 WebGL
//18.4.1 WebGL Context
let glContext = drawing.getContext("webgl");
