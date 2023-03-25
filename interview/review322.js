
function flat(arr){
	const arras = arr || [];
    return arras.reduce((acc,cur)=>{
        if(Array.isArray(cur)){
            acc = acc.concat(flat(cur));
        }else{
            acc.push(cur);
        }
        return acc;
    },[]);
}

function ListNode(v)
{
    this.val = v;
    this.next = null;
}
//链表有环
function detectsCircle(l){
    if(!l)
        return false;
    let p=l;
    let q=l.next.next;
    while(q != null)
    {
        if(p===q)
            return true;
        p = p.next;
        q = q.next;
    }
    return false;
}

//合并两个有序的链
// 1-》2-》4 1-》3-》4
// 1-》1-》2-》3-》4-》4
function mergeList(l1,l2){
    let head = new ListNode(0);
    let current = head;
    while(l1 != null && l2 !=null)
    {
        current.next = l1.val < l2.val ? l1:l2;
        l1 = l1.next;
        l2 = l2.next;
        current = current.next;
    }
    if(l1){
        current.next = l1;
    }
    if(l2){
        current.next = l2;
    }
    return head.next;
   
}
//有效的字符串
var validString=function(s){
    const left=[];
    const star=[];
    for(let i=0;i<s.length;++i)
    {
        const ch = s.charAt(i)
        if(ch === '(')
        {
            left.push(i);
        } 
        if(ch === '*')
        {
            star.push(i);
        }
        if(ch === ')')
        {
            if(left.length)
            {
                left.pop();
            }else if(star.length){
                star.pop();
            }else{
                return false;
            }
        }
    }
    while(left.length && star.length)
    {
        const l = left.pop();
        const s = star.pop();
        if(l>s)
            return false;
    }
   
    return left.length === 0 ;
}

function throttle(func,delay){
    let pre = 0;
    let context,args,timer;

    return function(){
        const now= +new Date();
        const remaining = delay-(now-pre);
        context = this;
        args = arguments;
        if(remaining<=0 || remaining > delay)
        {
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
            func.call(context,args);
            pre = now;
        }else{
            timer = setTimeout(()=>{
                clearTimeout(timer);
                timer = null;
                func.call(context,args); 
                pre = +new Date();
            },remaining)
        }
    }
}

// 但是我有时也希望无头有尾，或者有头无尾，这个咋办？
// 那我们设置个 options 作为第三个参数，然后根据传的值判断到底哪种效果，我们约定:
// leading：false 表示禁用第一次执行
// trailing: false 表示禁用停止触发的回调

function throttle(func,delay,options){
    let pre = 0;
    let context,args,timer;
    return function(){
        const now= +new Date();
        pre=options.leading == false? now:0;
        const remaining = delay-(now-pre);
        context = this;
        args = arguments;
        if(remaining<=0 || remaining > delay)
        {
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
            func.call(context,args);
            pre = now;
            if (!timeout) context = args = null;
        }else{
            if(options.trailing){
                timer = setTimeout(()=>{
                    clearTimeout(timer);
                    timer = null;
                    func.call(context,args); 
                    pre = +new Date();
                },remaining);
                if (!timeout) context = args = null;
            }
        }
    }
}

//反转字符串
var reverse = function(s){
    var arr = [];
    for(let i =0;i<s.length;++i)
    {
        let temp = s[i];
        s[i] = s[s.length-i-1];
        s[s.length-i-1] = temp;
        arr.push(temp);
    }
    console.log(arr);
}

var reverseString = function(s) {
    const n = s.length;
    for (let left = 0, right = n - 1; left < right; ++left, --right) {
        [s[left], s[right]] = [s[right], s[left]];
    }
};


//千分位分割 123,456,123.11
var thoundsSplit = function(s){
    let arr = s.split('.');
    return arr[0].replace('/\d\d{3}$/g',function(){

    }).concat(arr[1]);
}

var res=num.toString().replace(/\d+/, function(n){ // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
       return $1+",";
     });
})
return res;


