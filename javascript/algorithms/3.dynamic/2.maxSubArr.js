/**
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 输入: [-2,1,-3,4,-1,2,1,-5,4],
   输出: 6
   解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 */
var maxSubArr = function (arr) {
  var max = -999;
  var res = [];
  for (let i = 0; i < arr.length; i++) {
    const start = arr[i];
    if (start > 0) {
      var sum = arr[i];
      for (let j = i + 1; j < arr.length; j++) {
        const end = arr[j];
        sum += end;
        if (end > 0) {
          if (sum > max) {
            max = sum;
            res = [arr.slice(i, j + 1), max];
          }
        }
      }
    }
  }

  return res;
};

console.log(maxSubArr([-2, 1, -3, 4, -1, 2, 1, -5, 4])); //[ [ 4, -1, 2, 1 ], 6 ]
