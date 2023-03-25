# react fiber
    实现策略主要是将react 元素的执行栈转化成链表，这样就保存执行上下文。链表移动更好可以随时暂停，
    不用重新递归生成上下文
    使用requestIdleCallBack限制任务进行的最长时间。
    核心：将以前的react树转化成链表，
    使用requeIdleCallBack分批执行，限制任务的最大执行时间。
    react 自己实现了 requestIdleCallback（）

# 其他优化手段：
    1.批量更新： 将虚拟don转化成fiber节点，然后规定一定时间内可以更新多少个firber节点 将fiber node的处理 oush到一个处理队列然后 包裹transation一次性更新，后面node改动标记为dirty 等待下次批量更新
    2.深度优先遍历 ：当前阶段如果有child一直找child 如果没有child 就找兄弟 如果兄弟节点没有就回到父节点。重新开始次偶成
    3.alternative 执行的时候如果遇到粗欧文就回退到master分支。
    4.生命周期分为render 和commit render阶段主要是用来处理node commit阶段处理sideEffect
    5.任务系统：
    updateFiberAndView位于一个requestIdleCallback，留给它的时间有限，因此不能做太多事情。所以有些事情可以标记一下，留给commit阶段做。于是就有了一个任务系统。

    render阶段新增了一个 getDerivedStateFromProps 返回一个对象静态方法会帮你setState，静态方法避免多次setState
    或者ref调用dom树打断dfs过程。

    commit阶段曾姐了一个getSnapShotBeforeUpdate 可以在更新前获取当前的dom
    render 阶段做什么？纯净没有副作用 可能会被react暂停或者重新启动
    commit做什么？ 可以使用dom，运行副作用，安排下一次更新



# react diff
    - tree diff  同一层比较时间复杂度是O(n);
    传统的时间复杂度是o（n3）
    如果当前节点不一样，则当前节点的子树将被整体替换。

    - 组件diff：
    针对同类型的组件，按照树的策略比较
    不同类型的组件直接替换。
    同一类型的组件下面的节点基本没有变化 可以使用shouldComponentUpdate来控制他不要进行遍历，以达到优化的目的

    元素diff 不足的地方是什么？ 当末尾的节点移动到首位的时候，其他所有节点都需要跟着移动，性能比较差，可以用链表去优化
    insert
    1.reorder
    3.remve

    react hooks
    react 性能优化：


    vue-keepLive
    vue-slot

    暂停
    vue-diff：
    tree 算法比较节点不同时，只会进行同层节点的比较，不会跨层进行比较，这也大大减少了算法复杂度。


    作用域和作用域链  5min

#  垂直水平居中 如果元素未知宽高？
.box{
    position:relative;
    width:100px;
    height:100px;
}
.content{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);//margin:-50px 0 0 -50px;
}
//模态
.box{
    position:relative;
    width:100px;
    height:100px;
}
。content{
    width:50px;
    height:50px;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;

}
# FLOAT
```
0.1 + 0.2 不等于 0.3 的原因 -> 还追问了我小数如何转二进制
我们会用 1 位存储 S，0 表示正数，1 表示负数。

用 11 位存储 E + bias，对于 11 位来说，bias 的值是 2^(11-1) - 1，也就是 1023。

用 52 位存储 Fraction。

0.1 = a * 2^-1 + b * 2^-2 + c * 2^-3 + d * 2^-4 + ...

0 + 0.2 = a * 2^0 + b * 2^-1 + c * 2^-2 + ...   (a = 0)
0 + 0.4 = b * 2^0 + c * 2^-1 + d * 2^-2 + ...   (b = 0)
0 + 0.8 = c * 2^0 + d * 2^-1 + e * 2^-2 + ...   (c = 0)
1 + 0.6 = d * 2^0 + e * 2^-1 + f * 2^-2 + ...   (d = 1)
1 + 0.2 = e * 2^0 + f * 2^-1 + g * 2^-2 + ...   (e = 1)
0 + 0.4 = f * 2^0 + g * 2^-1 + h * 2^-2 + ...   (f = 0)
0 + 0.8 = g * 2^0 + h * 2^-1 + i * 2^-2 + ...   (g = 0)
1 + 0.6 = h * 2^0 + i * 2^-1 + j * 2^-2 + ...   (h = 1)
....
```
# 伪代码实现下懒加载  5min