//回文数 123321 12332 1 1233 21
// 123 3321 1233/10
var ispar=function(n){
    if((n!==0 && n%10===0) || n<0)
        return false;
    const l = n;
    const r = 0;
    while(l<r){
        r=l%10+10*r;
        l=Math.floor(n/10);
    }
    return l === r || l === Math.floor(r/10);
}

//判断一个数是否是素数
var isPrime = function(n){
   const sqrt = Math.sqrt(n);
   for(let i=2;i<=sqrt;++i){
       if(i*i == n){
           return false;
       }
   }
   return true;
}
//获得n以内的所有素数
var findPrimeArr = function(n){
    const arr = [];
    const sqrt=Math.sqrt(n);
    // 1 2 3 4 5 6  1 4 9
    for(let i=2;i<=n;++i){
        if(isPrime(i)){ 
            arr.push(i);
        }
    }
}
//碍事
var countPrimes = function(n) {
    const isPrime = new Array(n).fill(1);
    let ans = 0;
    for (let i = 2; i < n; ++i) {
        if (isPrime[i]) {
            ans += 1;
            for (let j = i * i; j < n; j += i) {
                isPrime[j] = 0;
            }
        }
    }
    return ans;
};

//线性筛选
var countPrimes = function(n) {
    const isPrime = new Array(n).fill(1);
    const primes = [];
    for (let i = 2; i < n; ++i) {
        if (isPrime[i]) {
            primes.push(i);
        }
        for (let j = 0; j < primes.length && i * primes[j] < n; ++j) {
            isPrime[i * primes[j]] = 0;
            if (i % primes[j] === 0) {
                break;
            }
        }
    }
    return primes.length;
};

//bind函数实现 1.this的指向，2传入参数3.new的时候借用绑定函数做为构造函数，忽略this,将传入参数提供该给构造函数。
var bind = function(context){
    let self = this;
    let args = Array.prototype.slice.slice(arguments,1);
    var bindFunc = function(){
        //1.构造函数
        //2.普通方法调用
        self.apply(this instanceof bindFunc? this:context,args.concat(...arguments));
    };
    var temp = function(){};
    temp.prototype = self.prototype;
    bindFunc.prototype = new temp();
    return bindFunc;
}

