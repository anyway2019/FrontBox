import { func } from "assert-plus";
import { even } from "prelude-ls";
import { node } from "prop-types";
import { object } from "webidl-conversions";
import { strict } from "yargs";

var start = performance.now();
var ticks = 0;
const loop = function(timestamp){
    this.timer = requestAnimationFrame(loop);
    let current = timestamp;//performance.now();
    const delta = current-start;
    if(delta >= 1000){
        ticks++;
        start = current - (delta-1000);//时间补偿
        console.log(ticks);
        
    }
}
var timer = requestAnimationFrame(loop);



const getJSON = function(url) {
    const promise = new Promise(function(resolve, reject){
        const handler = function() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
       

    });
    return promise;
};
getJSON("promise.json").then(function(json) {
    console.log('Data: ', json);
}, function(error) {
    console.error('err', error);
});


const client = new XMLHttpRequest();
client.open("GET", url);
client.onreadystatechange = handler;
client.responseType = "json";
client.setRequestHeader("Accept", "application/json");
client.send();
var ajax={
    post:function(callback,url,async=false){
        const request = new XMLHttpRequest();
        request.open('POST',url,async);
        request.onreadystatechanged = ()=>{
            if(request.readyState==4){
                if(request.status == 200 || request.status == 304){
                    callback(request.responseText);
                }
            }
        }
        request.send();
    },
    get:function(callback,url,async=false){
        const request = new XMLHttpRequest();
        request.open('GET',url,async);
        request.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        request.onreadystatechanged = ()=>{
            if(request.readyState==4){
                if(request.status == 200 || request.status == 304){
                    callback(request.responseText);
                }
            }
        }
        request.send();
    }

}

function createFunction2() {
    var x = 20;
    function f() {
        return x; // 这里的 x 指向上方本地作用域内的 x
    }
    var f1 = function(){
        console.log(x);
    }
    return f1;
}

(function(){}).constructor === Function //true

Object.prototype.toString.call(createFunction2);
(typeof obj === 'object' || typeof obj === 'function') ? 'object' : typeof obj;


ajax({
    url: "./TestXHR.aspx",              //请求地址
    type: "POST",                       //请求方式
    data: { name: "super", age: 20 },        //请求参数
    dataType: "json",
    success: function (response, xml) {
        // 此处放成功后执行的代码
    },
    fail: function (status) {
        // 此处放失败后执行的代码
    }
});

function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);

    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    }

    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}
//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace("."));
    return arr.join("&");
}

var obj = {
    a:0,
    sum:function(){
        console.log(this);
    }
}

function testThis(fn){
    fn();
}
testThis(obj.sum);

var obj1 = {
    b:1,
    test:function(fn){
        fn();
    }
}

obj1.test(obj.sum);


Function.prototype.Mybind = function(context){
    if(typeof this !== 'function')
        throw new TypeError('not a function!');

	let self = this;
	const args = Array.prototype.Slice(arguments,1);

	var f = function(){
		return self.apply(this instanceof f? this:self,[...args,...arguments]);
	}
    let temp = {};
    temp.prototype = this.prototype;
    f.prototype = new temp();
	return f;
}
//层次遍历

function TreeNode(value){
    this.leftNode= null;
    this.rightNode= null;
    this.value=value;
}

function levelOrder(root){
    let map = new Map();
    var traverse = function(node,depth=0){
        if(!node){
            return;
        }
        let arr = map.get(depth);
        if(!arr){
            map.set(depth,[root.value]);
        }else{
            arr.push(node);
        }
        depth++;
        traverse(node.leftNode,depth);
        traverse(node.leftNode,depth);
    }
    return traverse(root);
}


function inOrder(root){
    if(root==null)
        return;
    inOrder(root.leftNode);
    console.log(root.value);
    inOrder(root.rightNode);
}

function preOrder(node){
    let stack = [];
    let res = [];
    if(!node)
        return res;
    stack.push(node.value);
    while(stack.length > 0){
        const q = stack.pop();
        res.push(q);
        if(node.rightNode){
            stack.push(node.rightNode.value);
        }
        if(node.leftNode){
            stack.push(node.leftNode.value);
        }
    }
    return res;
}

function inOrder(node){
    let stack=[];
    let res =[];
    if(!node)
        return res;
    
    while(stack.length>0){
        while(node != null){
            stack.push(node.value);
            node = node.leftNode;
        }
        const node = stack.pop();
        res.push(node.value);
        node = node.rightNode;
    }
    return res;
}
Myre
function postOrder(node){
    let stack = [];
    let res = [];
    if(!node)
        return res;
    stack.push(node.value);
    while(stack.length > 0){
        const q = stack.pop();
        res.unshift(q);
        if(node.leftNode){
            stack.push(node.leftNode.value);
        }
        if(node.rightNode){
            stack.push(node.rightNode.value);
        }
    }
    return res;
}

function postOrder(rightNode){
    let res = [];
    let stack = [];
    if(!root)
        return res;
    while(stack.length > 0){
        const q = stack.pop();
        res.unshift(q);
        if(q.leftNode){
            stack.push(q.leftNode);//[2,3]
        }

        if(q.rightNode){
            stack.push(q.rightNode);
        }
    }
}

function DFS(root){
    let stack = [];
    if(!root)
        return stack;
    stack.push(root);
    while(stack.length>0){
        const q = stack.pop();
        res.push(q);
        if(q.rightNode){
            stack.push(q.rightNode);
        }
        if(q.leftNode){
            stack.push(q.leftNode);
        }
    }
}


