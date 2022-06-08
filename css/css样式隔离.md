# 样式隔离
## WHAT 什么是css样式隔离？

    css样式隔离就是通过给css样式起不同的名字以达到css样式本地化作用域(css样式本身并不具备本地作用域，所有的样式都是全局的)。

## WHY 为什么要css样式隔离？
    
    css样式隔离主要解决一个问题就是css样式全局污染的问题。当不通页面的css样式中都存在一个 .title 的css样式将会出现样式叠,这个问题在spa以及团队协作十分突出，不同的开发人员在自己的环境给样式起名可能在本地环境中没有问题，但是当代码合并之后就可能会出现样式问题。

## HOW 如何隔离css样式？
- BEM
- CSS MOUDLE
- 预处理器 (sass/less)
- CSS IN JS
- Shadow DOM
- Vue Scoped
## BEM
    be:block-elemt-modifier 块名+元素名+修饰符例如:.drop_menu__item-active
    约定css的命名方式方便维护,避免了css的命名冲突。
    但是BEM的命名会比较长，导致css文件体积相对较大，一般可以采用这种思想根据团队或者项目实际情况制定一定的规则命名。
    (命名长体积大的问题其实可以通过gzip解决，命名长但是阅读性上有一定优势)。
## CSS MOUDULE
### 什么是模块化？
####    
    css模块化就像其他语言的包或库的概念，将某个页面或者模块的样式封装一个css模块(包)。
### 为什么模块化？
#### 
    模块化可以避免模块内的样式被污染，并且熟悉模块化的人都知道模块最大的好处就是可以复用，甚至方便后代码分割，按需引用，需要某个模块的时候只需要引入对应模块的相关文件即可，这样大大减少了项目体积，也减少了浏览器的负担。
### 如何模块化？
#### 
    css模块化并不是官方标准，也不是浏览器特性。css模块化是采用webpack这样构建工具在项目构建时采用css-loader这类插件。
    
    优点：绝对无样式污染的问题，学习成本低
    
    缺点：代码可读性差，hash值不方便debug，没有变量，通常需要使用less等预处理器，
        写法没有传统的开发流程方便，且会频繁的输入styles.** (如何解决这里的问题：react-css-modules 通过高阶函数的形式避免重复输入style.**)

## CSS IN JS
    css 采用js创建，写在组件内部，所以天然不会有样式污染的问题。
    常见的使用场景：react-native react 
    和传统的关注点分类的思想正好相反，css和js都混合在组件内部，实现了组件隔离，使用者不需要关注组件的内部实现，减少了组件之间的偶尔耦合，方便复用。
css in js的实现方式：
  - 最简单的实现方式就是内联样式(将js构建的css对象解析后插入内敛样式中，例如：<strong>radium</strong>)
  - 还有一种实现方式就是唯一css选择器(将js构建的样式解析成全局唯一的选择器，并插入到head标签内，例如：<strong>[style-component](https://github.com/styled-components/styled-components)</strong>)

style-component example from github（style-component 同时支持react-native 但是在react-native使用方式类似于radium的example)
```js
import React from 'react';

import styled from 'styled-components';

// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// Use them like any other React component – except they're styled!
<Wrapper>
  <Title>Hello World, this is my first styled component!</Title>
</Wrapper>
```
radium example from github:
```js
import Radium from 'radium';
import React from 'react';
import color from 'color';

class Button extends React.Component {
  static propTypes = {
    kind: PropTypes.oneOf(['primary', 'warning']).isRequired
  };

  render() {
    // Radium extends the style attribute to accept an array. It will merge
    // the styles in order. We use this feature here to apply the primary
    // or warning styles depending on the value of the `kind` prop. Since its
    // all just JavaScript, you can use whatever logic you want to decide which
    // styles are applied (props, state, context, etc).
    return (
      <button style={[styles.base, styles[this.props.kind]]}>
        {this.props.children}
      </button>
    );
  }
}

Button = Radium(Button);

// You can create your style objects dynamically or share them for
// every instance of the component.
var styles = {
  base: {
    color: '#fff',

    // Adding interactive state couldn't be easier! Add a special key to your
    // style object (:hover, :focus, :active, or @media) with the additional rules.
    ':hover': {
      background: color('#0074d9')
        .lighten(0.2)
        .hexString()
    }
  },

  primary: {
    background: '#0074D9'
  },

  warning: {
    background: '#FF4136'
  }
};
```
## css in js的优点：
    css样式本地化，不会有无用的样式堆积，基于状态的样式使用js实现更简单。
## 其缺点：
    需要运行时将js解析成css，有一定的性能损耗，尤其对首页加载速度有一定影响，有一定的学习成本，不能结合预处理器less/sass/post css ，处理伪类复杂
## 预处理
### 什么是与处理器
简单理解预处理器就是在css语言的基础封装一层的’高级语言‘,通预处理器程序可以将这种高级语言编辑成标准的css语言，类似于 typescript 于javascript的关系。
### 为什么使用预处理器？
预处理器对应的高级语言有css没有的高级特性，可以更方便构建结构更加易读的样式文件。一般预处理器有如下特性：
-  支持嵌套
-  支持继承
-  支持样式混入
### 如何使用预处理器

- [less](https://less.bootcss.com/)
- [sass](https://sass-lang.com/)
- [postcss](https://postcss.org/)

## SHAOW DOM [微前端]

## Vue Scoped
Vue scoped实现原理:通过postcss将样式转换成本地作用域。且父组件的样式不会渗透到子组件中。但是父组件的样式会影响子组件的根结点，同时这个根结点也受子组件的scoped 样式影响。
```html
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```
postcss转化成：（属性选择器来保证局部作用域)
```html
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
````
如何让父组件影响到子组件呢？
使用 >>> 直接后代选择器影响到子组件。
``` html
<style scoped>
.a >>> .b { /* ... */ }
</style>
```
postcss转化成
```html
.a[data-v-f3f3eg9] .b { /* ... */ }
```
有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名
##  [参考](https://juejin.cn/post/7064246166396862477)
   

