//箭头函数
var triple = (x) => {
  return 3 * x;
};
var triple_simple = (x) => 3 * x;
var sum_simple = (x, y) => x + y;
var sum_normal = (x, y) => {
  return x + y;
};
var sum = (x, y) => x + y;
var sum = new Function("num1", "num2", "return num1 + num2"); // 不推荐
/*我们不推荐使用这种语法来定义函数，因为这段代码会被解释两次：第一次是将它当作常规
ECMAScript 代码，第二次是解释传给构造函数的字符串。这显然会影响性能。不过，把函数想象为对
象，把函数名想象为指针是很重要的。*/

//理解参数 argument 只有在参数传入时才被构造
function printLen() {
  console.log(arguments.length);
}
printLen(1); //1
printLen(1, 2, 3); //3
function alterArgs(num, num2) {
  arguments[1] = 10;
  console.log(num, num2);
}
alterArgs(1, 2); //1 10 这里的num2 与arguments[1] 同步值但是不指向同一个内存，且在严格模式下无效并报错

//没有重载
function printNum(num) {
  console.log(num);
}

function printNum(num, num2) {
  console.log(num + num2);
}
printNum(10); //110
//模拟重载
function mock(num, num2) {
  if (arguments.length === 1) {
    console.log(num);
  } else if (arguments.length === 2) {
    console.log(num + num2);
  }
}

//默认参数值
function sayName(name = "Alan") {
  console.log(name);
}
sayName(); //Alan

function sayName(name = "Alan", nickName = name) {
  console.log(name);
}
sayName("faaccy"); //faaccy faaccy

// function sayName(name = nickName, nickName = 'Alan') { //error 参数是按顺序初始化的第一个参数不能使用第二参数
//     console.log(name);
// }

// function sayName(name = 'Alan', nickName = defaultName) {
//     let defaultName = 'Lisa'; //error 参数只在自己的作用域不能使用函数体的变量
//     console.log(name);
// }
//参数扩展与收集
function sum() {
  let res = 0;
  for (let index = 0; index < arguments.length; index++) {
    res += arguments[index];
  }
  return res;
}
const sequence = [1, 2, 5];
sum(...sequence);
sum(-1, ...sequence, 2);

function Add(...nums) {
  return nums.reduce((x, y) => x + y, 0);
}

// function Remove(...nums, name) { //error 和其他语言一样可变参数要放放到后面，因为收集参数的可变程序无法正常获取到name参数的索引

// }

//函数声明和函数表达式
var f = function () {};
//函数声明
function f() {}
//函数作为值 : 回调函数

//函数内部 ：arguments callee this
function factorial(num) {
  if (num < 2) return 1;
  return num * arguments.callee(num - 1); //callee递归调用函数本身与函数名解欧，也不担心后续函数名发生变化
}
//this在普通函数和箭头函数中的区别
//在标准函数中，this引用把函数当作方法调用的上下文
var color = "blue";

function test() {
  console.log(this.color);
}
test(); //blue this=window
//在箭头函数中，this引用的是定义箭头函数的上下文
var obj = {
  color: "red",
};
const sayColor = (c) => {
  console.log(this.color);
};
obj.sayColor = sayColor;
obj.sayColor(); //blue

function asyncWorker() {
  this.color = "white";
  setTimeout(() => {
    console.log(this.color); //white
  }, 0);
}

//caller
function printCaller() {
  console.log(printCaller.caller);
}
//new.target
function kings() {
  if (!new.target) {
    console.log("not instant by keyword new");
  } else {
    console.log("new kings");
  }
}
new kings(); //new kings
//函数属性和方法 length prototype call bind apply

//函数表达式

//递归
arguments.callee();
//尾调用优化
function outerFunction() {
  return innerFunction(); // 尾调用
}
//闭包：闭包指的是那些引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现的。
function createCompare(name) {
  return function (o1, o2) {
    let v1 = o1[name];
    let v2 = o2[name];
    if (v1 < v2) {
      return -1;
    } else if (v1 > v2) {
      return 1;
    } else {
      return 0;
    }
  };
}
//立即调用的函数表达式(IIFE):模拟块级作用域 锁定索引

//私有变量：闭包 特权方法
function Person() {
  let name = "name";
  return function () {
    return name;
  };
}

function Person() {
  let name = "faaccy"; //私有变量

  function sayName() {
    //私有方法
    return name;
  }
  //特权方法
  this.GetName = function () {
    console.log("get name");
    return sayName();
  };
}

function Person(name) {
  this.getName = function () {
    return name;
  };
  this.setName = function (value) {
    name = value;
  };
}
//10.16.1静态私有变量：解决上述通过构造函数定义函数访问私有变量会导致每次实例化都会创建新的方法和变量
//2.模块模式
//3.模块增强

//私有变量
class Device {
  #readHandle;
  constructor() {
    super();
  }
  get ReadHandle() {
    return this.#readHandle;
  }
}
