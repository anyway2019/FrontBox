/** leetcode.9
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x % 10 == 0 && x != 0) return false;

  let left = x;
  let right = 0;

  while (left > right) {
    right = (left % 10) + 10 * right;
    left = Math.floor(left / 10);
  }
  return left == right || left == Math.floor(right / 10);
};
console.log(isPalindrome(12));
console.log(isPalindrome(121));
console.log(isPalindrome(1221));
