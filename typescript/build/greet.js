"use strict";
function addNumbers(x, y) {
  return x + y;
}
console.log(addNumbers(3, 6));
console.warn("hello word");
const messge = "hello world";
messge.toLocaleLowerCase();
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Maddison", new Date());
let array = [1, 2, 3];
let newarr = [];
newarr.push(1);
let tuples = [2]; //TODO:https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types
let obj = { x: 0 };
// obj.foo();
// obj();
obj.bar = 10;
let myName = "Alice";
const names = ["Alice", "Bob", "Eve"];
//Contextual typing
names.forEach((s) => console.log(s));
// The parameter's type annotation is an object type
function printCoord(pt) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
//Optional Properties
function printName(obj) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
//union types
function printId(id) {
  console.log("Your ID is: " + id);
}
/**
 * sdsd
 */
printId(1);
function printCoord1(point) {
  console.log(point.lat);
  console.log(point.lon);
}
printCoord1({ lat: 2.1, lon: 213 });
const src = 'const a = "Hello World"';
window.ts;
window.title;
let changingString = "Hello World";
//changingString = 1;
let x = "hello";
// OK
x = "hello";
// ...
// x = "how2dy";
function printText(s, alignment) {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "center");
function compare(a, b) {
  return a === b ? 0 : a > b ? 1 : -1;
}
const obj1 = { counter: 0 };
if (true) {
  obj.counter = 1;
}
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
//The as const suffix acts like const but for the type system, ensuring that all properties are assigned the literal type instead of a more general version like string or number.
//null and undefined
function doSomething(x) {
  if (x === null) {
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
//Non-null Assertion Operator (Postfix !)
function liveDangerously(x) {
  // No error
  console.log(x.toFixed());
}
liveDangerously();
//# sourceMappingURL=greet.js.map
