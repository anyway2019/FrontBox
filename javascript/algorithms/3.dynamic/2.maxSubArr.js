/**
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 输入: [-2,1,-3,4,-1,2,1,-5,4],
   输出: 6
   解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 */
var maxSubArr = function (arr) {
  var dp = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    if (dp[i - 1] < 0) {
      dp[i] = arr[i]
    } else {
      dp[i] = dp[i - 1] + arr[i]
    }
  }

  return Math.max(...dp);
}

console.log(maxSubArr([-2, 1, -3, 4, -1, 2, 1, -5, 4])); //6
