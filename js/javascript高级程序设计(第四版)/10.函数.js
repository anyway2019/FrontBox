//箭头函数
var triple = x => { return 3 * x; };
var triple = x => 3 * x;
var sum = (x, y) => x + y;
var sum = (x, y) => {
    return x + y;
};
var sum = (x, y) => x + y;
let sum = new Function("num1", "num2", "return num1 + num2"); // 不推荐
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
function sayName(name = 'Alan') {
    console.log(name);
}
sayName(); //Alan

function sayName(name = 'Alan', nickName = name) {
    console.log(name);
}
sayName('faaccy'); //faaccy faaccy

function sayName(name = nickName, nickName = 'Alan') { //error 参数是按顺序初始化的第一个参数不能使用第二参数
    console.log(name);
}

function sayName(name = 'Alan', nickName = defaultName) {
    let defaultName = 'Lisa'; //error 参数只在自己的作用域不能使用函数体的变量
    console.log(name);
}
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
var f = function() {

};
//函数声明
function f() {

}
//函数作为值 : 回调函数

//函数内部
//函数属性和方法
//函数表达式
//递归
//尾调用优化
//闭包
//立即调用的函数表达式
//私有变量