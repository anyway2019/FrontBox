//leetcode 1.
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let map = new Map;
    for (let i = 0; i < nums.length; ++i) {
        const another = target - nums[i]
        const res = map.get(another);
        if (res) {
            return [i, res];
        }
        map.set(nums[i], i);
    }
};