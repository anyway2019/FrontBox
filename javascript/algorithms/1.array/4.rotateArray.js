/**
 * 示例 2:

  输入: [-1,-100,3,99] 和 k = 2
  输出: [3,99,-1,-100]
  解释:

  向右旋转 1 步: [99,-1,-100,3]
  向右旋转 2 步: [3,99,-1,-100]
 * @param {*} arr 
 * @param {*} k 
 * @returns 
 */
//case1:
let rotateArray = function (arr, k) {
  for (let i = 0; i < k; i++) {
    let res = arr.pop();
    arr.unshift(res);
  }
  return arr;
};

console.log(rotateArray([-1, -100, 3, 99], 2));

//case2:观察得知，翻转数组后再翻转前k项接着翻转剩余元素即可
var reverse = function (arr, start, end) {
  var len = end - start + 1;
  var k = Math.floor(len / 2);
  for (let i = 0; i < k; i++) {
    let temp = arr[i + start];
    arr[i + start] = arr[end - i];
    arr[end - i] = temp;
  }
};

let rotateArray2 = function (arr, k) {
  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);
  return arr;
};
console.log(rotateArray2([-1, -100, 3, 99], 2));