# 基于渲染机制可以提出哪些优化点（后来举例说怎么提高首屏时间，首屏时间怎么计算
# 1.js数据类型，bigint是啥，为什么有这个类型，
# bigint是大整数，味蕾饿解决大数的表示 一般n结尾的数就是bigint
# number范围，
# (-2^53, 2^53)范围内，开区间
浮点数怎么储存的。

# 数字类型采用64位浮点数表示，从最左边开始：
    第1位： 符号位，0表示正数，1表示负数 (1位)
    第2位到第12位： 储存指数部分 (11位)
    第13位到第64位：储存小数部分（即有效数字 52位）

# 如何解决精度问题？
    乘以10的n次方，再除10的n次方

# DOM, BOM, js的关系 
    bom浏览器接口 DOM 文档树 js
# Flex布局（flex：1 flex：auto区别） 
    flex: auto 等同于 flex: 1 1 auto flex: 1 或者 flex: 2 等等。它相当于flex: 1 1 0
# 递归跟迭代有什么差别 v
    递归需要执行栈而迭代时将上一次的计算参与下一次计算还是在函数内部完成
    而且递归存在计算浪费
    迭代可以保留上次计算
    递归容易栈溢出

#  如何给图片设置一个兜底图 onerror 回调设置
utf-8 编码 -> 常见的汉字字符占几个字节  少数是汉字每个占用3个字节，多数占用4个字节。

浏览器解析HTML的过程。
 html  解析dom树  css 解析成 cssom  然后js参与 cssom与dom合成 布局树，然后布局树进行绘制和渲染。

//跨域
简单请求和复杂请求   10min
//TODO:
有遇到过跨域问题吗，讲讲。说了cors怎么配置，问的特别细没怎么看过直接寄，还问了jsonp说不太了解

# jsonP原理：通过script的src实现跨域 只支持get方法，通过将前端方法作为参数传送给服务器，然后由服务器注入参数之后再返回，
实现服务器端向客户端通信。
简单实现：
function jsonp(request){
    let container = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.src = request.url+"?callback="+request.calllback.name;
    container.appendChild(script);
}
function callback(e){
    console.log(e)
}
jsonp({url,callback:callback})

# cookie、localStorage、sessionStorage  5min


# 不同域名如何共享cookie//  设置domain为他们的父域名


# 前端路由 
     hash /history  
     HashChangeEven  go back forward history

# 实现一个tab组件  5min

# 外边距塌陷产生的原因 -> 如何解决 

# 组件封装有哪些原则？ 关注点分离

# 说一下vue组件的有哪些通信方式？  ***
    父组件-》自组件 props
    自组件到父组件  event 实际上是自组件发送数据给父组件
    eventbus：
        实现方式：cosnt bus = new vue()
    $attrs/$listeners:?

    $parent / $children　＆ ref

    provide/inject 

    eventbus了解过么？ 实现原理

    和vuex从原理上有什么区别？



# keep-alive和transition嵌套区别 transition嵌套是删除或者添加dom 而keep-live是缓存组件

# 讲讲computed、watch、filter的使用区别

# computed数据改变后是立即渲染吗，确定是懒计算吗
    至此，并没有去计算computed中最新的值，而只是把watcher中的dirty设为true，
    当下次访问这个computed属性时，就会重新计算这个值
    从我分析来看，当我在改变data中的值时，我此时并没有更新computed中的值，
    而我需要访问computed中的属性时才会更新。

# watch主要是用在什么地方：
    异步任务

# prop和data有什么区别，prop会被observer双向绑定吗 

# 如果修改props页面会展示修改后的结果吗，会有什么警
# 如果props是基本类型修改会报警告，页面没有效果 如果是数组或者对象修改会影响到父组件的状态。
```
prop:{
    type：Object， 属性类型
    props:默认值
    default:function(){
        return {message:'hello'};
    }
    验证
    validator:function(){
        return false;
    }
}
```
# 如果有一个非常复杂的组件，下面有很多组件，怎么确保observer渲染的顺序和watch只会加载一次？

