class Secret {
    #secret;
    constructor(secret) {
        this.#secret = secret;
    }
    get secret() {
        console.log(this === proxy);//True 此处this代表的是proxy对象，因此this.#secret是不可以被proxy直接访问的
        return this.#secret.replace(/\d+/, "[REDACTED]");
    }
} x

const aSecret = new Secret("123456");
// console.log(aSecret.secret); // [REDACTED]
// Looks like a no-op forwarding...
const empty = {};
const proxy = new Proxy(aSecret, empty);
proxy.x = 1;
console.log(proxy['secret']); // TypeError: Cannot read private member #secret from an object whose class did not declare it

//This is because when the proxy's get trap is invoked, 
//the this value is the proxy instead of the original secret, 
//so #secret is not accessible. To fix this, use the original secret as this:

const proxyNew = new Proxy(aSecret, {
    get(target, property, receiver) {
        return target[property];
    }
});
console.log(proxyNew['secret']);

//借助Reflect获取对象的原始值，再加以包装
const target = {
    x x
    foo: 'bar',
    baz: 'qux'
};
const handler = {
    get(trapTarget, property, receiver) {
        let decoration = '';
        if (property === 'foo') {
            decoration = '!!!';
        }
        return Reflect.get(...arguments) + decoration;
    }
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo); // bar!!!
console.log(target.foo); // bar

//不可配置和改变的属性代理是无法改变，如果尝试改变会抛出TypeError
const invariants = {};
Object.defineProperty(invariants, 'foo', {
    configurable: false,
    writable: false,
    value: 'bar'
});
const invariantsHandler = {
    get() {
        return 'qux';
    }
};
const invariantsProxy = new Proxy(invariants, invariantsHandler);
console.log(invariantsProxy.foo);

//可撤销代理

const obj = {

};
const revocableProxy = Proxy.revocable(obj, {});
revocableProxy.x = 1;
revocableProxy.revoke();
revocableProxy.x = 2;//TypeError

//反射

// 以下反射方法都会提供状态标记：
//  Reflect.defineProperty()
//  Reflect.preventExtensions()
//  Reflect.setPrototypeOf()
//  Reflect.set()
//  Reflect.deleteProperty()
// 3. 用一等函数替代操作符
// 以下反射方法提供只有通过操作符才能完成的操作。
//  Reflect.get()：可以替代对象属性访问操作符。
//  Reflect.set()：可以替代=赋值操作符。
//  Reflect.has()：可以替代 in 操作符或 with()。
//  Reflect.deleteProperty()：可以替代 delete 操作符。
//  Reflect.construct()：可以替代 new 操作符。


//安全应用函数

// 在通过 apply 方法调用函数时，被调用的函数可能也定义了自己的 apply 属性（虽然可能性极小）。
// 为绕过这个问题，可以使用定义在 Function 原型上的 apply 方法，比如：
// Function.prototype.apply.call(myFunc, thisVal, argumentList);
// 这种可怕的代码完全可以使用 Reflect.apply 来避免：
// Reflect.apply(myFunc, thisVal, argumentsList);

//代理嵌套
const secondProxy = new Proxy(proxy, {
    get() {
        console.log("i am second proxy");
        return Reflect.get(...arguments);
    }
});
console.log(secondProxy.secret); // i am second proxy

//代理缺陷 1.this指向问题 2.代理与内部槽位
//由于这个实现依赖 User 实例的对象标识，在这个实例被代理的情况下就会出问题：
const user = new User(123);
console.log(user.id); // 123
const userInstanceProxy = new Proxy(user, {});
console.log(userInstanceProxy.id); // undefined
// 这是因为 User 实例一开始使用目标对象作为 WeakMap 的键，代理对象却尝试从自身取得这个实
// 例。要解决这个问题，就需要重新配置代理，把代理 User 实例改为代理 User 类本身。之后再创建代
// 理的实例就会以代理实例作为 WeakMap 的键了：
const UserClassProxy = new Proxy(User, {});
const proxyUser = new UserClassProxy(456);
console.log(proxyUser.id)

//代理与Date
const dateTarget = new Date();
const proxy = new Proxy(dateTarget, {});
console.log(proxy instanceof Date); // true
proxy.getDate(); // TypeError