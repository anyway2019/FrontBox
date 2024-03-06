/**
 *  给定 nums = [2, 7, 11, 15], target = 9
    因为 nums[0] + nums[1] = 2 + 7 = 9
    所以返回 [0, 1]
 */
let twoSum = function (arr, target) {
  let map = new Map();
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    map.set(element, i);
  }

  for (let i = 0; i < arr.length; i++) {
    const result = target - arr[i];
    if (map.has(result)) {
      return [i, map.get(result)];
    }
  }
};

console.log(twoSum([2, 7, 11, 15], 9));
