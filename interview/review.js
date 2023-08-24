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

[1, 2, 3].reduce((acc, cur, index, arr) => {
  return acc + cur;
}, 0);

//mock reduce
//in operation with array depends on its index
//[,2,3] => 0 in [,2,3]  output: false
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
    let preset = false;
    while (k < len) {
      if (k in this) {
        preset = true;
        break;
      }
      k++;
    }
    if (!preset) throw new TypeError("empty with no initial value");
    acc = this[k];
  } else {
    acc = initial;
  }
  console.log(acc);
  //[2,3,,4]
  while (k < len) {
    if (k in this) {
      acc = fn(acc, this[k], k, this);
    }
    k++;
  }
  return acc;
};
[1, 100].MyReduce((a, b) => a + b); //102

//new implemention
var MockNew = function (func) {
  if (typeof func !== "function") {
    throw new TypeError("not a function!");
  }
  var obj = Object.create(null);
  obj._proto_ = func.prototype;
  var result = func.call(obj, ...arguments);
  return result && typeof result === "object" ? result : obj;
};

//继承：主要围绕着属性的继承和方法的继承
//1.原型链继承
function SuperType() {
  this.property = true;
}
SuperType.prototype.getSuperValue = function () {
  return this.property;
};
function SubType() {
  this.subproperty = false;
}
// 继承 SuperType
SubType.prototype = new SuperType(); //使用父对象实例的继承自上而下，不会让子对象修改到父对象的原型方法或者属性
SubType.prototype.getSubValue = function () {
  return this.subproperty;
};
let instance = new SubType();
console.log(instance.getSuperValue()); // true

//问题1：父类的实例属性变成了子类的原型属性在所有的子类实例中共享
//问题2：子类实例化时不能给父类构造函数传参，或者说在传参的时候会影响到所有子类实例

//2.经典继承
//解决了原型链的问题诞生
function SubType(name) {
  SuperType.call(this, name); //解决了子类不能向父类传参的问题并且不会影响到其他子类实例
}
//问题：方法都在构造函数中定义，每次创建实例都会调用一遍方法，无法实现函数复用

//3。组合继承
//在1的基础上使用2覆盖了原型属性和方法，这样避免了属性的共享问题和子类向父类传参的问题同时也解决了函数没办法复用问题
//但是导致父类的构造函数使用了两次，一次是在子类的原型上，一次是在子类的构造函数中，如果在父类构造函数里面做了一些耗时初始化操作需要注意
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name); //第二次调用SuperType()
  this.age = age;
}
SubType.prototype = new SuperType(); //第一次调用SuperType()
SubType.prototype.sayAge = function () {
  console.log(this.age);
};
let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29
let instance2 = new SubType("Greg", 27);
console.log(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27

//使用delete删除color属性后，父类的实例属性变成原型属性的问题又会暴露出来，组合继承只是覆盖了这个原型属性而已
delete instance2.colors;
console.log(instance2.colors); //['red', 'blue', 'green']
delete instance1.colors;
console.log(instance1.colors); //['red', 'blue', 'green']
instance1.colors.push("black");
console.log(instance1.colors); //['red', 'blue', 'green', 'black']
console.log(instance2.colors); //['red', 'blue', 'green', 'black']

//6.寄生组合继承
//解决上述方式的父类构造函数调用两次的问题
//解决方式：通过盗用构造函数继承属性，但使用混合式原型链继承方法。基本思路是不通过调用父类构造函数给子类原型赋值，而是取得父类原型的一个副本。
//说到底就是使用寄生式继承来继承父类原型，然后将返回的新对象赋值给子类原型。
function inheritPrototype(subType, superType) {
  let prototype = object(superType.prototype); // 创建对象
  prototype.constructor = subType; // 增强对象
  subType.prototype = prototype; // 赋值对象
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
  console.log(this.age);
};

//4.原型继承
//于这种情况：你有一个对象，想在它的基础上再创建一个新对象。
//你需要把这个对象先传给 object()，然后再对返回的对象进行适当修改
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
//这里使不自定义类型，所以就无法形成链，仍然可以通过原型实现对象之间的信息共享即对象的浅复制（shallow copy）
//标准实现 object.create()

//5.寄生继承
//在原型继承的基础上增强对象，返回构造函数的新实例
//承同样适合主要关注对象，而不在乎类型和构造函数的场景。object()函数不是寄生式继承所必需的，任何返回新对象的函数都可以在这里使用。
//缺点：通过寄生式继承给对象添加函数会导致函数难以重用（每次创建对象都会创建一遍函数），与构造函数模式类似。
function createAnother(original) {
  let clone = object(original); // 通过调用函数创建一个新对象
  clone.sayHi = function () {
    // 以某种方式增强这个对象
    console.log("hi");
  };
  return clone; // 返回这个对象
}

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

//4.寄生组合式继承
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

//节流：以固定频率触发函数。适用场景：OnScoll，每隔一段时间触发处理函数
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

var throttle = function (fn, wait) {
  let pre = 0;
  return function () {
    const now = performance.now(); //get current time
    const remaining = wait - Math.max(now - pre, 0); //get the remaining time
    if (remaining <= 0) {
      fn.call(this, ...arguments);
      pre = now;
    }
  };
};

// 但是我有时也希望无头有尾，或者有头无尾，这个咋办？
// 那我们设置个 options 作为第三个参数，然后根据传的值判断到底哪种效果，我们约定:
// leading：false 表示禁用第一次执行
// trailing: false 表示禁用停止触发的回调

function throttle(func, delay, options) {
  let pre = 0;
  let context, args, timer;
  return function () {
    const now = +new Date();
    pre = options.leading == false ? now : 0;
    const remaining = delay - (now - pre);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      func.call(context, args);
      pre = now;
      if (!timeout) context = args = null;
    } else {
      if (options.trailing) {
        timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          func.call(context, args);
          pre = +new Date();
        }, remaining);
        if (!timeout) context = args = null;
      }
    }
  };
}

