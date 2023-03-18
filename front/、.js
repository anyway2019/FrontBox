二分查找
var midquery = function(nums,k){
    let mid= Math.floor(nums.length/2);
    if(nums[mid] === k) 
        return mid;
    if(nums[mid] < k){
        return midquery(nums.slice(mid),k);
    }
    if(nums[mid] > k){
        return midquery(nums.slice(0,mid),k);
    }
}

function binary_search(arr, key) {
    var low = 0,
        high = arr.length - 1;
    while(low <= high){
        var mid = parseInt((high + low) / 2);
        if(key == arr[mid]){
            return  mid;
        }else if(key > arr[mid]){
            low = mid + 1;
        }else if(key < arr[mid]){
            high = mid -1;
        }else{
            return -1;
        }
    }
};

reduce 


Array.prototype.MyReduce=function(fn,initial){
    if(!fn || typeof fn !== 'function'){
        throw new TypeError('fn not a funtion')
    }
    if(this.length===0 && !initial){
        throw new TypeError('empty array with no initial')
    }

    let len = this.length >>> 0;
    let k=0;
    let acc;
    if(!initial){
        //[,,,] [,,,3,,4]
        let preset = false;
        while(k<len){
            if(this[k] in this){
                preset = true;
                break;
            }
            k++;
        }
        if(!preset){
            throw new TypeError('empty with no initial value');
        }
        acc = this[k];
    }else{
        acc = initial;
    }
    //[2,3,,4]
    while(k<len){
        if(this[k] in this){
            fn(acc,this[k],k,this);
        }
        k++;
    }
    return acc;
}
//inorder
var inorder = function(treeNode){
    if(!treeNode)
        return;
    inorder(treeNode.left);
    console.log(treeNode.val);
    inorder(treeNode.right);
}
var inorderStack = function(treeNode){
    if(!treeNode)
        return;
    const stack = [];
    const res = [];
    stack.push(treeNode);
    while(stack.length>0){
        const node = stack.pop();
        res.push(node);
        stack.push(node.right);
        stack.push(node.left);
    }
    return res.reverse();
}

//new 

var newFactory = function(func){
    if(typeof func !== 'function'){
        throw new TypeError('not a function!');
    }
    var obj = Object.create(null);
    obj._proto_ = func.prototype;

    var result = func.call(obj,...arguments);
    return result && typeof result === 'object'? result : obj;
}
//组合继承 组合了 原型链的继承 和 经典继承
function Parent(name){
    this.name = name;
}
Parent.prototype.sayName= function(){
    console.log(this.name);
}
function Child(name,age){
    this.age = age;
    Parent.call(this,name);//继承属性
}
Child.prototype = new Parent();//继承方法

//防抖 触发多次以最后一次触发为准n秒后调用触发函数
var debounce = function(fn,delay,immediate){
    if(typeof fn !== 'function'){
        throw new TypeError('not a function')
    }
    let timer;
    let result;
    return function(){
        let context = this;
        let args = arguments;
        if(timer)
            clearTimeout(timer);
        if(immediate){
            var callNow = !timer;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if(callNow) 
                result = fn.apply(context,args);
        }else{
            timer = setTimeout(()=>{
                fn.apply(context,args);
                timer = null;
            },delay);
        }
        return result;
    }
}

//节流
var throttle = function(fn,wait){
    let pre=0;
    return function(){
        const now = performance.now();
        const remaining = now-pre;
        if(remaining>wait){
            fn.call(this,...arguments);
            pre = now;
        }
    }
}
//链表翻转
//1-2-3-4 4-3-2-1
function ListNode(v){
    this.val = v;
    this.next=null;
}
var reverseList = function(node){
    let head = null;
    let current = node;
    while(current){
        const next = current.next;
        current.next = head;
        head = current;
        current = next;
    }
    return head;
}

//promise

