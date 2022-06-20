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
//class 继承 extends
class Parent {}
class Child extends Parent {
    constructor() {
        //console.log(this.name);//报空指针异常
        super(); //调用父类构造函数，如果需要传入参数手动传入，返回实例赋值给this
        console.log(this.name);
    }

    static StaticMethod() {
        super.StaticMethod(); //super只能通过构造函数和静态方法调用
    }
}
//如果派生类没有定义构造函数，在实例化的时候默认调用父类的构造函数进行实例化
class Kid extends Parent {}
//抽象类 new.target
class AbstractController {
    constructor() {
        //检查是否是new的派生类，否则报错，保证抽奖类不能直接被实例化。
        if (new.target === AbstractController) {
            throw new Error('AbstractController can not be directly instantitaned!');
        }
        //检查派生类是否实现了某个必须实现的方法
        if (!this.foo) {
            throw new Error('foo has to been implemented!')
        }
    }
}
//继承内置类
class LinkedArray extends Array {
    FirstDefault() {
        return length(this) > 0 ? this[0] : 0;
    }
    LastDefault() {
        return length(this) > 0 ? this[this.length - 1] : 0;
    }
}
let list = new LinkedArray(1, 2, 3);
console.log(list instanceof Array); //true
console.log(list instanceof LinkedArray); //true
//内置类的派生类在使用内置类的方法返回新的实例，默认情况下，返回实例的类型与原始实例的类型是一致的
var result = list.filter(c => c > 1);
console.log(result instanceof LinkedArray); //true
//如果姓改变上面的情况，使用Symbol.species访问器（这个访问器决定返回实例的类型）
class LinkedArray extends Array {
    static get[Symbol.species]() {
        return Array;
    }
}
let newList = new LinkedArray(1, 2, 3);
var newreuslt = newList.filter(c => c > 0);
console.log(newreuslt instanceof Array); //true
console.log(newreuslt instanceof LinkedArray); //false

//类混入
class Vehicle {}

function getParentClass() {
    console.log('evaluated expression');
    return Vehicle;
}
class Bus extends getParentClass() {

}

class A {

}

class B extends A {

}

class C extends B {

}
//混入多个对象的属性使用Object.assign()就可以了，如果想混入对象的行为，需要使用嵌套的继承方式来混入多个对象的行为和属性通过写一个辅助函数， 可以把嵌套调用展开：

class Vehicle {}
let FooMixin = (Superclass) => class extends Superclass {
    foo() {
        console.log('foo');
    }
};
let BarMixin = (Superclass) => class extends Superclass {
    bar() {
        console.log('bar');
    }
};
let BazMixin = (Superclass) => class extends Superclass {
    baz() {
        console.log('baz');
    }
};

function mix(BaseClass, ...Mixins) {
    return Mixins.reduce((accumulator, current) => current(accumulator), BaseClass);
}
class Bus extends mix(Vehicle, FooMixin, BarMixin, BazMixin) {}

//组合大于继承，尽量使用组合，将方法提取到独立的类或者辅助对象中，然后把它们组合起来，极大提升灵活性