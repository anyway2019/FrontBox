let colors = new Array();
let colorsFixed = new Array(20);
let colorsInital = new Array('red', 'blue', 'yellow');

let colorsS = Array();
let colorsFixedS = Array(20);
let colorsInitalS = Array('red', 'blue', 'yellow');

let colorsL = ["red", "blue", "green"]; // 创建一个包含 3 个元素的数组
let names = []; // 创建一个空数组
let values = [1, 2, ]; // 创建一个包含 2 个元素的数组

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
    }
}
console.log(Array.from(iterator)); //[1,2]

const o = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    length: 4,
}
console.log(Array.from(o)); //[1,2,3,4]

const ops = [1, 2, 3, 4];
console.log(Array.from(ops, x => x * x)); //[ 1, 4, 9, 16 ]

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
console.log(empty.map((x) => { console.log(x); return 6; })); //1,5//[ 6, <4 empty items>, 6 ]

empty.forEach((x) => console.log(x)); //1,5

//数组索引与length
const demos = ['red', 'yellow', 'blue'];
demos[3] = 'grey';
console.log(demos.length); //4
demos[99] = 'green';
console.log(demos.length); //100

demos.length = 2;
console.log(demos); //['red', 'yellow']

demos[demos.length] = 'new one';
demos[demos.length] = 'another one';
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
//复制和填充 copyWithin() fill()

//转换方法 toLocalString toString 

//stack push pop

//queue shift unshift

// 排序 reverse sort

//数组操作方法 concat splice slice 

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