function BFS(root){
    let queue = [];
    let res = [];
    if(!root){
        return res;
    }
    queue.push(root);
    while(queue.length>0){
        const q = queue.pop();
        if(q.leftNode){
            queue.push(q.leftNode);
        }
        if(q.rightNode){
            queue.push(q.rightNode);
        }
    }
}

function levelOrder(root){
    let queue = [];
    let res = [];
    let dep = 0;
    if(!root){
        return res;
    }
    queue.push(root);
    while(queue.length>0){
        let n  = queue.length;
        let arr = [];
        for(let i=0;i<n;++i){
            const q = queue.pop();
            arr.push(q);
            if(q.leftNode){
                queue.push(q.leftNode);
            }
            if(q.rightNode){
                queue.push(q.rightNode);
            }
        }
        res.push(arr);
        dep++;
    }
}

//10进制转换成36进制
var convert36 = (num)=>{
    let real = num+1;
    let res = "";
    while(real>0){
        let m = real%36;
        if(m==0){
            m=36;
        }
        res = String.fromCharCode(m+64)+res;
        real = (real-m)/36;
    }
    return res;
}


var dispatch= (childs,cookies)=>{
    let childsSet = new Set(childs);

    for(let i=0;i<cookies.length;++i){
        if(childsSet.has(cookies[i])){
            console.log(cookies[i])
            childsSet.delete(cookies[i]);
            console.log(childsSet);
        }
    }
    return childsSet;
}

var maxRange= (arr)=>{
    if(arr.length < 2)
        return arr;
    const sortArr = arr.sort((a,b)=>b-a);
    let sum = 0;
    let i=0;
    let j=1;
    let res = [];
    //[6,5,4,3,2]
    while(j<sortArr.length){
        sum+=sortArr[i];
        let current = sortArr[i]*sum;//55
        let next = sortArr[j]*(sum+sortArr[j]);
        res.push(sortArr[i]);
        if(next<current){
            break;
        }else{
            i++;j++;
        }
    }
    return res;
}

var maxSubArray = (arr)=>{
    let i =0;
    let j =0;
    let sum = 0;
    while(j<arr.length){
        if(arr[i]<0){
            i++;
            j++;
        }else{
            const currentSum = sum+arr[j];
            if(currentSum<sum)
            j++;
        }
    }
}

var maxArray = (arr)=>{
    let res = arr[0];
    for(let i=1;i<arr.length;++i){
        arr[i] += Math.max(arr[i-1],0);
        res = Math.max(res,arr[i]);
    }
    return res;
}

var repeat= (times,delay)=>{
    let current = 0;
    var timer =function(){ 
        setInterval(()=>{
            if(current<times){
                current++;
                console.log('hello world');
            }else{
                clearInterval(timer);
            }
        },delay);
    }
    timer();
}
var single = {
    obj:new Map(),
    instance:function(){
        obj = obj?obj :new Map();
        return obj;
    }
}
single.instance();
let startTime = performance.now();
const loop = function(time){
    requestAnimationFrame(loop);
    const interval = time-startTime;
    if(interval > 1000){
        console.log(1);
        startTime = time-(interval-1000);
    }
 
}
requestAnimationFrame(loop)

cancelAnimationFrame();



var obj = {a:1}
Object.defineProperty(obj,'a',{
    get(){
      
    },
    set(newVal){
        this.a = newVal;
    }
})
//数据描述符 1.value（值） writeable（true可写） enumerable（true 可迭代） configurable（true描述符允许修改）
//存储描述符： 1.get set
function myclass() {
}

var value;
Object.defineProperty(myclass.prototype, "x", {
  get() {
    return value;
  },
  set(x) {
    value = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // 1


不像访问者属性，值属性始终在对象自身上设置，而不是一个原型。
然而，如果一个不可写的属性被继承，它仍然可以防止修改对象的属性。

function myclass() {
}

myclass.prototype.x = 1;
Object.defineProperty(myclass.prototype, "y", {
  writable: false,
  value: 1
});

var a = new myclass();
a.x = 2;
console.log(a.x); // 2
console.log(myclass.prototype.x); // 1
a.y = 2; // Ignored, throws in strict mode
console.log(a.y); // 1
console.log(myclass.prototype.y); // 1

Object.defineProperty(c3,'y',
{
    get(){return v;},
    set(n){v=n;}
})

var p = new Proxy({},{
    get:function(target,prop,receiver){
        console.log(prop+"called");
        return 10;
    },
    set:function(target,prop,receiver){
        console.log(prop+' '+target[prop]+' receiver'+receiver);
        return true;
    }
});
p.a;

//get的约束


MutationObserver:
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();


//
class EventBus{
    constructor(){
        this.events = Object.create(null);
    }
    on(name,callback){
        if(!this.events[name]){
            this.events[name] = [];
        }
        this.events[name].push(callback);
    }
    once(name,callback){
        const cb = (...args)=>{
            callback(...args);
            this.off(name,callback);
        }
        this.on(name,cb);
    }
    //dispatch event
    emit(name,...args){
      if(this.events[name]){
        this.events[name].map((fn)=>{
            fn(...args);
        })
      }
    }
    //cancel listen
    off(name,cb){
        if(this.events[name]){
            const index = this.events.findIndex((fn)=>fn === cb);
            this.events[name].splice(index,1);
            if(!this.events[name].length){
                delete this.events[name];
            }
        }
    }
}



