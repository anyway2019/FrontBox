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