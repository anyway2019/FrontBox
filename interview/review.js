//catch之后依然可以传递error
Promise.reject(1)
  .catch((err) => {
    return err;
    //throw err;  //this can stop promise with uncaught exception
  })
  .then((e) => {
    console.log(e);
  });
//1 reject 1 => catch return 1=> then

//2个栈实现队列
class CustomeQueue {
  head = [];
  tail = [];
  push(num) {
    this.head.push(num);
  }
  pop() {
    const length = this.head.length;
    for (let i = length - 1; i >= 0; --i) {
      this.tail[length - i] = this.head[i];
    }
    return this.tail.pop();
  }
}

const queue = new CustomeQueue();
queue.push(1);
queue.push(2);
queue.pop(); //1

//连续数字
//[0,1,2,4,5,7,13,15,16] => 0,1,2  4,5 7 13 15,16
const findRange = function (nums) {
  let buffer = [nums[0]];
  let result = [];
  for (let i = 1; i < nums.length; ++i) {
    if (buffer[buffer.length - 1] + 1 == nums[i]) {
      buffer.push(nums[i]);
    } else {
      result.push(buffer);
      console.log(buffer);
      buffer = [nums[i]];
    }
  }

  buffer.length && result.push(buffer);
  console.log(buffer);

  return result;
};

findRange([0, 1, 2, 4, 5, 7, 13, 15, 16]);
//0,1,2  4,5  7 13 15,16

//同步任务 宏观任务和微观任务
async function async1() {
  console.log("2"); //2
  await async2();
  console.log("6"); //6
  async function async2() {
    console.log("3"); //3
  }
}

console.log("1"); //1

setTimeout(function () {
  console.log("8"); //8
}, 0);

async1();

//output: 1 2 3 6 8

new Promise(function (resolve) {
  console.log("4"); //4
  for (var i = 100; i < 1000000; i++) {
    console.log(i);
  }
  resolve();
}).then(function () {
  console.log("7"); // 7
});
console.log("5"); //5

//output: 4， 100~ 1000000, 5，7

//函数柯里化。
const curry = function (fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
};

function add(a, b, c) {
  return a + b + c;
}

let curried = curry(add);
curried(1)(2)(3); //6

//二分查找
function binarySearch(arr, target) {
  let p = parseInt((arr.length - 1) / 2);
  if (arr[p] === target) return p;
  if (arr[p] > target) {
    return binarySearch(arr.slice(0, p), target);
  } else {
    return binarySearch(arr.slice(p), target);
  }
}

//不用递归的二分查找
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  let p = parseInt((high - low) / 2);

  while (low <= high) {
    p = parseInt((high - low) / 2);
    if (arr[p] === target) {
      return p;
    }

    if (arr[p] < target) {
      low = p + 1;
    }
    if (arr[p] > target) {
      high = p - 1;
    }
  }

  return -1;
}

//reduce
Array.prototype.MyReduce = function (fn, initial) {
  if (!fn || typeof fn !== "function") {
    throw new TypeError("fn not a funtion");
  }
  if (this.length === 0 && !initial) {
    throw new TypeError("empty array with no initial");
  }

  let len = this.length >>> 0;
  let k = 0;
  let acc;
  if (!initial) {
    //[,,,] [,,,3,,4]
    let preset = false;
    while (k < len) {
      if (this[k] in this) {
        preset = true;
        break;
      }
      k++;
    }
    if (!preset) {
      throw new TypeError("empty with no initial value");
    }
    acc = this[k];
  } else {
    acc = initial;
  }
  //[2,3,,4]
  while (k < len) {
    if (this[k] in this) {
      fn(acc, this[k], k, this);
    }
    k++;
  }
  return acc;
};

//中序遍历
var inorder = function (treeNode) {
  if (!treeNode) return;
  inorder(treeNode.left);
  console.log(treeNode.val);
  inorder(treeNode.right);
};
var inorderStack = function (treeNode) {
  if (!treeNode) return;
  const stack = [];
  const res = [];
  stack.push(treeNode);
  while (stack.length > 0) {
    const node = stack.pop();
    res.push(node);
    stack.push(node.right);
    stack.push(node.left);
  }
  return res.reverse();
};

//new implemention
var newFactory = function (func) {
  if (typeof func !== "function") {
    throw new TypeError("not a function!");
  }
  var obj = Object.create(null);
  obj._proto_ = func.prototype;

  var result = func.call(obj, ...arguments);
  return result && typeof result === "object" ? result : obj;
};

//组合继承 组合了 原型链的继承 和 经典继承
function Parent(name) {
  this.name = name;
}
Parent.prototype.sayName = function () {
  console.log(this.name);
};
function Child(name, age) {
  this.age = age;
  Parent.call(this, name); //继承属性
}
Child.prototype = new Parent(); //继承方法

