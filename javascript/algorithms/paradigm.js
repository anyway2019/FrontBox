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

//TODO:Dynamic Programming
