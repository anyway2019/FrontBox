/**
 *  第300题：最长上升子序列
    给定一个无序的整数数组，找到其中最长上升子序列的长度。
    输入: [10,9,2,5,3,7,101,18]
    输出: 4 
    解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
 */
var maxGrowSubArr = function (arr) {
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    var temp = arr[i];
    var res = [arr[i]];
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > temp) {
        res.push(arr[j]);
        temp = arr[j];
      }
    }
    if (res.length > result.length) {
      result = res;
    }
  }
  return result;
};

console.log(maxGrowSubArr([10, 9, 2, 5, 3, 7, 101, 18]));
