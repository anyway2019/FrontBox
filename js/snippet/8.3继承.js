//0.继承形式：接口继承(方法签名) 和 实现继承，js的只有实现继承的形式并且主要通过原型链完成
//1.原型链继承 
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.habits = ['ball'];
}
Person.prototype.sayName = function() {
    console.log(this.name);
}

function Man() {

}
Man.prototype = new Person();
//缺点：1.引用值在实例中共享
let manA = new Man();
manA.habits.push('code');
let manB = new Man();
console.log(manA.habits); //[ 'ball', 'code' ]
console.log(manB.habits); //[ 'ball', 'code' ]
//缺点：2.子函数不能在new的时候传参给父函数（在不影响所有实例的情况下）
//2.盗用构造函数继承:解决上述两个缺点，产生一个问题,方法必须在构造函数中定义，这样的定义方式会导致每次new的时候方法都会创建一个新的Function实例从而造成浪费
function Coder(name, age) {
    Person.call(this, name, age);
}
let CoderA = new Coder('faaccy', 18);
CoderA.habits.push('code');
let CoderB = new Coder('ls', 18);
console.log(CoderA.habits); //[ 'ball', 'code' ]
console.log(CoderB.habits); //[ 'ball' ]
//3.组合继承:通过父函数继承实例属性和方法，通过原型链继承原型上的属性和方法。
function PunchMan(name, age) {
    Person.call(this, name, age);
}
PunchMan.prototype = new Person;
//4.原型继承：没有类型定义,通过原型实现对象上的信息共享
function object(target) {
    function F() {};
    F.prototype = target;
    return new F();
}
//相当于
Object.create(new Person());
//第二参数是给产生的对象添加属,一般用来遮蔽原型上的属性
let shallow = Object.create(new Person, {
    name: {
        value: "Alan"
    }
});
//5.寄生继承:增强原型继承产生的对象。创建时赋予对象新方法或者属性,如果是方法也会导致方法难以重用，因为new的时候方法会产生新的Function实例
function create(target) {
    let o = object(target);
    o.sayName = function() {
        console.log(this.name);
    }
    return o;
}
//6.寄生组合继承:解决组合继承父函数会调用两次的问题
function inheritPrototype(child, parent) {
    let proto = object(parent.prototype);
    proto.constructor = child;
    child.prototype = proto;
}

function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
    console.log(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function() {
    console.log(this.age);
};