# 前端鉴权 jwt  session  oauth

# vue的内置组件
vue 具名插槽slots、scoped-slots
slot的编译作用域：
父模版中的所有内容都是在腹肌作用域编译的
子模版里的所有内容都是在子作用域编译的
slot的后备内容
# 插槽内容如何访问自组件内容？-》作用域插槽
```
<slot :user={user}>
    {{user.name}}
</slot>
```
# 父组件调用
<sub>
<template v-slot:default='slopProps'>{{slopProps.user.name}}</template>
</sub>

内部原理：
将插槽内容包裹在一个函数里面，函数传惨就是自组件的数据

具名插槽slots
<slot name='heard'></slot>  name属性默认 ‘default’
外部调用的时候用使用v-slot：header 或者#header


# filter 的原理就是 洋葱函数
在render函数中对应的值包裹了一个函数 洋葱函数

promise async&await

promise状态转变机制

//react  30min
hook 为什么不能用if else  因为hooks本身由数组或者链表存储的如果使用if等会打乱hook的调用顺序
如何避免hooks闭包陷阱 ，使用useRef 只要是对象就可以了
讲一下React Fiber
React diff算法中用key比较的过程  

用React写一个计数器，每过1s加1

//模块化 与工程化
import require区别  5min
CommonJS的export 5min
es6和commonJS模块管理的区别 5min

