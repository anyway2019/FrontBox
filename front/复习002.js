import { func } from "prop-types";

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
链表有环
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

合并两个有序的链
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
有效的字符串
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


