//Object.assign 
let dest = {};
const res = Object.assign(dest, { id: 1, mame: 'ls' }, { gender: 1 });
console.log(dest);
console.log(dest === res);
dest = {
    set a(val) {
        console.log(val);
    }
};
let src = {
    get getA() {
        return 'foo';
    }
};
result = Object.assign(dest,src);
console.log(dest);

//Object.assign shallow copy as below dest.a is reference of obj.a
dest = {};
let obj = {a:{}};
Object.assign(dest,obj);
console.log(obj.a === dest.a);

//Object.is
console.log(0===+0);
console.log(0===-0);
console.log(NaN === NaN);
console.log(isNaN(NaN));

console.log(Object.is(+0,0));
console.log(Object.is(-0,0));

//recursion equal
var recursionEqual = function(x,...rest){
    console.log(x,rest);
    return Object.is(x,rest[0]) && (rest.length<2 || recursionEqual(...rest));
}
recursionEqual(1,1,1,1,1,1,1);
//simplify property or function setter getter
var makePerson = function(name){
    return {
        name
    };
}
let p = makePerson('Matt');
console.log(p.name);

var person = {
    sayName:function(name){
        console.log(name);
    }
}
person.sayName('matt');

var person = {
    sayName(name){
        console.log(name);
    }
}
person.sayName('petter');

var person = {
    name_:"",
    get name(){
        return this.name_;
    },
    set setName(name){
        console.log(name);
    }
}
//equal to
var person = {
    name_:"",
    get:function(){
        return this.name_;
    },
    set:function(name){
        this.name_ = name;
    }
}
//dynamic method name
const methodName = "sayName";
var newPerson = {
    [methodName](name){
        console.log(`My Name is ${name}`);
    }
}
newPerson.sayName('ls');
