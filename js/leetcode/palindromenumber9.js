/** leetcode.9
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    if (left % 10 == 0 && left != 0)
        return false;

    let left = x;
    let right = 0;
    
    while (left > right) {
        right = left % 10 + 10 * right;
        left = Math.floor(left / 10);
    }
    return left == right || left == Math.floor(right / 10);
};