function addNumbers(x: number, y: number): number {
  return x + y;
}
console.log(addNumbers(3, 6));
console.warn("hello word");
const messge = "hello world";
messge.toLocaleLowerCase();

function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());

let array = [1, 2, 3];
let newarr: number[] = [];
newarr.push(1);
//https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types
let tuples = [2];

let obj: any = { x: 0 };
obj.foo();
obj();
obj.bar = 10;
let myName: string = "Alice";

const names = ["Alice", "Bob", "Eve"];

//Contextual typing
names.forEach((s) => console.log(s));

// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

//Optional Properties
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

//union types
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}

printId(1);

type coordinate = {
  lat: number;
  lon: number;
};

function printCoord1(point: coordinate) {
  console.log(point.lat);
  console.log(point.lon);
}

printCoord1({ lat: 2.1, lon: 213 });

type ID = number | string;

interface Window {
  title: string;
}

interface Window {
  ts: string;
}

const src = 'const a = "Hello World"';
// window.ts;
// window.title;
let changingString = "Hello World";
//changingString = 1;

let x: "hello" = "hello";
// OK
x = "hello";
// ...
// x = "how2dy";

function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "center");

function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

const obj1 = { counter: 0 };
if (true) {
  obj.counter = 1;
}

// declare function handleRequest(url: string, method: "GET" | "POST"): void;

// const req = { url: "https://example.com", method: "GET" };
// handleRequest(req.url, req.method);

// // Change 2
// handleRequest(req.url, req.method as "GET");

declare function handleRequest(url: string, method: "GET" | "POST"): void;
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);

//The as const suffix acts like const but for the type system, ensuring that all properties are assigned the literal type instead of a more general version like string or number.

//null and undefined
function doSomething(x: string | null) {
  if (x === null) {
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

//Non-null Assertion Operator (Postfix !)
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}

liveDangerously();

enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);

// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;

const firstName = Symbol("name");
const secondName = Symbol("name");

// if (firstName === secondName) {
//   //This comparison appears to be unintentional because the types 'typeof firstName' and 'typeof secondName' have no overlap.
//   // Can't ever happen
// }

function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    //type guard
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);

function fn(x: string): void;
function fn() {
  // ...
}

//typeof null is actually "object"
// Expected to be able to call with zero arguments
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}

Boolean("hello"); // type: boolean, value: true
!!"world"; // type: true,    value: true

function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}

function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();

    //(method) String.toUpperCase(): string
    y.toLowerCase();

    //(method) String.toLowerCase(): string
  } else {
    console.log(x);

    //(parameter) x: string | number
    console.log(y);

    //(parameter) y: string | boolean
  }
}
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}

function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
    //(parameter) x: Date
  } else {
    console.log(x.toUpperCase());
    //(parameter) x: string
  }
}

let xx = Math.random() < 0.5 ? 10 : "hello world!";
xx = 1;
xx = "goodbye!";

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

let pet = {
  swim() {},
};

if (isFish(pet)) {
  pet.swim();
}

function handleShape(shape: Shape) {
  // oops!
  if (shape.kind === "rect") {
    //This comparison appears to be unintentional because the types '"circle" | "square"' and '"rect"' have no overlap.
    // ...
  }
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

class Point {
  x: number;
  y: number;

  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

const po = new Point();

//Call Signatures
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function action(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
  return someArg > 3;
}

myFunc.description = "default description";
action(myFunc);

//construct signatures
type SomeConstructor = {
  new (s: string): object;
};

function builder(ctor: SomeConstructor) {
  return new ctor("hello");
}

//Some objects, like JavaScript’s Date object, can be called with or without new. You can combine call and construct signatures in the same type arbitrarily:
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): string;
}

//泛型generic function
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);

//Inference
function map<T, V>(arr: T[], func: (arg: T) => V): V[] {
  return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

//Constraints 类型约束
function longest<T extends { length: number }>(a: T, b: T) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
//const notOK = longest(10, 100);

function minimumLength<T extends { length: number }>(
  obj: T,
  minimum: number
): T {
  if (obj.length >= minimum) {
    return obj;
  }
  return obj;
  //else {
  //泛型约束只是限制传参的类型满足某种条件，但是泛型的返回值也必须和传参类型一样而不是用约束类型应付就可以
  //return { length: minimum };
  // Type '{ length: number; }' is not assignable to type 'Type'.
  //   '{ length: number; }' is assignable to the constraint of type 'Type', but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.
  //}
}

// 'arr' gets value { length: 6 }
const arr1 = minimumLength([1, 2, 3], 6);
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
console.log(arr1.slice(0));

//combined generic
function combine<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2);
}
const arr = combine<string | number>([1, 2, 3], ["hello"]);

//Push Type Parameters Down
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// a: number (good)
const first = firstElement1([1, 2, 3]);
// b: any (bad)
const second = firstElement2([1, 2, 3]);
//reason:firstElement2’s inferred return type is any because TypeScript has to resolve the arr[0] expression using the constraint type, rather than “waiting” to resolve the element during a call.
//Rule: When possible, use the type parameter itself rather than constraining it

//Use Fewer Type Parameters
//good
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

//bad :Func doesn’t do anything but make the function harder to read and reason about!
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}

//Type Parameters Should Appear Twice
//Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it

//bad
function greetGeneric<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}

greetGeneric("world");
//good
function greetSimple(s: string) {
  console.log("Hello, " + s);
}

//Optional Parameters x? x=?
function f(x?: number) {
  // ...
}
f(); // OK
f(10); // OK

//equal to...
function f1(x = 10) {
  // ...
}
declare function f2(x?: number): void;

//Function Overloads: params count or type difference
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
//Always prefer parameters with union types instead of overloads when possible
//better
function betterlen(x: any[] | string) {
  return x.length;
}

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
const user = {
  id: 123,

  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};
const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
//unkown
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// Need to be careful with 'json'!
const json = safeParse("dsads");
//never
function fail(msg: string): never {
  throw new Error(msg);
}

function fn1(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}
//equals to keyword params in C#
function multiplyRest(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const result = multiplyRest(10, 1, 2, 3, 4);

// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);

//Parameter Destructuring
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });
//Assignability of Functions

//Return type void:Contextual typing with a return type of void does not force functions to not return something another saying this is a contextual function type with a void return type (type voidFunc = () => void), when implemented, can return any other value, but it will be ignored.
type voidFunc = () => void;

const ff1: voidFunc = () => {
  return true;
};

const ff2: voidFunc = () => true;

const ff3: voidFunc = function () {
  return true;
};

//Array.prototype.push returns a number and the Array.prototype.forEach method expects a function with a return type of void.
const arrNumber = [1, 2, 3];
const dst = [0];

arrNumber.forEach((el) => dst.push(el));

function f2(): void {
  // @ts-expect-error
  return true;
}

const f3 = function (): void {
  // @ts-expect-error
  return true;
};

//extends  and combine
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};

interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

type ColorfulCircleCombined = Colorful & Circle;

//The principal difference between the two is how conflicts are handled, and that difference is typically one of the main reasons why you’d pick one over the other between an interface and a type alias of an intersection type.
