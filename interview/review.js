1.进程通信方式  //共享内存 信号量 管道 消息队列   
共享内存的优缺点
2.401： 凭证无效   402 ：Payment Required 跳过了  403 未授权禁止访问
3.301 302 
4.如何获取重定向后的url ：
检查返回的状态码是否为301
如果是就获取Header的Location的内容
转到就行了
head请求url获取返回头的location

Promise.reject(1)
.catch(err => {return err})
.then(e => {console.log(e)})
//2个栈实现队列
//[1,2,3,4,5]
for(let i=0;i<5;++i){
    head.push(num[i]);
    trail.
}
var queue = {
     head = [],
     trail = [],
    push:function(num){
        this.head.push(num);
    },
    peek:function(){
        this.trail.push(this.head.pop());
        return this.trail.pop();
    }
}

//[0,1,2,4,5,7,13,15,16] => 0,1,2  4,5 7 ,15,16
var range = function(nums){
    let res=[];
    let arr = [nums[0]];
   for(let i=1;i<nums.length;++i){
        let cur = arr[arr.length-1];
        if(cur+1 === nums[i]){
            arr.push(nums[i]);
        }else{
            res.push(arr);
            arr = [nums[i]];
        }
   }
   if(arr.length){
       res.push(arr);
   }
   return res;
}
//捕获和冒泡是怎么设置的？addeventListener的第三个参数除了设置事件流还能写什么？
async function async1() {
    console.log('async1 start'); //2
    await async2(); 
    console.log('async1 end'); //6
    async function async2() {
        console.log('async2'); //3 
    }
}

console.log('script start'); //1

setTimeout(function () {
    console.log('setTimeout');//8
}, 0);

async1(); 

new Promise(function (resolve) {
    console.log('promise1'); //4
    resolve();
}).then(function () {
    console.log('promise2'); // 7
});
console.log('script end'); //5


//udp在浏览器中的作用  #dns域名解析时用的是udp

手撕函数柯里化。
var curry = function(fn){
    const len = this.length;
    let args = [].slice.call(arguments,1);
    return function(){
        let subargs = [].slice.call(arguments);
        let _args = [...args,...subargs];
        if(_args.length < len){
            return curry(fn,_args);
        }else{
            fn.apply(this,_args);
        }
    }
}


function curry(fn, args) {
    var length = fn.length;

    args = args || [];

    return function() {

        var _args = args.slice(0),

            arg, i;

        for (i = 0; i < arguments.length; i++) {

            arg = arguments[i];

            _args.push(arg);

        }
        if (_args.length < length) {
            return curry.call(this, fn, _args);
        }
        else {
            return fn.apply(this, _args);
        }
    }
}

手写寄生组合式继承（一次手撕三个，不愧是字节）

function object(o){
    function f(){};
    f.prototype = o;
    return new f();
}
function prototype(sub,parent){
    let prototype = object(parent.prototype);
    prototype.constuctor = sub;
    sub.prototype = prototype;
}

function prototype(sub,parent){
    var obj = Object.create(parent.prototype);
    obj.constuctor = sub;
    sub.prototype = obj;
}




    // function object(o) {
    //     function F() {}
    //     F.prototype = o;
    //     return new F();
    // }

    // function prototype(child, parent) {
    //     var prototype = object(parent.prototype);
    //     prototype.constructor = child;
    //     child.prototype = prototype;
    // }
作用域和作用域链  5min

垂直水平居中 如果元素未知宽高？  5min
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

伪代码实现下懒加载  5min

基于渲染机制可以提出哪些优化点（说实话听不太懂），后来举例说怎么提高首屏时间，首屏时间怎么计算  30min



1.js数据类型，bigint是啥，为什么有这个类型，
bigint是大整数，味蕾饿解决大数的表示 一般n结尾的数就是bigint
number范围，
(-2^53, 2^53)范围内，开区间
浮点数怎么储存的。

数字类型采用64位浮点数表示，从最左边开始：
    第1位： 符号位，0表示正数，1表示负数 (1位)
    第2位到第12位： 储存指数部分 (11位)
    第13位到第64位：储存小数部分（即有效数字 52位）

如何解决精度问题？
    乘以10的n次方，再除10的n次方

DOM, BOM, js的关系 
    bom浏览器接口 DOM 文档树 js
Flex布局（flex：1 flex：auto区别） 
    flex: auto 等同于 flex: 1 1 auto flex: 1 或者 flex: 2 等等。它相当于flex: 1 1 0
