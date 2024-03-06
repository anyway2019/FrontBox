/**
 * 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
    最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。你可以假设除了整数 0 之外，
    这个整数不会以零开头。
    输入: [1,2,3]
    输出: [1,2,4]
    解释: 输入数组表示数字 123。
 */
var addOne = function (arr) {
  let temp = 1;
  for (let i = arr.length - 1; i >= 0; i--) {
    const sum = arr[i] + temp;
    if (sum > 9) {
      arr[i] = sum % 10;
      temp = Math.floor(sum / 10);
    } else {
      temp = 0;
      arr[i] = sum;
    }
  }
  return arr;
};
console.log(addOne([1, 9, 9])); //[ 2, 0, 0 ]
