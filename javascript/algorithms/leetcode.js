//leetcode 1.
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; ++i) {
    const another = target - nums[i];
    const res = map.get(another);
    if (res) {
      return [i, res];
    }
    map.set(nums[i], i);
  }
};

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

// Write a function to find the longest common prefix string amongst an array of strings.
// If there is no common prefix, return an empty string "".

// Example 1:
// Input: strs = ["flower","flow","flight"]
// Output: "fl"

// Example 2:
// Input: strs = ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let prefix = strs[0];
  for (let j = 1; j < strs.length; ++j) {
    while (strs[j].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
};
var strs = ["flow", "flower", "fly"];
console.log(longestCommonPrefix(strs));

/**
 *  Input: s = "MCMXCIV"
    Output: 1994
    Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {};
