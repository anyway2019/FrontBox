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


/**
 * For example, for the array of values −2, 1, −3, 4, −1, 2, 1, −5, 4 
 * the contiguous subarray with the largest sum is 4, −1, 2, 1, with sum 6.
 */
// input:[−2, 1, −3, 4, −1, 2, 1, −5, 4]
// output: 6
const largestSubArr = function (arr) {
  let start = 0
  let end = 0
  let max = 0

  for (let i = 0; i < arr.length; i++) {
    let sum = 0

    if (arr[i] < 0) continue

    for (let j = i; j < arr.length; j++) {
      const current = arr[j];
      const result = current + sum
      if (result > max) {
        start = i
        end = j
        max = result
      }
      sum = result;
    }
  }

  return [max, arr.slice(start, end + 1)]
}

//[ 6, [ 4, -1, 2, 1 ] ]
//O(n^2) O(1)
console.log(largestSubArr([-2, 1, -3, 4, -1, 2, 1, -5, 4]))

const largestSubArrDynamic = function (arr) {
  if (!arr.length) return -1

  if (arr.length == 1) {
    return arr[arr.length - 1]
  }

  let maxStartIndex = 0
  let maxEndIndex = arr.length - 1
  let max = -Infinity;

  let sum = 0
  let currentIndex = 0

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    sum += element

    if (sum > max) {
      max = sum
      maxStartIndex = currentIndex
      maxEndIndex = index
    }

    //state transation function 
    if (sum < 0) {
      sum = 0
      currentIndex = index + 1
    }
  }

  return arr.slice(maxStartIndex, maxEndIndex + 1);
}

//if elements is all negative value, transform it
//for example [-7,-4,-8,-1,-6,-3,-4,-10,-1]
//all elements plus value 5,then get [-2, 1, -3, 4, -1, 2, 1, -5, 4] 
//then handle as above and result elements minus value 5

//O(n)
console.log(largestSubArrDynamic([-2, 1, -3, 4, -1, 2, 1, -5, 4]))


/**
 * Input: [2,3,1,1,4]
 * Output: true
 * Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
 * 
 * Input: [3,2,1,0,4]
 * Output: false
 * Explanation: You will always arrive at index 3 no matter what. Its maximum
 * jump length is 0, which makes it impossible to reach the last index.
 * 
 * @param {*} arr 
 */
const jumpGame = function (arr) {
  const steps = function (startIndex) {
    if (startIndex == arr.length - 1) {
      return true
    }

    let max = Math.min(arr[startIndex], arr.length - 1 - startIndex)
    let current = 1
    while (current <= max) {
      let currentValue = arr[current]
      if (currentValue > 0 && steps(startIndex + current)) {
        return true
      }
      current++
    }

    return false
  }

  return steps(0);
}

console.log('jumpGame:[3, 2, 1, 0, 4]', jumpGame([3, 2, 1, 0, 4]))
console.log('jumpGame:[3, 2, 1, 1, 4]', jumpGame([3, 2, 1, 1, 4]))

const jumpGameDynamicTopDown = function (arr) {
  //pool stores current index is good or bad position
  let pool = new Array(arr.length).fill(undefined)
  pool[arr.length - 1] = true

  const steps = function (startIndex) {
    if (startIndex == arr.length - 1) {
      pool[startIndex] = true
      return true
    }

    let max = Math.min(arr[startIndex], arr.length - 1 - startIndex)
    let current = 1
    while (current <= max) {
      if (pool[current]) return true

      let currentValue = arr[current]
      if (currentValue > 0 && steps(startIndex + current)) {
        return true
      }
      current++
    }

    return false
  }

  return steps(0)
}

console.log('jumpGameDynamicTopDown:[3, 2, 1, 0, 4]', jumpGameDynamicTopDown([3, 2, 1, 0, 4]))
console.log('jumpGameDynamicTopDown:[3, 2, 1, 1, 4]', jumpGameDynamicTopDown([3, 2, 1, 1, 4]))

const jumpGameDynamicBottomUp = function (arr) {
  //pool stores current index is good or bad position
  let pool = new Array(arr.length).fill(undefined)
  pool[arr.length - 1] = true

  const steps = function (startIndex) {
    if (startIndex == 0) {
      return true
    }

    let max = Math.min(arr[startIndex], arr.length - 1 - startIndex)
    let current = max
    while (current >= 1) {
      if (pool[current]) return true

      let currentValue = arr[current]
      if (currentValue > 0 && steps(startIndex - current)) {
        pool[current] = true;
        return true
      }
      current--
    }

    return false
  }

  return steps(arr.length - 2)
}

console.log('jumpGameDynamicBottomUp:[3, 2, 1, 0, 4]', jumpGameDynamicBottomUp([3, 2, 1, 0, 4]))
console.log('jumpGameDynamicBottomUp:[3, 2, 1, 1, 4]', jumpGameDynamicBottomUp([3, 2, 1, 1, 4]))

//the problem then reduce to get left-most good position
const jumpGameGreedy = function (arr) {
  let leftPosition = arr.length - 1
  let pool = []

  for (let i = arr.length - 2; i >= 0; i--) {
    const element = arr[i];
    const maxJumpLength = element + i;

    if (maxJumpLength >= leftPosition) {
      leftPosition = i
      pool[i] = true
    }
  }

  return pool[0] === true
}

console.log('jumpGameGreedy:[3, 2, 1, 0, 4]', jumpGameGreedy([3, 2, 1, 0, 4]))
console.log('jumpGameGreedy:[3, 2, 1, 1, 4]', jumpGameGreedy([3, 2, 1, 1, 4]))

