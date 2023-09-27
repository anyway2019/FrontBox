//js包含两种类型的值：原始值和引用值
//原始值：String Number Boolean Undefined Null Symbol,按值访问，引用值顾名思义按内存地址访问即按引用访问

//动态属性
var p = new Object();
console.log(p.name); //undefined
p.name = "faaccy";
console.log(p.name); //faaccy

var primitive = "hello world";
primitive.name = "test";
console.log(primitive.name); //undefined

var wrapped = new String("hello world");
wrapped.name = "wrapped name";
console.log(wrapped.name); //wrapped name
//复制值
var str1 = "hello";
var str2 = str1;
str2 += "world";
console.log(str1); //hello
console.log(str2); //hello world

var wrapped = new String("hello");
var wrappedStr2 = wrapped;
wrapped.name = "test";
console.log(wrapped.name);
console.log(wrappedStr2.name);
//传递参数:无论原始值还是引用值传参都是按照值传递，引用传的是引用副本
function setName(obj) {
  obj.name = "Hello world";
  obj = new Object();
  obj.name = "faaccy";
}
var target = {};
setName(target);
console.log(target.name); //hello world
//typeof:通常用于判断原始值的类型
let i = 2;
console.log(typeof i); //number
//4.2执行上下文和作用域
//作用域链
var color = "blue";

function changeColor() {
  if (color === "blue") {
    color = "red";
  } else {
    color = "blue";
  }
}
changeColor();
//作用域链：[[changeColor variable object]]->Global Object
//局部作用域中定义的变量可用于在局部上下文中替换全局变量
function changeColor() {
  let anotherColor = "red";

  function swapColors() {
    let temp = anotherColor;
    anotherColor = color;
    color = temp;
    //能访问 color anotherColor temp
  }
  swapColors();
  //能访问 color anotherColor
}
changeColor();
//能访问 color
//作用域链：swapColor context->changeColor context->global context
/* 内部上下文可以通过作用域链访问外部上下文中的一切，但外部上下文无法访问内部上下文中的任何东西。*/
//*函数参数被认为是当前上下文中的变量

//1.作用域链增强
//try/catch 语句的 catch 块,对 catch 语句而言，则会创建一个新的变量对象，这个变量对象会包含要抛出的错误对象的声明
//with
function buildUrl() {
  let query = "?debug=true";
  with (location) {
    var url = href + query;
    //let url = href + query;// url invalid out of with scope
  }
  return url;
}
console.log(buildUrl());
//2.变量声明

/* 
在使用 var 声明变量时，变量会被自动添加到最接近的上下文。在函数中，最接近的上下文就是函
数的局部上下文。在 with 语句中，最接近的上下文也是函数上下文（可以解释为什么上述例子中with包含块中var声明的url可以被函数返回）。
*/

//如果变量未经声明就被初始化了，那么它就会自动被添加到全局上下文:
function add(num1, num2) {
  var sum = num1 + num2;
  return sum;
}
let res = add(10, 20);
//console.log(sum); // error
console.log(res); //30

function add(num1, num2) {
  sum = num1 + num2;
  return sum;
}
let res1 = add(10, 20);
console.log(sum); // 30

//var 声明会被拿到函数或全局作用域的顶部，位于作用域中所有代码之前。这个现象叫作“提升” (hoisting）
var name = "jake";
//equal to
name = "jake";
var name;

function testHoist() {
  console.log(ls);
  var ls = "hello";
}
testHoist();
//let
/* let 与 var 的另一个不同之处是在同一作用域内不能声明两次。重复的 var 声明会被忽略，而重
复的 let 声明会抛出 SyntaxError。*/
{
  let a = 1;
  var a = 2; //Uncaught SyntaxError: Identifier 'a' has already been declared
}
/*let 的行为非常适合在循环中声明迭代变量。使用 var 声明的迭代变量会泄漏到循环外部，这种情
况应该避免*/
for (var i = 0; i < 5; ++i) {
  console.log(i);
}
console.log(i);
for (let j = 0; j < 5; ++j) {}
console.log(j); //j is not defined
/*严格来讲， let 在 JavaScript 运行时中也会被提升，但由于“暂时性死区”（ temporal dead zone）的
缘故，实际上不能在声明之前使用 let 变量。因此，从写 JavaScript 代码的角度说， let 的提升跟 var
是不一样的*/

//暂时性死区？
//const 声明时初始化，之后不可重新赋值（对象表现为不能重新赋值引用地址）
//const a; //syntaxError 必须初始化
const a = 1;
//a = 2;//TypeError:给常量赋值

/*const 声明只应用到顶级原语或者对象。换句话说，赋值为对象的 const 变量不能再被重新赋值
为其他引用值，但对象的键则不受限制 */
const obj = { name: "ls" };
obj.name = "jojo";
console.log(obj); //{name:'jojo'}
/*如果想让整个对象都不能修改，可以使用 Object.freeze()，这样再给属性赋值时虽然不会报错，
但会静默失败*/
const target = {};
Object.freeze(target);
target.name = "jake";
console.log(target);
//标识符查找
var color = "blue";

function getColor() {
  return color;
}
console.log(getColor());

function getColor() {
  let color = "red";
  return color;
}
console.log(getColor());

function getColor() {
  let color = "red";
  {
    let color = "grey";
    return color;
  }
}
console.log(getColor());
