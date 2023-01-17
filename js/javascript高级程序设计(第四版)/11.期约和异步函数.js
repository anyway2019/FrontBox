//11.1异步编程

const { reject } = require("lodash");
const { resolve } = require("path");

//setTimeout与回调 =》嵌套回调 =》回调地狱

//11.2.1promise
let p = new Promise(() => {});
console.log(p); //Promise { <pending> }

let presolved = new Promise((resolve, reject) => resolve());
console.log(presolved); //Promise { undefined }

let preRejected = new Promise((resolve, reject) => reject());
console.log(preRejected); //Promise { <rejected> undefined } // Uncaught error (in promise)
//11.2.3通过执行函数控制promose状态
//          pending
//          /     \
//resolved(value) rejected(reason)

//执行器函数是同步执行的，所以下列的先打印2后打印1
new Promise(() => {
    console.log(2);
    setTimeout(console.log, 0, 'executor');
});
setTimeout(console.log, 0, 'promise initialized');
console.log(1);

//promise 状态一旦定下来状态就不可更改了
let pSettled = new Promise((resolve, reject) => {
    resolve(1); //状态已经改变后续的操作不可改变promise的状态
    reject();
});
console.log(pSettled); //Promise { 1 }

//timeout promise 可以设定一个超时时间，超过指定的时间就让他状态定下来而不是维持在pending
let timeoutP = new Promise((resolve, reject) => {
    setTimeout(() => reject('timeout'), 10000);
    //something to do.
});
setTimeout(console.log, 0, p); // Promise <pending>
setTimeout(console.log, 11000, p); // 11 秒后再检查状态
// (After 10 seconds) Uncaught error
// (After 11 seconds) Promise <rejected>

//11.2.4 Promise.resolve() promise的初始状态不是必须pending
let p1 = new Promise((resolve, reject) => resolve('初始状态就是resolved的promise'));
let p2 = Promise.resolve('初始状态为resolved的promise');
//Promise.resolve()可以将任何值(包含错误对象)转化成promise的形式，它只接受一个传参。多余的参数忽略
let pnumber = Promise.resolve(1, 2, 3, 4);
console.log(pnumber); //Promise { 1 }
//Promise.resolve() 幂等方法
console.log(Promise.resolve(pnumber) === pnumber); //true

let errorP = Promise.resolve(new Error('error promise'));
console.log(errorP); //Promise { Error: error promise...

//11.2.5 Promise.reject 不具有幂等性，包含的对象会变成拒绝的理由
console.log(Promise.reject(Promise.resolve())); //Promise { <rejected> Promise { undefined } }
//11.2.6 同步/异步执行的二元性
try {
    Promise.reject(new Error('exception show up!'))
} catch (error) {
    console.log(error);
}
//UnhandledPromiseRejectionWarning: Error: exception show up!
//异步模式只有在异步结构去捕获，同步方法无法捕获异步方法的异常

//11.2.3 promise的实例方法 then catch finally 都返回新的promise实例

//抛出异常会返回拒绝的期约：
let pthen1 = Promise.resolve(1);
let pthen2 = pthen1.then(() => { throw 'baz'; }); // UnhandledPromiseRejectionWarning: baz
setTimeout(console.log, 0, pthen2); //Promise { <rejected> 'baz' }
//注意，返回错误值不会触发上面的拒绝行为，而会把错误对象包装在一个解决的期约中：
let pthen3 = pthen1.then(() => Error('qux'));
setTimeout(console.log, 0, pthen3); // Promise <resolved>: Error: qux

let preject1 = Promise.reject('foo');
let preject2 = preject1.then(); // 调用 then()时不传处理程序则原样向后传
//UnhandledPromiseRejectionWarning: foo
setTimeout(console.log, 0, preject2); //Promise { <rejected> 'foo' }

// Promise.prototype.catch() 
let preject3 = Promise.reject();
let onrejected = function(reason) {
    setTimeout(console.log, 0, reason);
}
preject3.catch(onrejected);
//equal to 
preject3.then(nul, onrejected);

//Promise.prototype.finally()


//非重入期约方法 :当期约进入落定状态时，与该状态相关的处理程序仅仅会被排期，而非立即执行
let pr = Promise.resolve(3);
pr.then(() => console.log(2));
console.log(1);
//11.3异步函数