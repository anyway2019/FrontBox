"foo".replace(/(f)/, "$2");
// "$2oo"; the regex doesn't have the second group

"foo".replace("f", "$1");
// "$1oo"; the pattern is a string, so it doesn't have any groups

"foo".replace(/(f)|(g)/, "$2");
// "oo"; the second group exists but isn't matched
function replacer(match, p1, p2, /* …, */ pN, offset, string, groups) {
  return replacement;
}
function replacer(match, p1, p2, p3, offset, string) {
  // p1 is non-digits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(" - ");
}

console.log("abc12345#$*%".replace(/([^\d]*)(\d*)([^\w]*)/, replacer)); // abc - 12345 - #$*%

console.log("Twas the night before Xmas...".replace(/xmas/i, "Christmas")); // Twas the night before Christmas...

console.log(
  "Apples are round, and apples are juicy.".replace(/apples/gi, "oranges")
); // oranges are round, and oranges are juicy.

const re = /(\w+)\s(\w+)/;
const str = "Maria Cruz";
const newstr = str.replace(re, "$2, $1");
console.log(newstr); // Cruz, Maria

function styleHyphenFormat(propertyName) {
  function upperToHyphenLower(match, offset, string) {
    return (offset > 0 ? "-" : "") + match.toLowerCase();
  }
  return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
}

// Won't work
const newString = "sd".replace(/[A-Z]/g, "-" + "$&".toLowerCase());

function f2c(x) {
  function convert(str, p1, offset, s) {
    return `${((p1 - 32) * 5) / 9}C`;
  }
  const s = String(x);
  const test = /(-?\d+(?:\.\d*)?)F\b/g;
  return s.replace(test, convert);
}

"abcd".replace(/(bc)/, (match, p1, offset) => `${match} (${offset}) `);
// "abc (1) d"

function addOffset(match, ...args) {
  const offset = args.at(-2);
  return `${match} (${offset}) `;
}

console.log("abcd".replace(/(bc)/, addOffset)); // "abc (1) d"
console.log("abcd".replace(/(?<group>bc)/, addOffset)); // "abc (abcd) d"

function addOffset(match, ...args) {
  const hasNamedGroups = typeof args.at(-1) === "object";
  const offset = hasNamedGroups ? args.at(-3) : args.at(-2);
  return `${match} (${offset}) `;
}

console.log("abcd".replace(/(bc)/, addOffset)); // "abc (1) d"
console.log("abcd".replace(/(?<group>bc)/, addOffset)); // "abc (1) d"
//123456789=>123,456,789

let s = "1123456789".split("").reverse().join("");
console.log(s);
console.log(
  s.replace(/[\d]{3}/g, (match, p1, offset, str, groups) => {
    console.log(match, p1, offset, str, groups);
    return `${match},`;
  })
);

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=((\d{3})+(?!\d)))/g, ",");
}
//1,234
//2,345
//3,456
//4,567
//1,2,3,4,567 (?!\d)  234,
//1 , 234567
//2,345,67 fail
//3,456,7 fail
//4,567 pass
//1,234,567
//如果带小数点呢？

// 使用示例
var number = 1234567;
var formattedNumber = formatNumberWithCommas(number);
console.log(formattedNumber); // 输出: "1,234,567,"

console.log("1234567".search("/B(?=(d{3})+(?!d))/g"));
