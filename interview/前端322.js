// * 输入：'http://sample.com/?a=1&e&b=2&c=xx&d#hash' 
// * 输出：{a: 1, b: 2, c: 'xx', d: ''}  

var parseUrl = function(url){
    const arr = url.split('?');
    const query = arr[1].split('#')[0];
    const params = query.split('&')

    let obj = Object.create(null);

    params.forEach((v)=>{
        const kv = v.indexOf('=') !== -1 && v.split('=');
        const key = kv[0];
        const value = kv[1] || true;
        obj[key] = value;
    });
    console.log(obj);
    return obj;
}

// * 
// * 输入：
// * `Accept-Ranges: bytes 
// * Cache-Control: max-age=6000, public
// * Connection: keep-alive
// * Content-Type: application/javascript`
// * 输出：
// * {
// *   "Accept-Ranges": "bytes",
// *   "Cache-Control": "max-age=6000, public",
// *   Connection: "keep-alive",
// *   "Content-Type": "application/javascript"
// * }
var parseHeader = function(str){
    const arr = str.split('\n');
    let obj = Object.create(null);
    arr.forEach((e)=>{
        const kv = e.split(':');
        const key = kv[0];
        const val = kv[1] || '';
        obj[key]=val;
    });
    return obj;
}

`Accept-Ranges: bytes 
Cache-Control: max-age=6000, public
Connection: keep-alive
Content-Type: application/javascript`


var buildTree1 = function(arr){
    let obj = Object.create(null);
    let res = Object.create(null);
    
    for(let i=0;i<arr.length;++i){
        obj[arr[i].id]=arr[i];
    }
    for(let key in obj){
        const item = obj[key];
        if(item.parent_id){
            if(!obj[item.parent_id].children){
                obj[item.parent_id].children = Object.create(null);
            }
            obj[item.parent_id].children[key]=item;
        }else{
            res[key]=obj[key];
        }
    }
    return res;
}
// // * 输入：
// // * const obj = { selector: { to: { toutiao: "FE Coder"} }, target: [1, 2, { name: 'byted'}]};
// // * get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name')
// // * 输出：
// // * ['FE coder', 1, 'byted']

var get = function(obj,...args){
    return  args.reduce((acc,cur,index)=>{
        const arr = cur.replace(/\[/g,'.').replace(/\]/g,'').split('.');
        let node = obj;
        arr.forEach((e)=>{
            node = node[e];
        });
        acc.push(node);
        return acc;
    },[]);
}
//mock bind?
//1.改变调用对象 this
//2.可以传入参数
//3.bind函数也可以使用new操作符，使用原函数的构造起，忽略绑定的this 可以传入参数
Function.prototype.myBind = function(context){
   let args = Array.prototype.slice.call(arguments);
   let self = this;
   let fn = function(){
       self.apply(typeof this == fn ? this :context,[...args,...arguments]);
   };
   let t = Object.create(null);
   t.prototype = this.prototype;
   fn.prototype = new t();
   return fn;
}

//mock new 
var newFactory = function(fn){
   let obj = Object.create(fn.prototype);
   var result = fn.apply(obj,arguments);
   return result && typeof result === 'object'? result: obj;
}

//mock instanceOf
var instanceOf = function(leftValue,rightFn){
    if(typeof leftValue !== 'object' || rightFn === null)
        return false;
    let rightProto = rightValue.prototype;
    leftValue = leftValue.__proto__;

    while(true){
        if(leftProto === rightFn.prototype){

        }
    }
}
//判断两个对象是否相等。

function newInstanceOf (leftValue, rightValue) {
    if (typeof leftValue !== 'object' || rightValue == null) { 
        return false;
    }
    
    let rightProto = rightValue.prototype;
    leftValue = leftValue.__proto__;
    
    while (true) {
        if (leftValue === null) return false;
        if (leftValue === rightProto) return true;
        leftValue = leftValue.__proto__;
    }
}
//快速排序
const quick_sort = function(q, l=0, r=q.length-1)
{
    if (l >= r) return q;

    let i = l - 1, j = r + 1, x = q[l + r >> 1];
    while (i < j)
    {
        do i ++ ; while (q[i] < x);
        do j -- ; while (q[j] > x);
        if (i < j) [q[i], q[j]] = [q[j], q[i]];
    }
    quick_sort(q, l, j);
    quick_sort(q, j + 1, r);
}