//求解平方根 o(n)->o(logN)
var sqrt = function(n){
    let l = 0;
    let r = n;
    let res = -1;
    // 1 ,2 ,3, 4
    while(l<r){
        const mid = l+ Math.floor((r-l)/2);
        if(mid * mid <= n){
            res = mid;
            l = mid+1;
        }else{
            r=mid-1;
        }
    }
    return res
}
//二叉树的广度遍历
var bfs = function(root){
    const queue = [];
    const res = [];
    queue.push(root);
    while(queue.length){
        const node = queue.pop();
        res.push(node);
        if(node){
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }
    return res;
}
//二叉树的层次遍历
var bfs = function(root){
    const queue = [];
    const res = [];
    queue.push(root);
    //[1,2,3]
    //[2,3] [2,3, 4,5, 6,7]
    while(queue.length){
        let len = queue.length;
        const arr = [];
        while(len){
            const node = queue.pop();
            arr.push(node);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
            len--;
        }
        res.push(sub);
    }
    return res;
}
//二叉树的深度
var findDeep = function(root){
    if(!root)
        return 0;
    const queue=[];
    let deep =0;
    queue.push(root);
    while(queue.length){
        let len=queue.length;//关键
        const arr= [];
        for(let i=0;i<len;++i){
           const node = queue.pop();
           arr.push(node);
           node.left && queue.push(node.left);
           node.right && queue.push(node.right);
        }
        deep++
    }
    return deep;
}
//给定数值的最小字符串
var minString = function(n,k){
   var v = k-n+1;
   const i = v/26;
   const j = v%26;
   return ''.padStart('a',v)
}

var getSmallestString = function (n, k) {
    // 设置n个a
    k -= n;
    let res = '';
    let cur = 0;
    // 贪心地从后拼接字符
    for (let i = n - 1; i >= 0; i--, k -= cur) {
        cur = Math.min(25, k);
        res = String.fromCharCode(97 + cur) + res;
    }
    return res;
};


var isValidSudoku = function(board) {
    const rows = new Array(9).fill(0).map(() => new Array(9).fill(0));
    const columns = new Array(9).fill(0).map(() => new Array(9).fill(0));
    const subboxes = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => new Array(9).fill(0)));
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const c = board[i][j];
            if (c !== '.') {
                const index = c.charCodeAt() - '0'.charCodeAt() - 1;
                rows[i][index]++;
                columns[j][index]++;
                subboxes[Math.floor(i / 3)][Math.floor(j / 3)][index]++;
                if (rows[i][index] > 1 || columns[j][index] > 1 || subboxes[Math.floor(i / 3)][Math.floor(j / 3)][index] > 1) {
                    return false;
                }
            }
        }
    }
    return true;
};
//
var validString = function(s){
    let max =0;
    let min =0;
    for(let i=0;i<s.length;++i){
        if(s.charAt(i) === '('){
            max++;
            min++;
        }else {
            if(s.charAt(i) === ')'){
                max--;
                min--;
            }
            if(s.charAt(i) === '*'){
                max++;
                min--;
            }
        }
    }
}
// 冒泡排序
var bubbleSort = function(arr){
    //[1,2,3]
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        for (let j = 0; j < arr.length; j++) {
            if(arr[index] > arr[j]){
                let temp = arr[j];
                arr[j] = arr[index];
                arr[index] = temp;
            }
        }
    }
}
//
let startTime = performance.now();
const loop = function(timer){
    requestAnimationFrame(loop);
    const now = performance.now();
    const interval = now - startTime;
    if(interval>1000){
        console.log(1);
        startTime=now-(interval-1000);
    }
   
}
requestAnimationFrame(loop);

var callback = function(ticks){
    console.log(ticks)
}

var test = function(callback,wait){
    let startTime = performance.now();
    let ticks =0;
    var loop = function(time){
        this.timer = requestAnimationFrame(loop);
        const interval = time- startTime;
        if(interval > wait){
            ticks++;
            callback(ticks);
            startTime = time-(interval-wait);
        }
    }
    this.timer = requestAnimationFrame(loop);
    return this.timer;
}
test(callback,1000);
cancelAnimationFrame();


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
const quick_sort1 = function(q, l=0, r=q.length-1)
{
    if (l >= r) return q;

    let i = l - 1, j = r + 1, x = q[l + r >> 1];
    while (i < j)
    {
        do i ++ ; while (q[i] < x);
        do j -- ; while (q[j] > x);
        if (i < j) [q[i], q[j]] = [q[j], q[i]];
    }
    quick_sort1(q, l, j);
    quick_sort1(q, j + 1, r);
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

// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。 
// input：nums = [0,0,0]
// output：1
// input：nums = [0,1,0,3,2,3]
// output：4
// 0 <= nums[i] <= 10000

//手写买卖股票问题  

// 快速排序

//已知一个二叉树,前序遍历结果是: e b c h f g a d;中序遍历结果是: c h b e g f a d,要求复原这棵二叉树 

//实现一个纸牌游戏，52张牌，抽取5张，判断是否是同花顺

//最基础的括号匹配。直接用栈秒杀。 
function findMax(nums) {}
//版本对比
var compareVersion = function (version1, version2) {
    let v1 = version1.split("."), v2 = version2.split(".")
    let n = v1.length, m = v2.length
    let i = 0, j = 0
    while (i < n || j < m) {
        let a = 0, b = 0
        if (i < n) a = parseInt(v1[i++])
        if (j < m) b = parseInt(v2[j++])
        if (a != b) return a > b ? 1 : -1
    }
    return 0
};



//求两个整数数组中的公共数字（交集）

//sqrt