//网络
// 7. 缓存我谈到了CDN -> CDN的作用 ,CDN为什么快
// 8. CDN和DNS之间的关系
// 刚才说到cdn实际上是一个就近访问，那么现在有一个问题是，我们怎么知道用户的所在位置从而给他分配最佳的cdn节点呢。这就需要dns服务来进行定位了
// 浏览器输入url之后，首先会到哪里 DNS 缓存拿ip v
如何判断 ip 地址是哪类( A类，B类，C类这种  5min 1-126 a 类 128 -191 b类 192 - 223 c类  224 - 239 d类

websocket 的握手过程  
 TCP用塞控制 慢启动 快回复  快重传

描述一下https，加密过程，证书问题SSL  
https ca 包含组织信息 个人信息 公钥 有效期  包含一个签名
ca的私钥对信息摘要进行加密，秘闻即签名

rem, 计算出375的屏幕，1rem,单位出现小数怎么处理  @media screen and (max-wid)
表明浏览器在处理小数像素的时候并不是直接舍入处理的，元素依旧占据着应有的空间，只是在计算元素尺寸的时候做了舍入处理。

rem和vw的使用场景  移动端适配


第一向，改变数据时通知视图更新v-bind:value="val" 。这一步也就是vue响应式的原理。

vue遍历data中所有的属性，挂在this下，使用Object.defineProperty给每一个属性都注册getter，setter。
get用来收集依赖，set用来执行notify，发布更新事件。
每个属性创建一个Dep对象，作为订阅发布模式的中间机构来收集依赖
mount阶段的updateComponent会new Watcher()，每一个Watcher对应一个vue component，调用组件的render函数。
若没有render函数，会执行模板编译过程，生成render函数。render函数执行时，会访问定义在模板里的各属性，会触发之前定义的get，收集依赖，将当前的Watcher注册到dep当中，dep.depend()。
模板里没写this是因为渲染函数外面套了一层with(this){//....}
当data中属性变化时，触发set方法，执行dep.notify()，通知所有的Watcher调用update函数更新
update添加进队列，在下一个promise.then中执行队列中的更新任务
再经过dom diff，渲染页面
第二向，视图改变时通知数据更新v-on:input="val = $event.target.value"。

通过监听表单元素的input事件，从而通知数据更新。

vue遍历data中所有的属性，挂在this下，使用Object.defineProperty给每一个属性都注册getter，setter。
get用来收集依赖，set用来执行notify，发布更新事件。
每个属性创建一个Dep对象，作为订阅发布模式的中间机构来收集依赖
mount阶段的updateComponent会new Watcher()，每一个Watcher对应一个vue component，调用组件的render函数。
若没有render函数，会执行模板编译过程，生成render函数。render函数执行时，会访问定义在模板里的各属性，会触发之前定义的get，收集依赖，将当前的Watcher注册到dep当中，dep.depend()。
模板里没写this是因为渲染函数外面套了一层with(this){//....}
当data中属性变化时，触发set方法，执行dep.notify()，通知所有的Watcher调用update函数更新
update添加进队列，在下一个promise.then中执行队列中的更新任务
再经过dom diff，渲染页面
第二向，视图改变时通知数据更新v-on:input="val = $event.target.value"。

通过监听表单元素的input事件，从而通知数据更新。

//udp在浏览器中的作用  #dns域名解析时用的是udp

1.进程通信方式  //共享内存 信号量 管道 消息队列   
共享内存的优缺点
2.401： 凭证无效   402 ：Payment Required 跳过了  403 未授权禁止访问
3.301 302 
4.如何获取重定向后的url ：
检查返回的状态码是否为301
如果是就获取Header的Location的内容
转到就行了
head请求url获取返回头的location

//websocket
长链接 全双工通信， 实时通信，
首次握手是通过http协议完成祸首成功后升级到ws协议，此后进行双向通信解决了原始的客户端轮询的资源浪费问题。

//2.事件模型 dom 
事件代理：
好处：1.只要定义一个监听函数，就能处理多个子节点的事件，而不用在每个<li>节点上定义监听函数。
2.以后再添加子节点，监听函数依然有效
如何停止传播？
 e.stopPropagation();停止向下传播// 只是停止当前监听函数的，而不腻停止元素的其他事件监听函数
 e.stopImmediatePropagation()//停该元素所有监听函数的触发
 stopImmediatePropagation方法可以彻底阻止这个事件传播，使得后面绑定的所有click监听函数都不再触发。

事件传播
事件代理
事件对象属性
事件对象实例方法
CustomEvent使用

//3.dom  cssom构建过程 #      
渲染进程和网络进程共同合作，网络进程将获取的字节流传输到管道上，渲染进程取出一部分文件进行解析
html文档-》分词器 ——》node-》dom
通过分词器将字节流转换为 Token。 token  生成DOM 节点并构建dom树


js文件对DOM树产生的影响（白屏）以及解决方案（首次加载白屏的解决方案）：
    解析js文件需要下载js文件，js文件下载后需要执行 这些动作都会做是dom树的生成阻塞，
解决方案：
1.加快js文件下载速度，使用cdn加载，
2.js文件改成有异步加载的方式（前提是js没有dom操作使用defer和async）
3.减少js文件的体积（treeshaking/uglify）
//4.osi七层 4层 ping tcp udp    
七层                    

应用层
表示层
会话层
传输层
网络层
数据链路层
物理层

4层
应用层 stmp ftp dns http telnet smtp ping 
传输层 tcp udp
网络层IP icmp
数据链路层
每一层的作用？  


ping 127.0.0.1 检测本地连通性能否与其他机器交换数据

// 垂直居中   
方法一：
.container{
    display:flex;
    justify-content:center;
    align-item:center;
}
.content{
    width:100px;
    height:100px;
}
方法二：
.container{
    position:relative;
}
.content{
    position:absolute;
    width:100px;
    height:100px;
    margin: auto;
}
//8.圣杯 双飞翼  15min

//6.快速排序

//5.http get put post head option(跨域预检)

//get和post区别

//post与put的区别

状态码：100 200 300 400 500
1；
2；
3
4
5
6



// 闭包原理与作用
闭包的作用：
1.访问函数内部变量
2.让变量保存在内存中，即使外部函数已经能执行栈弹出。

闭包的原理：
作用域链：产生过程是怎么样的？
函数执行的时创建执行上下文，

====10.30===

//react 合成事件

//状态码 20min  401 402 301 302 如何获取重定向后的url

//7.跨域 jsonp 

//前端优化 浏览器解析过程 

前端优化：

//无限列表原码阅读 30 min
通过padding设置模拟滚动
然后通过高度计算找到对应的index做替换

//设计模式（装饰者  观察者 策略模式） 

//xss  //csrf  cookie samesit:strict lax none

//立即执行函数的作用以及使用场景：
//避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。
//定义私有变量，外界函数不能修改这个变量
//递归执行