//let 
for(let i=0;i<5;++i){
    setTimeout(()=>{
        console.log(i)
    },1000*i);
}
//闭包
for(var i=0;i<5;++i){
    (function(j){ 
        setTimeout(()=>{
        console.log(j)
        },1000*j);
    })(i);
}
//使用第三个参数
for(var i=0;i<5;++i){
    setTimeout((j)=>{
        console.log(j)
    },1000*i,i);
}


function newFactory() {
    let obj = new Object();
    const Constructor = [].shift.call(arguments);
    obj.__proto__ = Object.create(Constructor.prototype);
    const result = Constructor.apply(obj, arguments);
    const isObject = typeof result === "object" && result !== null;
    const isFunction = typeof result === "function";
    return isObject || isFunction ? result : obj;
}

//lodash.get
// promise.all
  function PromiseALL(promises){
      return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            throw new TypeError('not a function');
        }
        const total = promises.length >>> 0;
        let res = new Array(total);
        let count = 0;
        for(var i=0;i<total;++i){
           (function(i){  Promise.resolve(promises[i]).then((v)=>{
                res[i] =v;
                count++;
                if(count === total){
                    return res;
                }
            },(e)=>{
                return reject(e);
            })
            })(i);
        }
    });
  }
  //css 三角形 圆形 三点骰子 中间自适应 两边固定 

// promise.加载图片
  var loadImage = function(url){
      return new Promise((resolve,reject)=>{
        const img = document.createElement('img')
        img.onload = () => {
            resolve(img)
        }
        img.onerror = () => {
            const err = new Error(`图片加载失败 ${src}`)
            reject(err)
        }
        img.src = url
      });
  }
//ajax

var ajax = function(url,params){
    let request = new XMLHttpRequest();
    var data = new FormData();
    for(let key in params){
        data.append(key,params[key]);
    }
    request.open('POST',url);
    request.setRequestHeader('Content-Type','Mulitipart/form-data');
    request.send(data);
    request.onreadystatechanged = function(){
        if(request.readyState === 4 && request.status === 200){
            console.log(request.responseText);
        }
    }
}

//两个对象是否先等
var isEqual = function(obj,target){
    if(obj === target)
        return true;
    if(typeof obj === 'object' && typeof target === 'object' && obj && target){
        if(obj.keys.length !== target.keys.length)
            return false;
        for(let key in obj){
            if(!target.hasOwnerProperty(key)){
                var res = isEqual(obj[key],target[key]);
                if(!res)
                    return false;
            }else{
                return false;
            }
        }
        return true;
    }
    return false;
}

//quicksort 
var quickSort = function(arr,l=0,r=arr.length-1){
    while(l<r){

    }
}

//快速排序
const quick_sort = function(q, l=0, r=q.length-1)
{
    if (l >= r) return q;

    let i = l - 1, j = r + 1, x = q[l + r >> 1];
    while (i < j)
    {
        do i ++ ; while (q[i] < x);
        do j -- ; while (q[j] > x);
        if (i < j) [q[i], q[j]] = [q[j], q[i]];
    }
    quick_sort(q, l, j);
    quick_sort(q, j + 1, r);
}
//websocket
长链接 全双工通信， 实时通信，
首次握手是通过http协议完成祸首成功后升级到ws协议，此后进行双向通信解决了原始的客户端轮询的资源浪费问题。

//2.事件模型 dom 15min
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

//3.dom  cssom构建过程 # 15min     
渲染进程和网络进程共同合作，网络进程将获取的字节流传输到管道上，渲染进程取出一部分文件进行解析
html文档-》分词器 ——》node-》dom
通过分词器将字节流转换为 Token。 token  生成DOM 节点并构建dom树


