/**
 * 第350题：两个数组的交集
 * 给定两个数组，编写一个函数来计算它们的交集。
 * 输入: nums1 = [1,1,2,2,1], nums2 = [2,2]
   输出: [2,2]
 */
var intersectArray = function (nums1, nums2) {
  var map = {};
  var i = 0;
  while (i < nums1.length) {
    if (map[nums1[i]]) {
      map[nums1[i]] = map[nums1[i]] + 1;
    } else {
      map[nums1[i]] = 1;
    }
    i++;
  }

  var j = 0;
  for (var num of nums2) {
    if (map[nums2[j]] > 0) {
      map[nums2[j]] = map[nums2[j]] - 1;
      nums2[j] = num;
      j++;
    }
  }

  return nums2.slice(0, j);
};

console.log(intersectArray([3, 1, 1, 2, 2, 1], [1, 2, 2, 3, 4, 5]));
