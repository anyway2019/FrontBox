/**
 * 第350题：两个数组的交集给定两个数组，编写一个函数来计算它们的交集。
 * 输入: nums1 = [1,1,2,2,1], nums2 = [2,2]
   输出: [2,2]
 */

var insectArray = function (nums1, nums2) {
    var res = []
    var i = 0;
    var j = 0;

    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] == nums2[j]) {
            res.push(nums1[i]);
            i++;
            j++;
        } else {
            if (res.length > 0) {
                j--;
                res = [];
            } else {
                i++;
            }
        }
    }
    return res
}

var intersectArrray = function (nums1, nums2) {
    var map = new Map();
    var i = 0;
    while (i < nums1.length) {
        if (map.has(nums1[i])) {
            map.set(nums1[i], map.get(nums1[i]) + 1);
        } else {
            map.set(nums1[i], 1);
        }
        i++;
    }

    var j = 0;
    for (var num of nums2) {
        if (map.get(num) > 0) {
            map.set(num, map.get(num) - 1)
            nums2[j] = num;
            j++
            console.log(map.get(num), num, j)
        }
    }

    return nums2.slice(0, j)
}

console.log(intersectArrray([3, 1, 1, 2, 2, 1], [1, 2, 2, 3, 4, 5]))


