/**
 *  输入: ["flower","flow","flight"]
    输出: "fl"
 * @param {string} arr
 */
let longestCommonPrefix = function (arr) {
  let prefix = arr[0];
  for (let i = 0; i < arr.length; i++) {
    //数组遍历
    while (arr[i].indexOf(prefix) !== 0) {
      //状态专转移条件
      prefix = prefix.slice(0, -1); //状态转移
    }
  }
};
