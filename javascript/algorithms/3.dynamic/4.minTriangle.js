/**
 * 给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。
 *  例如，给定三角形：
    [
        [2],
        [3,4],
        [6,5,7],
        [4,1,8,3]
    ]
    则自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
 */

var minTriangle = function (arr) {
  //dp[i]的路径依赖dp[i-1]  dp[i] = min(dp[i-1]+ arr[i][j],dp[i-1]+ arr[i][j-1],dp[i-1]+ arr[i][j+1])
};

var minTriangle1 = function (triangle) {
  let length = triangle.length;
  for (let i = length - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      triangle[i][j] += Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]);
    }
  }
  return triangle[0][0];
};

console.log(minTriangle1([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));