function MyPromise(){
    this.state = '';
    this.resolves=[];
    this.rejects=[]
    this.resolve = function(fn){
        if(this.state === 'pending'){
            this.state='fullfilled';
        }
        this.resolves.push(fn);
    }
    this.reject = function(fn){
        if(this.state === 'pending'){
            this.state='rejected';
        }
        this.rejects.push(fn);
    }
    this.then=function(OnResolved,OnRejected){
        let self = this;
        let promise2;

        OnResolved = typeof OnResolved === 'function'?OnResolved:function(res){return res};
        OnRejected = typeof OnRejected === 'function'?OnRejected:function(err){throw err};

        if(self.status === 'resolved'){
            return promise2 = new Promise(function(resolve,reject){
                try{
                    const x = OnResolved(self.data);
                    if(x instanceof Promise){
                        x.then(resolve,reject);
                    }else{
                        resolve(x);
                    }
                }catch(e){
                    reject(e);
                }
            })
        }
        if(self.status === 'rejected'){
            return promise2 = new Promise(function(resolve,reject){
                try{
                    const x = OnRejected(self.data);
                    if(x instanceof Promise){
                        x.then(resolve,reject);
                    }
                    reject(x);
                }catch(e){
                    reject(e);
                }
            })
        }

        if(self.status === 'pending'){
            return promise2=new Promise((resolve,reject)=>{
               self.resolves.push(function(v){
                   try {
                    const x = OnResolved(v);
                    if(x instanceof Promise){
                        x.then(resolve,reject);
                    }
                    resolve(x);
                   }catch(e){
                    reject(e);
                   }
               })

               self.rejects.push(function(e){
                   try{
                    const x = OnRejected(e);
                    if(x instanceof Promise){
                        x.then(resolve,reject);
                    }
                    reject(e)
                   }catch(e){
                    reject(e)
                   }
               })
            })
        }


        return new Promise()
    }
    this.catch=function(OnRejected){
        return this.then(null,OnRejected);
    }
}


//千分位
var th = function(x){
    var s = String(x);
    let res = '';
    // 12 ,345
    while(s.length > 3){
        res = ','+s.slice(-3)+res;
        s = s.slice(0, s.length - 3);
    }
    return s + res;
}

new 
//
var create = function(func){
    let obj = Object.create(null);
    obj._proto_ = func.prototype;
    var result = func.call(obj);
    return result && typeof result === 'object'? result : obj; 
}
组合继承
function Parent(name){
    this.name = name;
}
Parent.prototype.sayName = function(){
    console.log(this.name);
}
function Child(age){
    this.age = age;
    Parent.call(this);
}
Child.prototype = new Parent();

节流
var throttle = function(func,wait){
    let pre = 0;
    return function(){
        let self = this;
        let args = arguments;
        const now = +new Date();
        const remaining = now - pre;
        if(remaining > wait){
            func.apply(self,args);
            pre = now;
        }
    }
}

防抖

var debounce = function(fn,wait,immediate){
    let timer;
    let result;
    return function(){
        let self = this;
        let args = arguments;
        if(timer) clearTimeout(timer);
        if(immediate){
            const callNow = !timer;
            timer = setTimeout(()=>{
                timer = null;
            },wait)
            if(callNow){
                result = fn.apply(self,args);
            }
        }else{
            timer=setTimeout(()=>{
                fn.apply(self,args);
                timer = null;
            },wait);
        }
    }
}
promise

function Promise(excutor){
    let self = this;
    this.status = 'pending';
    this.resolveCallBack=[];
    this.rejectCallBack=[];
    function Resolve(v){
        if(self.status === 'pending'){
            self.status = 'fulfilled';
        }
        for(let i=0;i<self.resolveCallBack.length;++i){
            self.resolveCallBackp[i].resolve(v);
        }
    }
    function Reject(v){
        if(self.status === 'pending'){
            self.status = 'rejected';
        }
        for(let i=0;i<self.rejectCallBack.length;++i){
            self.rejectCallBack[i].reject(v);
        }
    }

}
Promise.prototype.then = function(OnResolved,OnRejected){
    let promise2;
    OnResolved = typeof OnResolved === 'function'?OnResolved:function(v){return v}
    OnRejected = typeof OnRejected === 'function'?OnRejected:function(e){throw e};

    if(self.status === 'fulfilled'){
        return promise2 = new Promise((resolve,reject)=>{
            try{
                const x = OnResolved(self.data);
                if(x instanceof Promise){
                    x.then(resolve,reject);
                }
                resolve(x);
            }catch(e){
                reject(e);
            }
        })
    }
    if(self.status === 'rejected'){
        return promise2 = new Promise((resolve,reject)=>{
            try{
                const x = OnRejected(self.data);
                if(x instanceof Promise){
                    x.then(resolve,reject);
                }
                reject(x);
            }catch(e){
                reject(e);
            }
        })
    }
    if(self.status === 'pending'){
        return promise2 = new Promise((resolve,reject)=>{
            try{
              self.resolveCallBack.push(function(v){
                  const x = OnResolved(v);
                  if(x instanceof Promise){
                      x.then(resolve,reject);
                  }
                  resolve(x);
              })
            }catch(e){
                reject(e);
            }

            self.rejects.push(function(e){
                try{
                 const x = OnRejected(e);
                 if(x instanceof Promise){
                     x.then(resolve,reject);
                 }
                 reject(e)
                }catch(e){
                 reject(e)
                }
            })
        })
    }
}

