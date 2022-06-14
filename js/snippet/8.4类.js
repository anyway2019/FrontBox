//class 本质 原型和构造函数
//class 与 function的区别 1: 作用域函数是函数作用域，类是块作用域 2:函数声明能提升，类不能提升
//class 的组成与定义
class Person {
    constructor(name) {
        this.name = name; //name就是实例属性
    }

    get name() {
        return this.name;
    }

    set name(val) {
        this.name = val;
    }

    static staticFunction() {
        console.log(this); //class Person {...}
    }

    sayName() { //sayName() 方法是原型方法
        console.log(this.name);
    }

    *
    createIterator() {
        yield 'JACK';
        yield 'Jerry';
        yield "Tesla";
    }

    static * createJobIterator() {
        yield 'Butcher';
        yield 'Baker';
        yield 'Candlestick maker';
    }
}
//声明类表达式
let test = class Test {};
console.log(test.name); //Test
console.log(Test); //Referrence Error
//class type 
console.log(typeof Person); //function
//new的步骤与实现
// (1) 在内存中创建一个新对象。
// (2) 这个新对象内部的[[Prototype]]指针被赋值为构造函数的 prototype 属性。
// (3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
// (4) 执行构造函数内部的代码（给新对象添加属性）。
// (5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。
function mockNew(target) {
    let o = Object.create(target.prototype);
    let result = target.apply(o, arguments);
    return result && typeof result == 'object' && typeof result !== 'function' ? result : o;
}
//class 继承
//抽象类 new.target
//混入