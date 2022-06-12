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
//2.构造函数创建对象
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
        this.sayName = function() {
            console.log(this.name);
        };
    }
    //new创建对象时候如果不想传入参数可以不写后面的()
var person = new Person();
//equal to
var simplePerson = new Person;

//1.作为构造函数调用
var person = new Person('faaccy', 18);
person.sayName(); //this => person
//2.作为普通函数调用
Person('faaccy', 18); //this => window(global object) name age sayName 在浏览器中被注册到全局对象window中
sayName(); //faaccy
//3.使用其他作用域调用 call/apply
var o = Object.create(null);
Person.call(o, 'faaccy', 18); //this=>o
o.sayName(); //faaccy

//构造函数的问题：定义的方法在每次实例话的时候都会创建一个新的Function实例，即便多个实例的方法名是一样的但是他们方法却不是同一个Function实例
//上述的Person函数还可以如下定义
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = new Function('{ console.log(this.name); }');
}
var person1 = new Person;
var person2 = new Person;
console.log(person1.sayName === person2.sayName); //false
//person1/2 sayName都是同样的功能却被创建了两次，且this可以将方法与对象的绑定推迟到运行时。
//可以定一个外部函数sayName 然后将this.sayName = sayName绑定
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = sayName;
}

function sayName() {
    console.log(this.name);
}
//3.原型式创建对象
//但是上述做法又导致定义了过多的全局函数，不方便模块化封装所以需要原型链的方式解决这个问题。
//原型：通过将方法定义在原型上的方法可以做到让所有实例共享一个sayName函数指针既避免了重复创建Function也避免了在全局创建函数的问题。
Person.sayName = function() {
    console.log(this.name);
};

var person1 = new Person;
var person2 = new Person;
console.log(person1.sayName == person2.sayName); // true

console.log(Person.prototype.constructor === Person); //true

//正常的原型链都终止与object的原型对象，而object的原型对象的原型是null
console.log(Person.prototype.__proto__.__proto__ === Object.prototype.__proto__); //true
console.log(Person.prototype.__proto__.__proto__); //null
console.log(Object.prototype.__proto__); //null
//实例与构造函数原型之间有直接的联系，但实例与构造函数之间没有
console.log(person1.__proto__ === person2.__proto__);
console.log(person1.__proto__ === Person.prototype);
//实例本身并没有constuctor属性，这里因为实例找不到constructor属性就去原型链中找到了Person.prototype.constructor
console.log(person1.constructor === Person);
console.log(person1.constructor === Person.prototype.constructor);

/**
 * instanceof 检查实例的原型链中是否包含指定构造函数的原型：
 */
console.log(person1 instanceof Person); // true
console.log(person1 instanceof Object); // true
console.log(Person.prototype instanceof Object); // true

//isPrototypeOf 检查对象是否是另一个对象的原型
console.log(Person.prototype.isPrototypeOf(person1)); //true
console.log(Person.prototype.isPrototypeOf(person2)); //true
//getPrototypeOf 获取对象的原型对象
console.log(Object.getPrototypeOf(person1) === Person.prototype); //true

// setPrototypeOf 重写实例的原型，涉及到访问这个对象原型的代码，这种做法存在性能问题
var bibed = {
    name: 'gatt'
}
Object.setPrototypeOf(person1, bibed);
//可以通过Object.create()创建指定原型的对象。
var newObj = Object.create(bibed);

//hasOwnProperty() 用来判断属性是实例上的还是原型对象上的，true表示实例上的否则是原型上的

//for in 会遍历任何可以枚举的实例属性和原型属性(注意如果原型中的不可枚举属性被实例属性遮蔽了也会被for in 遍历到)如果想要过滤原型属性需要配合hasOwnProperty()
for (var item in person1) {
    if (person1.hasOwnProperty(item))
        console.log(item);
}
//for in 获取原型属性 使用hasPrototypeProperty(object,property);
//Object.keys() 获取所有可枚举的实例属性
function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
    console.log(this.name);
};
let keys = Object.keys(Person.prototype);
console.log(keys); // "name,age,job,sayName"
let p1 = new Person();
p1.name = "Rob";
p1.age = 31;
let p1keys = Object.keys(p1);
console.log(p1keys); // "[name,age]"

//属性枚举顺序
//Object.keys() 和 for in 属性枚举的顺序不一定，因js引擎和浏览器的差异

//对象迭代
const sym = Symbol();
var ky = {
    foo: 'bar',
    count: 1,
    name: 'ls',
    [sym]: 'test'
};
console.log(Object.values(ky)); //bar 1 ls 
console.log(Object.entries(ky)); //[['foo','bar'],['count','1'],['name','ls']]
//上述两个函数都忽略symbol属性

//原型重写
function Person() {}

//用一个字面对象覆盖原来的原型会导致原型对象与原来的构造函数切断关系
Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name);
    }
};
//原型重写的时候增加constructor属性会保持原型对象与原构造函数的关系但是constructor会因此变成可枚举属性（构造函数本身不可枚举）
Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name);
    }
};
//保持构造函数原有的不可枚举特性，需要使用
Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name);
    }
};

Object.defineProperty(person, 'constructor', {
    enumerable: false,
    value: Person
});
//原型的动态性（动态添加或修改)
var friend = new Person;
Person.prototype.sayHi() = function() {
    console.log("hi");
}
friend.sayHi(); //hi
//Person.prototype是原型对象的指针，就算friend在原型对象熟悉修改前创建仍然可以访问后续定义sayHi

//原型创建对象的问题：1.不具备构造函数那样传入参数的能力 2.属性被实例共享（不同的实例本应该各自拥有属性的副本）尤其是引用属性