1.
var trim= function(s){
    return s.toString().replace(/\s*\s$/g,'').replace(/^\s\s*/g,'');
}
2.
var deepClone = function(target,map=new Map()){
    if(typeof target === 'object'){
        let cloneObj = Array.isArray(target)?[]:{}
        if(map.get(target)){
            return map.get(target);
        }
        map.set(target,cloneObj);
        for(let l in target){
            cloneObj[l] = deepClone(target[l]);
        }
    }else{
        return target;
    }
}
//3.v
var pip = x=>y=>z=>x+y+z;
//4. 12345  456
var bigNumAdd = function(a,b){
    const maxLen = Math.max(a.length,b.length);
    const padStrA = a.padStart('0',maxLen);
    const padStrB = b.padStart('0',maxLen);
    let temp = 0;
    let res = '';
    for(let i=maxLen-1;i>=0;--i){
        const result = parseInt(padStrA[i])+parseInt(padStrB[i]);
        res = result%10+ '' +temp;
        temp = Math.floor(result/10);
    }
    if(temp > 0){
        res = temp+res;
    }
    return parseInt(res)
}
//5.flat
var flat= function(arr){
    arr.reduce((acc,cur)=>{
        if(Array.isArray(cur)){
            acc = acc.concat(flat(cur))
        }else{
            acc.push(cur);
        }
       return acc;
    },[]);
}
//6.字符串反转 123 321 *
var reverse = function(s){
    let res = '';
    for(let i=0;i<s.length;++i){
        res+=s[s.length-i];
    }
    return res;
}
//7数组去重复
var distance = function(arr){
    arr.sort().reduce((acc,cur,index,arr)=>{
        if(acc.length === 0 || arr[index-1] != cur){
            acc.push(cur);
        }
        return acc;
    },[])
}
//8.素数
var isPrime = function(n){
    const sqrt = Math.sqrt(n);
    for(let i=2;i<=sqrt;++i){
        if(i*i === n){
            return false;
        }
    }
    return true;
}
//9.allPrime
var allPrime = function(n){
   let res = new Array(n).fill(1);
   let count = 0;
   let sqrt = Math.sqrt(n);
   for(let i=0;i<=sqrt;++i){
     if(isPrime(i)){
        for(let j=i*i;j<n;++i){
            res[j] = 0;
        }
        count++;
     }
   }
   return count;
}
//10.par
var par = function(num){
    if(num !== 0 && num % 10 === 0)
        return false;
    //1 21 1221 1 12
    let left = num;
    let right = 0;
    while(num > right){
        right = left%10 + right*10;
        left = Math.floor(left/10);
    }
    return left === right || left === Math.floor(right/10);
}
//千分位分隔符
var thou = function(s){
    let res = '';
    let num = String(s);
    while(num.length > 3){
        res = ','+ num.slice(-3);
        num = num.slice(0,num.length-3);
    }
    if(num){
        res = num+res;
    }
    return res;
}

//节流
var throttle = function(fn,wait){
    let pre=0;
    return function(){
        let self = this;
        let args = arguments;

        const now=+new Date();
        const remaining = now - pre;

        if(remaining > wait){
            fn.apply(self,args);
        }
    }
}
// reverseTreeNode
///  1
///2   3
//4
var reverseTreeNode = function(node){
    let temp;
    const stack = [];
    stack.push(node);
    while(stack.length>0){
        const root = stack.pop();
        if(root){
            temp = root.left;
            root.left = root.right;
            root.right = temp;
            stack.push(root.left);
            stack.push(root.right);
        }
    }
}
//最短距离 for
//输入：s = "loveleetcode", c = "e"
//输出：[3,2,1,0,1,0,0,1,2,2,1,0]

var findNeareast = function(nums,c){
    let pre = Math.MIN_SAFE_INTEGER;
    let res = [];
    for(let i=0;i<nums.length;++i){
        if(nums.charAt(i) === c){
            pre = i;
        }
        res[i] = i-pre;
    }

    for(let j=nums.length-1;j<nums.length;++j){
        if(nums.charAt(j) === c){
            pre = i;
        }
        res[i] = Math.max(res[i],pre-i);
    }
    return res;
}

var findNeareast = function(s,c){
    const ans=[];
    let pre = Number.MIN_SAFE_INTEGER;
    for(let i=0;i<s.length;++i){
       if(s.charAt(i) === c){
        pre = i;
       }
       ans[i] =i-pre;
    }
    for(let i=s.length-1;i>=0;--i){
        if(s.charAt(i) === c){
            pre = i;
        }
        ans[i] = Math.min(ans[i],pre-i)
    }
    return ans;
}
//.floor stair 爬楼梯
var stairs = function(n){
    let l = 0;
    let p = 0;
    let r = 1;
    while(n>0){
       l = p;
       p = r;
       r = l+p;
       n--;
    }
    return r;
}
//。合并两个排序的链表
// 1->2->3  1->2->4
var mergeList = function(l1,l2){
    if(!l1)
        return l2;
    if(!l2)
        return l1;
    let temp;
    while(l1 && l2){
        if(l1.val <= l2.val){
            temp = l1.next;
            l1.next = l2;
            l2 = l2.next;
            l2.next = temp;
        }
    }
    return l1;
}