js文件对DOM树产生的影响（白屏）以及解决方案（首次加载白屏的解决方案）：
    解析js文件需要下载js文件，js文件下载后需要执行 这些动作都会做是dom树的生成阻塞，
解决方案：
1.加快js文件下载速度，使用cdn加载，
2.js文件改成有异步加载的方式（前提是js没有dom操作使用defer和async）
3.减少js文件的体积（treeshaking/uglify）
//4.osi七层 4层 ping tcp udp 20min   
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
每一层的作用？  15min


ping 127.0.0.1 检测本地连通性能否与其他机器交换数据

//1.debounce throttle 5 min
var debounce = function(fn,wait){
    let timer;
    return function(){
        let self = this;
        let args = arguments;
        if(timer){
            clearTimeout(timer);
            timer = setTimeout(()=>{
                fn.apply(self,args);
            },wait);
        }
    }
}
//.throttle
var throttle = function(fn,wait){
    let pre = 0;
    return function(){
        let self = this;
        let args = arguments;
        const now = +new Date();
        const remaining = now-pre;
        if(remaining > wait){
            fn.apply(self,args);
            pre = now;
        }
    }
}
// 垂直居中   10min
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

//7.跨域 jsonp 10min

//前端优化 浏览器解析过程 30min

前端优化：

//无限列表原码阅读 30 min
通过padding设置模拟滚动
然后通过高度计算找到对应的index做替换

//设计模式（装饰者  观察者 策略模式） 30min

//xss  //csrf  cookie samesit:strict lax none

//立即执行函数的作用以及使用场景：
//避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。
//定义私有变量，外界函数不能修改这个变量
//递归执行

var selectSort=function(arr){
    let min=0;
    for(let i=0;i<arr.length;++i){
        min = i;
        for(let j=0;j<arr.length;++j){
            if(arr[j]<arr[min]){
                min = j;
            }
        }
        if(arr[i]<arr[min]){
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    return arr;
}
var bubbleSort = function(arr){
    for(let i=0;i<arr.length-1;++i){
        for(let j=0;j<arr.length-1-i;++j){
            if(arr[j]>arr[j+1]){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

var ajax = function(url,params){
    var request = new XMLHttpRequest();
    var data = new FormData();
    if(params){
        for(let key in params){
            data.append(key,params[key]);
        }
    }
    request.open('POST',url);
    request.setRequestHeader('Content-Type','multipart/form-data');
    request.send(data);
    request.onreadystatechanged = function(){
        if(request.readyState === 4){
            if(request.status === 200 || request.status === 304){
                console.log(request.responseText);
            }
        }
    }
}

var isEqual = function(x,y){
    if(x === y)
        return true;
    if(!x || !y)
        return false;
    if(x.keys.length !== y.keys.length)
        return false;
    for(let key in x){
        if(!y.hasOwnerProperty(key))
            return false;
        if(!isEqual(x[key],y[key])){
            return false;
        }
    }
    return true;
}

var newInstanceOf = function(left,right){
    if(typeof left !== 'object'){
        return false;
    }
    let leftP = left.__proto__;
    let rightP = right.prototype;
   
    while(true){
        if( leftP === null)
            return false; 
        if(leftP === rightP){
            return true;
        }
        leftP = leftP.__proto__;
    }
}
const a = [];
const b = {};

function Foo () {}

var c = new Foo()
function Child () {}
function Father() {}
Child.prototype = new Father()
var d = new Child()


var promiseAll = function(promises){
    if(!Array.isArray(promises)){
        throw new TypeError('not a array');
    }
    return new Promise((resolve,reject)=>{
        let res = new Array(promises.length);
        let count = 0;
        for(var i=0;i<promises.length;++i){
            (function(j){
                Promise.resolve(promises[j]).then((v)=>{
                    count++;
                    res[j] = v;
                    if(count === promises.length){
                        return  resolve(res);
                    }
                },(e)=>{
                    return reject(e);
                })
            })(i)
        }
    });
}
