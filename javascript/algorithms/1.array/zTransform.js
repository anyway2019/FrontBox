/**
 *  输入: s = "LEET CO DEIS HI RING", numRows = 4
    输出: "LDREOEIIECIHNTSG"
           LDRE EI E I NTSG
            LDRE EI E I NTSG
           4 5    10 11 
    解释:
    L     D     R
    E  O  E  I  I
    E C   I H   N
    T     S     G
 * @param {*} str 
 * @param {*} rowNum 
 */
let zTransform = function (str, rowNum) {
  let arr = ["", "", "", ""];
  const peroidTime = 2 * rowNum - 2;

  for (let i = 0; i < str.length; i++) {
    var mode = i % peroidTime;
    if (mode < rowNum) {
      arr[mode] += str[i];
    } else {
      arr[peroidTime - mode] += str[i];
    }
  }

  return arr.join("");
};

console.log(zTransform("LEETCODEISHIRING", 4));