递归跟迭代有什么差别 v
    递归需要执行栈而迭代时将上一次的计算参与下一次计算还是在函数内部完成
    而且递归存在计算浪费
    迭代可以保留上次计算
    递归容易栈溢出

如何给图片设置一个兜底图 onerror 回调设置
utf-8 编码 -> 常见的汉字字符占几个字节  少数是汉字每个占用3个字节，多数占用4个字节。

浏览器解析HTML的过程。
 html  解析dom树  css 解析成 cssom  然后js参与 cssom与dom合成 布局树，然后布局树进行绘制和渲染。

//跨域
简单请求和复杂请求   10min
//TODO:
有遇到过跨域问题吗，讲讲。说了cors怎么配置，问的特别细没怎么看过直接寄，还问了jsonp说不太了解

jsonP原理：通过script的src实现跨域 只支持get方法，通过将前端方法作为参数传送给服务器，然后由服务器注入参数之后再返回，
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

cookie、localStorage、sessionStorage  5min
cookie

TODO:

不同域名如何共享cookie//  设置domain为他们的父域名


前端路由 
     hash /history  5min  *** 
     HashChangeEven  go back forward history的

实现一个tab组件  5min

外边距塌陷产生的原因 -> 如何解决  5min

//vue  1h
vue 的组件demo

组件封装有哪些原则？ 关煮点分离  10min ***

说一下vue组件的有哪些通信方式？  ***
    父组件-》自组件 props
    自组件到父组件  event 实际上是自组件发送数据给父组件
    eventbus：
        实现方式：cosnt bus = new vue()
    $attrs/$listeners:?

    $parent / $children　＆ ref

    provide/inject 

    eventbus了解过么？ 实现原理

    和vuex从原理上有什么区别？


keep-alive和transition嵌套区别 transition嵌套是删除或者添加dom 而keep-live是缓存组件

讲讲computed、watch、filter的使用区别

computed数据改变后是立即渲染吗，确定是懒计算吗
    至此，并没有去计算computed中最新的值，而只是把watcher中的dirty设为true，
    当下次访问这个computed属性时，就会重新计算这个值
    从我分析来看，当我在改变data中的值时，我此时并没有更新computed中的值，
    而我需要访问computed中的属性时才会更新。

watch主要是用在什么地方：
    异步任务

prop和data有什么区别，prop会被observer双向绑定吗 

如果修改props页面会展示修改后的结果吗，会有什么警
如果props是基本类型修改会报警告，页面没有效果 如果是数组或者对象修改会影响到父组件的状态。

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

如果有一个非常复杂的组件，下面有很多组件，怎么确保observer渲染的顺序和watch只会加载一次？

前端鉴权 jwt  session  oauth

vue的内置组件


vue 具名插槽slots、scoped-slots ****
slot的编译作用域：
父模版中的所有内容都是在腹肌作用域编译的
子模版里的所有内容都是在子作用域编译的

slot的后备内容

插槽内容如何访问自组件内容？-》作用域插槽

<slot :user={user}>
    {{user.name}}
</slot>

父组件调用

<sub>
<template v-slot:default='slopProps'>{{slopProps.user.name}}</template>
</sub>

内部原理：
将插槽内容包裹在一个函数里面，函数传惨就是自组件的数据


具名插槽slots
<slot name='heard'></slot>  name属性默认 ‘default’
外部调用的时候用使用v-slot：header 或者#header


filter 的原理就是 洋葱函数
在render函数中对应的值🈶️包裹了一个函数 洋葱函数


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

websocket 的握手过程  5min
 TCP用塞控制 慢启动 快回复  快重传

描述一下https，加密过程，证书问题SSL  20 min
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

作者：中年抠脚程序猿
链接：https://www.nowcoder.com/discuss/821833?type=post&order=create&pos=&page=1&ncTraceId=&channel=-1&source_id=search_post_nctrack&gio_id=B99A933A3491E2F565CD33599678B438-1648050977852
来源：牛客网

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


const address = [
    {
      addressId: 1,
      addressName: '北京市',
      subDistrict: [
        {
          addressId: 11,
          addressName: '海淀区',
          subDistrict: [
            {
              addressId: 111,
              addressName: '中关村',
            },
          ],
        },
        {
          addressId: 12,
          addressName: '朝阳区',
        },
      ],
    },
    {
      addressId: 2,
      addressName: '河北省',
    },
  ];
  
function convert(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      let newObj = {};
      for (const key in obj) {
        const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        if (Array.isArray(obj[key])) {
          newObj[newKey] = convert(obj[key]);
        } else {
          newObj[newKey] = obj[key];
        }
      }
      newArr.push(newObj);
    }
    return newArr;
  }