//防抖：防呆操作类似用户重复点击按钮的操作，多次点击但是只有一次点击有效。适用场景：OnScrollEnd,在停止滑动一段时间后触发处理函数
function debounce_leading(func, timeout = 300) {
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}

//链表翻转
//1-2-3-4 4-3-2-1
function ListNode(v) {
  this.val = v;
  this.next = null;
}

const reverseList = (node) => {
  let head = null;
  let current = node;
  // 1->null   2->3->4   1->null->2  3->4
  while (current) {
    let next = current.next; //2->3->4
    current.next = head; //1-> null
    head = current; //1->null
    current = next; //2->3->4
  }
  return head;
};

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

var trim = function (s) {
  return s
    .toString()
    .replace(/\s*\s$/g, "")
    .replace(/^\s\s*/g, "");
};

let deepClone = function (target, map = new Map()) {
  if (typeof target == "object") {
    let cloneObj = Array.isArray(target) ? [] : {};
    let result = map.get(target);
    if (result) {
      return result;
    }
    map.set(target, result);
    //回溯
    for (let key in target) {
      cloneObj[key] = deepClone(target[key]);
    }
  } else {
    return target;
  }
};

//3.v
var pip = (x) => (y) => (z) => x + y + z;

//4. 大数相加
//12345 + 345
//12345
//00345
var bigAdd = function (a, b) {
  const max = Math.max(a.length, b.length);
  a = a.padStart(max, "0");
  b = b.padStart(max, "0");
  let remaining = 0;
  let res = "";
  for (let i = max - 1; i >= 0; --i) {
    const left = a[i];
    const right = b[i];
    let result = parseInt(left) + parseInt(right) + remaining;
    res = (result % 10) + res; //90
    remaining = Math.floor(result / 10); //1
  }
  return remaining ? remaining + res : res;
};

//5.flat [[2,3,1],1,[[[2]]]] => [2,3,1,1,2]
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
    res += s[s.length - i]; //res +=s.slice(-i,1-i)
  }
  return res;
};

//7.数组去重复
//[2,2,2,3,2,4] => [2,3,4]
const distinct = function (arr) {
  return arr
    .sort((a, b) => a - b)
    .reduce((acc, cur, index, arr) => {
      if (acc.length === 0 || arr[index - 1] != cur) {
        acc.push(cur);
      }
      return acc;
    }, []);
};

let arr = [2, 2, 2, 3, 2, 4];
console.log(distance(arr));

//8.素数
//isPrime
//1 3 4 5
//1 4  2 2
//6   2 3 3 2  22 33
//8   2 4 4 2
//9   3 3 3 3
var isPrime = function (num) {
  if (num < 2) return;
  let end = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= end; i++) {
    if (num % i === 0) return false;
  }
  return true;
};
console.log(isPrime(6)); //false

//9.countPrime
//better method : https://zhuanlan.zhihu.com/p/569221288
var countPrime = function (n) {
  if (n < 1) return 0;
  if (n === 1) return 1;

  let res = new Array(n).fill(1);
  let count = 1;
  for (let i = 2; i <= n; ++i) {
    if (isPrime(i)) {
      for (let j = i * i; j < n; j += i) {
        res[j] = 0;
      }
      count++;
    }
  }
  return count;
};

console.log(countPrime(11)); //6

//10.回文数
// 1221 reverse still 1221
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
