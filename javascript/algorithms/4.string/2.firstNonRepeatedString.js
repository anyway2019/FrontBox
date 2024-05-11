/**
 * 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1 。
 * 示例：
 *  s = "leetcode"
    返回 0.

    s = "loveleetcode",
    返回 2.  
 * 
 * @param {*} str
 */
let firstNonRepeatedString = function (str) {
  let map = {};
  for (let i = 0; i < str.length; i++) {
    if (!map[str[i]]) {
      map[str[i]] = 1;
    } else {
      map[str[i]]++;
    }
  }

  for (let i = 0; i < str.length; i++) {
    if (map[str[i]] == 1) return i;
  }
};

console.log(firstNonRepeatedString("loveleetcode")); //2
