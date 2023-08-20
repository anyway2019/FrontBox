let colors = new Array();
let colorsFixed = new Array(20);
let colorsInital = new Array("red", "blue", "yellow");

let colorsS = Array();
let colorsFixedS = Array(20);
let colorsInitalS = Array("red", "blue", "yellow");

let colorsL = ["red", "blue", "green"]; // 创建一个包含 3 个元素的数组
let names = []; // 创建一个空数组
let values = [1, 2]; // 创建一个包含 2 个元素的数组

//Array.from()
console.log(Array.from("hello")); //['h','e','l','l','o']

const m = new Map().set(1, 2).set(3, 4);
console.log(Array.from(m)); //[ [ 1, 2 ], [ 3, 4 ] ]

const s = new Set().add(1).add(2);
console.log(Array.from(s)); //[1,2]

const iterator = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
  },
};
console.log(Array.from(iterator)); //[1,2]

const o = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4,
};
console.log(Array.from(o)); //[1,2,3,4]

const ops = [1, 2, 3, 4];
console.log(Array.from(ops, (x) => x * x)); //[ 1, 4, 9, 16 ]

//Array.of()
// Array.of()可以把一组参数转换为数组。这个方法用于替代在 ES6 之前常用的 Array.prototype.
//slice.call(arguments)，一种异常笨拙的将 arguments 对象转换为数组的写法：

//数组空项目
const empty = [1, , , , , 5];
console.log(Array.from(empty)); //[ 1, undefined, undefined, undefined, undefined, 5 ]

for (const item of empty) {
  console.log(item);
}

for (let index = 0; index < empty.length; index++) {
  const element = empty[index];
  console.log(element);
}
//map forEach 忽略空项
console.log(
  empty.map((x) => {
    console.log(x);
    return 6;
  })
); //1,5//[ 6, <4 empty items>, 6 ]

empty.forEach((x) => console.log(x)); //1,5

//数组索引与length
const demos = ["red", "yellow", "blue"];
demos[3] = "grey";
console.log(demos.length); //4
demos[99] = "green";
console.log(demos.length); //100

demos.length = 2;
console.log(demos); //['red', 'yellow']

demos[demos.length] = "new one";
demos[demos.length] = "another one";
console.log(demos); //[ 'red', 'yellow', 'new one', 'another one' ]

//检测数组
console.log(demos instanceof Array); //true
console.log(Array.isArray(demos)); //true

//数组迭代器方法
console.log(demos.keys().next()); //{ value: 0, done: false }
console.log(demos.values().next()); //{ value: 'red', done: false }
console.log(demos.entries().next()); //{ value: [ 0, 'red' ], done: false }

const keylist = Array.from(demos.keys());
console.log(keylist); //[ 0, 1, 2, 3 ]
const valueslist = Array.from(demos.values());
console.log(valueslist); //[ 'red', 'yellow', 'new one', 'another one' ]

//ES6数组解构
for (const [index, value] of demos.entries()) {
  console.log(index, value);
}

//复制和填充  fill()  copyWithin()
let indexs = [];

indexs.fill(6);
console.log(indexs); //[]

indexs.fill(6, 0, 5);
console.log(indexs); //[]

indexs = Array(5).fill(0);
console.log(indexs); //[0,0,0,0,0]

indexs.fill(6);
console.log(indexs); //[6,6,6,6,6]

indexs.fill(7, 4, 999);
console.log(indexs); //[ 6, 6, 6, 6, 7 ]
let ints,
  reset = () => (ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
reset();
ints.copyWithin(5);
console.log(ints);
reset();
ints.copyWithin(0, 5);
console.log(ints);
reset();
ints.copyWithin(4, 0, 3);
console.log(ints);
reset();
ints.copyWithin(2, 0, 6);
console.log(ints);
reset();
ints.copyWithin(-4, -7, -3);
console.log(ints);
//fill 与 copyWithin 索引部分可以用就值复制或填充可用部分

//转换方法 toLocalString toString
let localArray = [
  {
    value: "name",
    toLocaleString() {
      return "localname";
    },
    toString() {
      return "name";
    },
  },
];
console.log(localArray.toLocaleString()); //localname
//push pop去尾
let stack = [];
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); //3
//shift 掐头
let queue = [];
queue.push(1);
queue.push(2);
queue.push(3);
console.log(queue.shift()); //1
//unshift 头部添加元素  返回值为当前数组长度
queue.unshift();
queue.unshift(4);
queue.unshift(5, 6, 7);
console.log(queue); //[5,6,7,4,2,3]
//sort
let sortArray = [1, 5, 15, 25, 33];
console.log(sortArray.sort()); //[1,15,25,33,5] 字符串比较