//手写寄生组合式继承
function object(o) {
  function f() {}
  f.prototype = o;
  return new f();
}
function prototype(sub, parent) {
  let prototype = object(parent.prototype);
  prototype.constuctor = sub;
  sub.prototype = prototype;
}

function prototype(sub, parent) {
  var obj = Object.create(parent.prototype);
  obj.constuctor = sub;
  sub.prototype = obj;
}

//防抖 触发多次以最后一次触发为准n秒后调用触发函数
var debounce = function (fn, delay, immediate) {
  if (typeof fn !== "function") {
    throw new TypeError("not a function");
  }
  let timer;
  let result;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      var callNow = !timer;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = fn.apply(context, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, delay);
    }
    return result;
  };
};

//节流
var throttle = function (fn, wait) {
  let pre = 0;
  return function () {
    const now = performance.now();
    const remaining = now - pre;
    if (remaining > wait) {
      fn.call(this, ...arguments);
      pre = now;
    }
  };
};

//链表翻转
//1-2-3-4 4-3-2-1
function ListNode(v) {
  this.val = v;
  this.next = null;
}
var reverseList = function (node) {
  let head = null;
  let current = node;
  while (current) {
    const next = current.next;
    current.next = head;
    head = current;
    current = next;
  }
  return head;
};

//promise
function MyPromise() {
  this.state = "";
  this.resolves = [];
  this.rejects = [];
  this.resolve = function (fn) {
    if (this.state === "pending") {
      this.state = "fullfilled";
    }
    this.resolves.push(fn);
  };
  this.reject = function (fn) {
    if (this.state === "pending") {
      this.state = "rejected";
    }
    this.rejects.push(fn);
  };
  this.then = function (OnResolved, OnRejected) {
    let self = this;
    let promise2;

    OnResolved =
      typeof OnResolved === "function"
        ? OnResolved
        : function (res) {
            return res;
          };
    OnRejected =
      typeof OnRejected === "function"
        ? OnRejected
        : function (err) {
            throw err;
          };

    if (self.status === "resolved") {
      return (promise2 = new Promise(function (resolve, reject) {
        try {
          const x = OnResolved(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          } else {
            resolve(x);
          }
        } catch (e) {
          reject(e);
        }
      }));
    }
    if (self.status === "rejected") {
      return (promise2 = new Promise(function (resolve, reject) {
        try {
          const x = OnRejected(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
          reject(x);
        } catch (e) {
          reject(e);
        }
      }));
    }

    if (self.status === "pending") {
      return (promise2 = new Promise((resolve, reject) => {
        self.resolves.push(function (v) {
          try {
            const x = OnResolved(v);
            if (x instanceof Promise) {
              x.then(resolve, reject);
            }
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });

        self.rejects.push(function (e) {
          try {
            const x = OnRejected(e);
            if (x instanceof Promise) {
              x.then(resolve, reject);
            }
            reject(e);
          } catch (e) {
            reject(e);
          }
        });
      }));
    }

    return new Promise();
  };
  this.catch = function (OnRejected) {
    return this.then(null, OnRejected);
  };
}

//千分位
var th = function (x) {
  var s = String(x);
  let res = "";
  // 12 ,345
  while (s.length > 3) {
    res = "," + s.slice(-3) + res;
    s = s.slice(0, s.length - 3);
  }
  return s + res;
};

//new
var create = function (func) {
  let obj = Object.create(null);
  obj._proto_ = func.prototype;
  var result = func.call(obj);
  return result && typeof result === "object" ? result : obj;
};

//组合继承
function Parent(name) {
  this.name = name;
}
Parent.prototype.sayName = function () {
  console.log(this.name);
};
function Child(age) {
  this.age = age;
  Parent.call(this);
}
Child.prototype = new Parent();

//节流
var throttle = function (func, wait) {
  let pre = 0;
  return function () {
    let self = this;
    let args = arguments;
    const now = +new Date();
    const remaining = now - pre;
    if (remaining > wait) {
      func.apply(self, args);
      pre = now;
    }
  };
};

//防抖
var debounce = function (fn, wait, immediate) {
  let timer;
  let result;
  return function () {
    let self = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) {
        result = fn.apply(self, args);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(self, args);
        timer = null;
      }, wait);
    }
  };
};

//promise
function Promise(excutor) {
  let self = this;
  this.status = "pending";
  this.resolveCallBack = [];
  this.rejectCallBack = [];
  function Resolve(v) {
    if (self.status === "pending") {
      self.status = "fulfilled";
    }
    for (let i = 0; i < self.resolveCallBack.length; ++i) {
      self.resolveCallBackp[i].resolve(v);
    }
  }
  function Reject(v) {
    if (self.status === "pending") {
      self.status = "rejected";
    }
    for (let i = 0; i < self.rejectCallBack.length; ++i) {
      self.rejectCallBack[i].reject(v);
    }
  }
}

