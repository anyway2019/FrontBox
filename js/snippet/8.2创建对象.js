//1.ES5.1 创建对象往往使用原型继承加构造函数的形式知道ES6出现后class对这种创建
//对象的方式进行了封装

//ES5.1 创建对象 factory模式
var createPerson = function(name, age) {
    let p = new Object();
    p.name = name;
    p.age = age;
    p.sayName = function() {
        console.log(this.name);
    };
};
//createperson 创建了 name age sayName行为的对象但是没有为这类对象标注类型
//构造函数模式  构造函数一般首字母要大写和普通函数区分开。
function Person(name, age) {
    this.name = name;
    this.age = age;
}
//equal to
var Person = function(name, age) {
        this.name = name;
        this.age = age;
    }
    //new创建对象时候如果不想传入参数可以不写后面的()
let person = new Person();
//equal to
let simplePerson = new Person;

//原形：关键在于理解这一点：实例与构造函数原型之间有直接的联系，但实例与构造函数之
//间没有
console.log(Person.prototype.__proto__.__proto__);
console.log(Object.prototype.__proto__);