var mergeList = function(l1,l2){
    let head = new ListNode(0);
    while(l2 && l1){
        if(l1.val<=l2.val){
            head.next = l1;
            l1 = l1.next;
        }else{
            head.next = l2;
            l2 = l2.next;
        }
        head = head.next;
    }
    head.next =  l1?l1:l2;
    return head.next;
}
//.环形列表

var isCircle = function(head){
    if(!head || !head.next)
        return false;
    let slow = head;
    let fast = head.next;
    while(fast !== slow){
        if(slow == null || fast ==null){
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    return true;
}
//.finbonacc
var finbona = function(n){
    if(n<2){
        return n;
    }
    let l = 0;
    let p = 0;
    let r = 1;
    while(n>1){
        l=p;
        p=r;
        r = l+p;
        n--;
    }
    return r
}
//.finkMax
var findKMax = function(nums,k){

}
var quickSort = function(nums){

}

var random = function(arr,l,r){
    var p =  Math.random()*(r-l+1)+l;
    var temp = arr[r];
    arr[r] = arr[p];
    arr[p] = temp;

}
var swap = function(p,q){

}

var partion = function(arr,l,r){
    const pivot = Math.floor((l+r)/2);
    let arrl = [];
    let arrR = [];
    for(let i=l;i<=r;++i){
        if(nums[i]<nums[pivot]){
            arrl.push(nums[i]);
        }else{
            arrR.push(nums[i]);
        }
    }
}


function swap(A, i, j) {
    const t = A[i];
    A[i] = A[j];
    A[j] = t;
  }
  
  /**
   *
   * @param {*} A  数组
   * @param {*} p  起始下标
   * @param {*} r  结束下标 + 1
   */
  function divide(A, p, r) {
    const x = A[r - 1];
    let i = p ;
  //[1,2,3,4, 5]
    for (let j = p; j < r - 1; j++) {
      if (A[j] <= x) {
        swap(A, i, j);
        i++;
      }
    }
  
    swap(A, i + 1, r - 1);
  
    return i + 1;
  }
  
  /**
   * 
   * @param {*} A  数组
   * @param {*} p  起始下标
   * @param {*} r  结束下标 + 1
   */
  function qsort(A, p = 0, r) {
    r = r || A.length;
  
    if (p < r - 1) {
      const q = divide(A, p, r);
      qsort(A, p, q);
      qsort(A, q + 1, r);
    }
  
    return A;
  }

  // [12,123,2,3,8]
//    [2,123,12,3,8]
//    [2,3,12,123,8]
//    [2,3,8,12,123]

   var partion = function(nums,l,r){
       const x = nums[r];
       let i = l;
       for (let j=l;j<r;++j){
           if(nums[j]<x){
               swap(nums,i,j);
               i++;
           }
       }
       swap(nums,i,r);
       return i;
   }
   var quickSort = function(nums,l,r,index){
       let left = l || 0;
       let right =  r || nums.length-1;
       let pivot;
       if(left<right){
           pivot = divide(nums,left,right);
           if(pivot === index){
               return nums[pivot];
           }else{
               return pivot < index ? quickSort(nums,pivot+1,right,index): quickSort(nums,left,pivot-1);
           }
       }
       return pivot; 
   }

   var findK = function(nums,k){
      return quickSort(nums,0,nums.length-1,nums.length-k);
   }

   class EventBus{
       constructor(){
           this.events = Object.create(null);
       }
       on(name,fn){
        if(!this.events[name]){
            this.events[name]=[];
        }
        this.events[name].push(fn);
       }
       emit(name,...args){
        this.events[name] && this.events[name].forEach((fn)=>{
            fn(...args);
        });
       }
       off(name,cb){
           if(this.events[name]){
                const index = this.events[name].findIndex((fn)=>fn===cb);
                this.events[name].splice(index,1);
                if(!this.events[name].length){
                    delete this.events[name];
                }
           }
       }
       once(name,fn){
           const callback = (...args)=>{
            fn(...args);
            this.off(name,fn);
           }
           this.on(name,callback);
       }
   }

   react fiber
   实现策略主要是将react 元素的执行栈转化成链表，这样就保存执行上下文。链表移动更好可以随时暂停，
   不用重新递归生成上下文
   使用requestIdleCallBack限制任务进行的最长时间。
   核心：  将以前的react树转化成链表，
   使用requeIdleCallBack分批执行，限制任务的最大执行时间。

   react 自己实现了 requestIdleCallback（）

其他优化手段：
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



react diff

tree diff  同一层比较时间复杂度是O(n);
传统的时间复杂度是o（n3）
如果当前节点不一样，则当前节点的子树将被整体替换。

组件diff：
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
