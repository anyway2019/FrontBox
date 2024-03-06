/**
 * 第64题：最小路径和
    给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
    说明：每次只能向下或者向右移动一步。

    示例:

    输入:
    [
      [1,3,1],
      [1,5,1],
      [4,2,1]
    ]
    输出: 7
    解释: 因为路径 1→3→1→1→1 的总和最小。
 */

//convert to 从终点往起点方向左或向上找一个数值最小的元素然后重复
var minPath = function (arr, m, n) {
  var res = 0;
  var tx = m - 1;
  var ty = n - 1;
  for (let i = m - 1, j = n - 1; i >= 0 && j >= 0; i--, j--) {
    res += Math.min(arr[tx][j - 1], arr[i - 1][j]) + arr[i][j];
    console.log(Math.min(arr[i][j - 1], arr[i - 1][j]), arr[i][j], res);
  }
  return res;
};

console.log(
  minPath(
    [
      [1, 3, 1],
      [1, 5, 1],
      [4, 2, 1],
    ],
    3,
    3
  )
);
