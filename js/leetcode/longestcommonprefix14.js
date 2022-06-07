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
var longestCommonPrefix = function(strs) {
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