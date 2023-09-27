// var distinct = function (arr) {
//   return arr
//     .sort((a, b) => a - b)
//     .reduce((acc, cur, index, arr) => {
//       if (acc.length === 0 || arr[index - 1] != cur) {
//         acc.push(cur);
//       }
//       return acc;
//     }, []);
// };

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(distinct(arr));

var isPrime = function (num) {
  if (num < 2) return false;

  let end = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= end; i++) {
    if (num % i === 0) return false;
  }
  return true;
};
console.log(isPrime(6)); //false

var allPrime = function (n) {
  if (n < 1) return 0;
  if (n === 1) return 1;

  let res = new Array(n).fill(1);
  let count = 1;
  for (let i = 2; i <= n; ++i) {
    if (isPrime(i)) {
      for (let j = i * i; j < n; j += i) {
        res[j] = 0;
      }
      count++;
    }
  }
  return count;
};

// 1 2 3 5 7 11
console.log(allPrime(11));
