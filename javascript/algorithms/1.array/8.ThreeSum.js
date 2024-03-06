/**
 *  给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？
 *  请你找出所有满足条件且不重复的三元组。注意：答案中不可以包含重复的三元组。
 *  
 *  给定数组 nums = [-1, 0, 1, 2, -1, -4]，
    满足要求的三元组集合为：
    [
        [-1, 0, 1],
        [-1, -1, 2]
    ]
 */

//[-1, 0, 1, 2, -1, -4]，
//[-4, -1,-1,0, 1, 2]，
let threeSum = function (arr) {
  const sortedArr = arr.sort((x, y) => x - y);
  let res = [];
  for (let i = 0; i < sortedArr.length; i++) {
    const start = sortedArr[i];
    let left = i + 1;
    let right = sortedArr.length - 1;
    while (left < right) {
      const sum = start + sortedArr[left] + sortedArr[right];
      if (sum == 0) {
        res[res.length] = [start, sortedArr[left], sortedArr[right]];
        break;
      }
      if (sum < 0) {
        left++;
      }
      if (sum > 0) {
        right--;
      }
    }
  }
  return res;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
