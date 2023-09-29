//Brute Force

//1.linear search  O(n)  n is length of the array
const linearSearch = function () {
  const target = 10;
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (let index = 0; index < array.length; index++) {
    if (target == array[index]) {
      return index;
    }
  }
};
/**
 * 
 * Input: arr[] = [3, 0, 0, 2, 0, 4]
Output: 10
Structure is like below:

     |
|    |
|  | |
|__|_| 

We can trap "3*2 units" of water between 3 an 2,
"1 unit" on top of bar 2 and "3 units" between 2 
and 4. See below diagram also.
 */
//2.rain falls
const RainTerraces = function (arr) {
  let maxLeft = 0;
  let maxRight = 0;
  let res = 0;
  for (let index = 1; index < arr.length - 1; index++) {
    const current = arr[index];
    maxLeft = findMax(arr.slice(0, index + 1));
    maxRight = findMax(arr.slice(index));
    const store = maxLeft < maxRight ? maxLeft - current : maxRight - current;
    res += store;
  }
  return res;
};

const findMax = function (arr) {
  let max = arr[0];
  for (let index = 1; index < arr.length; index++) {
    const element = arr[index];
    if (element > max) {
      max = element;
    }
  }
  return max;
};

const arr = [3, 0, 0, 2, 0, 4];
console.log(RainTerraces(arr)); //O(n^2)

//Dynamic Programming
const DynamicRainTerraces = function (arr) {
  let leftPool = [];
  let rightPool = [];
  let maxLeft = -1;
  let maxRight = -1;
  for (let index = 0; index < arr.length; index++) {
    const left = arr[index];
    const right = arr[arr.length - index - 1];

    leftPool[index] = maxLeft = left > maxLeft ? left : maxLeft;
    rightPool[index] = maxRight = right > maxRight ? right : maxRight;
  }

  let res = 0;
  for (let index = 0; index < arr.length; index++) {
    const current = arr[index];
    maxLeft = leftPool[index];
    maxRight = rightPool[index];
    const store = maxLeft < maxRight ? maxLeft - current : maxRight - current;
    res += store;
  }
  return res;
};

console.log(DynamicRainTerraces(arr)); //O(n) O(n)

/**
 * 
 * @param {*} stairsNumber 
 * @returns the ways of reaching the top 
 */
const stairsRecursive = function (stairsNumber) {
  if (stairsNumber < 0) return 0
  if (stairsNumber == 1) return 1
  if (stairsNumber == 2) return 2
  return stairsRecursive(stairsNumber - 1) + stairsRecursive(stairsNumber - 2)
}

//9
//9-1 9-2
//8-1 8-2 7-1 7-2
//7-1 7-2 6-1 6-2 6-1 6-2 5-1 5-2
//......

//O(2^N) O(1)
console.log(stairsRecursive(9))

//memorize the same result

const stairsRecursiveMemo = function (stairsNumber) {
  let pool = []
  const getWays = function (stairsNumber) {
    if (stairsNumber < 0) return 0
    if (stairsNumber == 1) return 1
    if (stairsNumber == 2) return 2

    if (pool[stairsNumber]) return pool[stairsNumber]

    pool[stairsNumber] = getWays(stairsNumber - 1) + getWays(stairsNumber - 2)
    return pool[stairsNumber]
  }
  return getWays(stairsNumber)
}
//9
//9-1 9-2
//8-1 8-2 7-1 7-2
//6-1 6-2 5-1 5-2
//......
//O(n) O(n)
console.log(stairsRecursiveMemo(9))

//dynamic programming 
//f(n) = f(n-1) + f(n-2)
//......
//f(5) = f(4) + f(3) = 5 + 3 => 8
//f(4) = f(3) + f(2) = 3 + 2 => 5
//f(3) = f(2) + f(1) => 3
//f(2) = 2 
//f(1) = 1
const stairsDynamic = function (stairsNumber) {
  if (stairsNumber <= 0) return 0;
  const pool = new Array(stairsNumber + 1).fill(0)
  pool[0] = 0;
  pool[1] = 1;
  pool[2] = 2;

  if (stairsNumber <= 2) return pool[stairsNumber]

  return stairsDynamic(stairsNumber - 1) + stairsDynamic(stairsNumber - 2)
}
//O(n) O(n)
console.log(stairsDynamic(9))

//iterate method
const stairIterate = function (stairsNumber) {
  if (stairsNumber <= 0) return 0

  const pool = []
  pool[0] = 0
  pool[1] = 1
  pool[2] = 2

  if (stairsNumber < 3) return pool[stairsNumber]

  for (let index = 3; index <= stairsNumber; index++) {
    [pool[0], pool[1]] = [pool[1], pool[0] + pool[1]]
    console.log(`[${pool[0]},${pool[1]}] = [${pool[1]},${pool[0]} + ${pool[1]}]`)
  }

  return pool[0]
}
// [1,1] = [1,1 + 1]
// [1,2] = [2,1 + 2]
// [2,3] = [3,2 + 3]
// [3,5] = [5,3 + 5]
// [5,8] = [8,5 + 8]
// [8,13] = [13,8 + 13]
// [13,21] = [21,13 + 21]
// 13
//O(n) O(1)
console.log(stairIterate(9))
