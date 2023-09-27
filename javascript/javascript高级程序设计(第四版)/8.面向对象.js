//Object.assign
let dest = {};
const res = Object.assign(dest, { id: 1, mame: "ls" }, { gender: 1 });
console.log(dest);
console.log(dest === res);
dest = {
  set a(val) {
    console.log(val);
  },
};
let src = {
  get getA() {
    return "foo";
  },
};
result = Object.assign(dest, src);
console.log(dest);

//Object.assign shallow copy as below dest.a is reference of obj.a
dest = {};
let obj = { a: {} };
Object.assign(dest, obj);
console.log(obj.a === dest.a);

//Object.is
console.log(0 === +0);
console.log(0 === -0);
console.log(NaN === NaN);
console.log(isNaN(NaN));

console.log(Object.is(+0, 0));
console.log(Object.is(-0, 0));

//recursion equal
var recursionEqual = function (x, ...rest) {
  console.log(x, rest);
  return Object.is(x, rest[0]) && (rest.length < 2 || recursionEqual(...rest));
};
recursionEqual(1, 1, 1, 1, 1, 1, 1);
//simplify property or function setter getter
var makePerson = function (name) {
  return {
    name,
  };
};
let p = makePerson("Matt");
console.log(p.name);

var person = {
  sayName: function (name) {
    console.log(name);
  },
};
person.sayName("matt");

var person = {
  sayName(name) {
    console.log(name);
  },
};
person.sayName("petter");

var person = {
  name_: "",
  get name() {
    return this.name_;
  },
  set setName(name) {
    console.log(name);
  },
};
//equal to
var person = {
  name_: "",
  get: function () {
    return this.name_;
  },
  set: function (name) {
    this.name_ = name;
  },
};
//dynamic method name
const methodName = "sayName";
var newPerson = {
  [methodName](name) {
    console.log(`My Name is ${name}`);
  },
};
newPerson.sayName("ls");


//2.创建对象
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

//构造函数的问题：定义的方法在每次实例化的时候都会创建一个新的Function实例，即便多个实例的方法名是一样的但是他们方法却不是同一个Function实例
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

//3继承
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


//4.class
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
  
    sayName() {
      //sayName() 方法是原型方法
      console.log(this.name);
    }
  
    *createIterator() {
      yield "JACK";
      yield "Jerry";
      yield "Tesla";
    }
  
    static *createJobIterator() {
      yield "Butcher";
      yield "Baker";
      yield "Candlestick maker";
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
    return result && typeof result == "object" && typeof result !== "function"
      ? result
      : o;
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
        throw new Error("AbstractController can not be directly instantitaned!");
      }
      //检查派生类是否实现了某个必须实现的方法
      if (!this.foo) {
        throw new Error("foo has to been implemented!");
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
  var result = list.filter((c) => c > 1);
  console.log(result instanceof LinkedArray); //true
  console.log(result instanceof Array); //true
  //如果想改变上面的情况，使用Symbol.species访问器（这个访问器决定返回实例的类型）
  class LinkedArray extends Array {
    static get [Symbol.species]() {
      return Array;
    }
  }
  let newList = new LinkedArray(1, 2, 3);
  var newreuslt = newList.filter((c) => c > 0);
  console.log(newreuslt instanceof Array); //true
  console.log(newreuslt instanceof LinkedArray); //false
  
  //类混入 ：1.混入属性 2.混入行为
  //混入方式: 继承 组合
  class Vehicle {}
  
  function getParentClass() {
    console.log("evaluated expression");
    return Vehicle;
  }
  class Bus extends getParentClass() {}
  
  class A {}
  
  class B extends A {}
  
  class C extends B {}
  //1.混入多个对象的属性使用Object.assign()就可以了，
  //2.混入对象的行为，需要使用嵌套的继承方式来混入多个对象的行为和属性通过写一个辅助函数， 可以把嵌套调用展开：
  class Vehicle {}
  let FooMixin = (Superclass) =>
    class extends Superclass {
      foo() {
        console.log("foo");
      }
    };
  let BarMixin = (Superclass) =>
    class extends Superclass {
      bar() {
        console.log("bar");
      }
    };
  let BazMixin = (Superclass) =>
    class extends Superclass {
      baz() {
        console.log("baz");
      }
    };
  
  function mix(BaseClass, ...Mixins) {
    return Mixins.reduce(
      (accumulator, current) => current(accumulator),
      BaseClass
    );
  }
  class Bus extends mix(Vehicle, FooMixin, BarMixin, BazMixin) {}
  
  //组合大于继承，尽量使用组合，将方法提取到独立的类或者辅助对象中，然后把它们组合起来，极大提升灵活性
  