// compareFn(a, b) return value	sort order
// > 0	sort a after b, e.g. [b, a]
// < 0	sort a before b, e.g. [a, b]
// === 0	keep original order of a and b
function compare(x, y) {
  if (x > y) {
    return 1;
  } else if (x < y) {
    return -1;
  } else {
    return 0;
  }
}
console.log(sortArray.sort(compare)); //[1, 5, 15, 25, 33]
// Note that the array is sorted in place, and no copy is made.
console.log(sortArray); //[1, 5, 15, 25, 33]
console.log(sortArray.sort((x, y) => y - x));
//If the source array is sparse, the empty slots are moved to the end of the array, and always come after all the undefined.

let needReverse = [1, 2, 3, 4];
console.log(needReverse.reverse()); //[ 4, 3, 2, 1 ]
console.log(needReverse); //[ 4, 3, 2, 1 ]

//数组操作方法 concat  slice splice
let a1 = [1, 2, 3];
let a2 = [4, 5, 6];
console.log(a1.concat(a2)); //[ 1, 2, 3, 4, 5, 6 ]
console.log(a1); //[ 1, 2, 3 ]
console.log(a2); //[ 4, 5, 6 ]
console.log(
  a1.concat(2).concat([
    [1, 8, 3],
    [2, 4, 6],
  ])
); //[ 1, 2, 3, 2, [ 1, 8, 3 ], [ 2, 4, 6 ] ]
//concat有一个参数【Symbol.isConcatSpreadable】可以强制拉平数组也可以禁用这一特性
a1[Symbol.isConcatSpreadable] = false;
console.log(a2.concat(a1)); //[ 4, 5, 6, [ 1, 2, 3, [Symbol(Symbol.isConcatSpreadable)]: false ] ]
let a3 = {
  [Symbol.isConcatSpreadable]: true,
  0: 4,
  1: 5,
  length: 2,
};
console.log(a2.concat(a3)); //[ 4, 5, 6, 4, 5 ]

let b1 = [1, 2, 3, 4, 5, 6];
console.log(b1.slice(2)); //[3,4, 5, 6]
console.log(b1); //[1, 2, 3, 4, 5, 6];

console.log(b1.slice(1, 2)); //[2]
console.log(b1.slice(-2, -1)); //[5]
let b2 = [{ name: "leery" }, { name: "faaccy" }];
let b3 = b2.slice(1);
b3.forEach((e) => {
  e.name = "test";
});
console.log(b3); //[ { name: 'test' } ]
console.log(b2); //[ { name: 'leery' }, { name: 'test' } ]

//splice 删除 替换 插入
let del = [1, 2, 3, 4, 5, 6];
del.splice(1, 1);
console.log(del); //[ 1, 3, 4, 5, 6 ]
del.splice(1, 2);
console.log(del); // 1, 5, 6 ]

del.splice(1, 1, 1, 2, 3, 4);
console.log(del); //[ 1, 1, 2, 3, 4, 6 ]

del.splice(1);
console.log(del); //[1]

del.splice(1, 0, 2, 3, 4, 5, 6);
console.log(del);

//query 严格相等 断言函数 find findIndex
const evens = [2, 4, , 6];
const e = evens.find((current, index, array) => {
  return current === 4;
});
console.log(e);

//迭代方法 every some forEach map filter 都不改变原有数组
const res = evens.filter((cur, index, array) => {
  console.log(index, cur); //filter 同样会忽略空项
  return cur > 2;
});
console.log(res);

//归并 reduce reduceRight
let seq = [1, 2, 3, 4, 5, 6];
seq.reduce((pre, cur, index, arr) => {
  console.log(pre, cur, index, arr);
  return cur;
}, 0);

seq.reduceRight((pre, cur, index, arr) => {
  console.log(pre, cur, index, arr);
  return cur;
}, 0);