Promise.prototype.then = function (OnResolved, OnRejected) {
  let promise2;
  OnResolved =
    typeof OnResolved === "function"
      ? OnResolved
      : function (v) {
          return v;
        };
  OnRejected =
    typeof OnRejected === "function"
      ? OnRejected
      : function (e) {
          throw e;
        };

  if (self.status === "fulfilled") {
    return (promise2 = new Promise((resolve, reject) => {
      try {
        const x = OnResolved(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        }
        resolve(x);
      } catch (e) {
        reject(e);
      }
    }));
  }
  if (self.status === "rejected") {
    return (promise2 = new Promise((resolve, reject) => {
      try {
        const x = OnRejected(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        }
        reject(x);
      } catch (e) {
        reject(e);
      }
    }));
  }
  if (self.status === "pending") {
    return (promise2 = new Promise((resolve, reject) => {
      try {
        self.resolveCallBack.push(function (v) {
          const x = OnResolved(v);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
          resolve(x);
        });
      } catch (e) {
        reject(e);
      }

      self.rejects.push(function (e) {
        try {
          const x = OnRejected(e);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
          reject(e);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
};

var trim = function (s) {
  return s
    .toString()
    .replace(/\s*\s$/g, "")
    .replace(/^\s\s*/g, "");
};

var deepClone = function (target, map = new Map()) {
  if (typeof target === "object") {
    let cloneObj = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneObj);
    for (let l in target) {
      cloneObj[l] = deepClone(target[l]);
    }
  } else {
    return target;
  }
};

//3.v
var pip = (x) => (y) => (z) => x + y + z;

//4. 12345  456
var bigNumAdd = function (a, b) {
  const maxLen = Math.max(a.length, b.length);
  const padStrA = a.padStart("0", maxLen);
  const padStrB = b.padStart("0", maxLen);
  let temp = 0;
  let res = "";
  for (let i = maxLen - 1; i >= 0; --i) {
    const result = parseInt(padStrA[i]) + parseInt(padStrB[i]);
    res = (result % 10) + "" + temp;
    temp = Math.floor(result / 10);
  }
  if (temp > 0) {
    res = temp + res;
  }
  return parseInt(res);
};

//5.flat
var flat = function (arr) {
  arr.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      acc = acc.concat(flat(cur));
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
};

//6.字符串反转 123 321 *
var reverse = function (s) {
  let res = "";
  for (let i = 0; i < s.length; ++i) {
    res += s[s.length - i];
  }
  return res;
};

//7数组去重复
var distance = function (arr) {
  arr.sort().reduce((acc, cur, index, arr) => {
    if (acc.length === 0 || arr[index - 1] != cur) {
      acc.push(cur);
    }
    return acc;
  }, []);
};

//8.素数
var isPrime = function (n) {
  const sqrt = Math.sqrt(n);
  for (let i = 2; i <= sqrt; ++i) {
    if (i * i === n) {
      return false;
    }
  }
  return true;
};

//9.allPrime
var allPrime = function (n) {
  let res = new Array(n).fill(1);
  let count = 0;
  let sqrt = Math.sqrt(n);
  for (let i = 0; i <= sqrt; ++i) {
    if (isPrime(i)) {
      for (let j = i * i; j < n; ++i) {
        res[j] = 0;
      }
      count++;
    }
  }
  return count;
};

//10.par
var par = function (num) {
  if (num !== 0 && num % 10 === 0) return false;
  //1 21 1221 1 12
  let left = num;
  let right = 0;
  while (num > right) {
    right = (left % 10) + right * 10;
    left = Math.floor(left / 10);
  }
  return left === right || left === Math.floor(right / 10);
};

//千分位分隔符
var thou = function (s) {
  let res = "";
  let num = String(s);
  while (num.length > 3) {
    res = "," + num.slice(-3);
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    res = num + res;
  }
  return res;
};

//节流
var throttle = function (fn, wait) {
  let pre = 0;
  return function () {
    let self = this;
    let args = arguments;

    const now = +new Date();
    const remaining = now - pre;

    if (remaining > wait) {
      fn.apply(self, args);
    }
  };
};
// reverseTreeNode
///  1
///2   3
//4
var reverseTreeNode = function (node) {
  let temp;
  const stack = [];
  stack.push(node);
  while (stack.length > 0) {
    const root = stack.pop();
    if (root) {
      temp = root.left;
      root.left = root.right;
      root.right = temp;
      stack.push(root.left);
      stack.push(root.right);
    }
  }
};

//最短距离 for
//输入：s = "loveleetcode", c = "e"
//输出：[3,2,1,0,1,0,0,1,2,2,1,0]
var findNeareast = function (nums, c) {
  let pre = Math.MIN_SAFE_INTEGER;
  let res = [];
  for (let i = 0; i < nums.length; ++i) {
    if (nums.charAt(i) === c) {
      pre = i;
    }
    res[i] = i - pre;
  }

  for (let j = nums.length - 1; j < nums.length; ++j) {
    if (nums.charAt(j) === c) {
      pre = i;
    }
    res[i] = Math.max(res[i], pre - i);
  }
  return res;
};

var findNeareast = function (s, c) {
  const ans = [];
  let pre = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < s.length; ++i) {
    if (s.charAt(i) === c) {
      pre = i;
    }
    ans[i] = i - pre;
  }
  for (let i = s.length - 1; i >= 0; --i) {
    if (s.charAt(i) === c) {
      pre = i;
    }
    ans[i] = Math.min(ans[i], pre - i);
  }
  return ans;
};

//floor stair 爬楼梯
var stairs = function (n) {
  let l = 0;
  let p = 0;
  let r = 1;
  while (n > 0) {
    l = p;
    p = r;
    r = l + p;
    n--;
  }
  return r;
};

//合并两个排序的链表
// 1->2->3  1->2->4
var mergeList = function (l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  let temp;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      temp = l1.next;
      l1.next = l2;
      l2 = l2.next;
      l2.next = temp;
    }
  }
  return l1;
};

var mergeList = function (l1, l2) {
  let head = new ListNode(0);
  while (l2 && l1) {
    if (l1.val <= l2.val) {
      head.next = l1;
      l1 = l1.next;
    } else {
      head.next = l2;
      l2 = l2.next;
    }
    head = head.next;
  }
  head.next = l1 ? l1 : l2;
  return head.next;
};

//.环形列表
var isCircle = function (head) {
  if (!head || !head.next) return false;
  let slow = head;
  let fast = head.next;
  while (fast !== slow) {
    if (slow == null || fast == null) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  return true;
};

//.finbonacc
var finbona = function (n) {
  if (n < 2) {
    return n;
  }
  let l = 0;
  let p = 0;
  let r = 1;
  while (n > 1) {
    l = p;
    p = r;
    r = l + p;
    n--;
  }
  return r;
};

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
  let i = p;
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

var partion = function (nums, l, r) {
  const x = nums[r];
  let i = l;
  for (let j = l; j < r; ++j) {
    if (nums[j] < x) {
      swap(nums, i, j);
      i++;
    }
  }
  swap(nums, i, r);
  return i;
};

var quickSort = function (nums, l, r, index) {
  let left = l || 0;
  let right = r || nums.length - 1;
  let pivot;
  if (left < right) {
    pivot = divide(nums, left, right);
    if (pivot === index) {
      return nums[pivot];
    } else {
      return pivot < index
        ? quickSort(nums, pivot + 1, right, index)
        : quickSort(nums, left, pivot - 1);
    }
  }
  return pivot;
};

var findK = function (nums, k) {
  return quickSort(nums, 0, nums.length - 1, nums.length - k);
};

//事件总线 委托 发布/丁订阅
class EventBus {
  constructor() {
    this.events = Object.create(null);
  }

  on(name, fn) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(fn);
  }

  emit(name, ...args) {
    this.events[name] &&
      this.events[name].forEach((fn) => {
        fn(...args);
      });
  }

  off(name, cb) {
    if (this.events[name]) {
      const index = this.events[name].findIndex((fn) => fn === cb);
      this.events[name].splice(index, 1);
      if (!this.events[name].length) {
        delete this.events[name];
      }
    }
  }

  once(name, fn) {
    const callback = (...args) => {
      fn(...args);
      this.off(name, fn);
    };
    this.on(name, callback);
  }
}

function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

function debounce(fuc, wait, immediate) {
  var timeout;
  var result;
  var debounced = function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) result = fuc.apply(context, args);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fuc.apply(context, args);
      }, wait);
    }
    return result;
  };
  return debounced;
}

function throttle(func, wait) {
  let pre = new Date();
  return function () {
    let now = new Date();
    let context = this;
    let args = arguments;

    if (now - pre >= wait) {
      func.apply(context, args);
      pre = now;
    }
  };
}

var cookieAssign = function (g, s) {
  const childs = g.sort((a, b) => b - a);
  const cookies = g.sort((a, b) => b - a);
  let count = 0;
  //[10,9,8,7,6]
  //[7,6]
  for (let i = 0, j = cookies.length; i < childs.length, j > 0; ++i, --j) {
    while (childs[i] > cookies[j]) {
      i++;
    }

    //10 9 8
    if (i < childs.length && j > 0) {
      count++;
    }
  }
  return count;
};

cookieAssign([10, 9, 8, 7, 6], [7, 6]);
