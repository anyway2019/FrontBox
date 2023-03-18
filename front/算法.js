给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。  10 min
input：nums = [0,0,0]
output：1
input：nums = [0,1,0,3,2,3]
output：4
0 <= nums[i] <= 10000

手写买卖股票问题  10 min

快速排序

已知一个二叉树,前序遍历结果是: e b c h f g a d;中序遍历结果是: c h b e g f a d,要求复原这棵二叉树  10 min

//实现一个纸牌游戏，52张牌，抽取5张，判断是否是同花顺

最基础的括号匹配。直接用栈秒杀。 5min
function findMax(nums) {}
//版本对比
var compareVersion = function (version1, version2) {
    let v1 = version1.split("."), v2 = version2.split(".")
    let n = v1.length, m = v2.length
    let i = 0, j = 0
    while (i < n || j < m) {
        let a = 0, b = 0
        if (i < n) a = parseInt(v1[i++])
        if (j < m) b = parseInt(v2[j++])
        if (a != b) return a > b ? 1 : -1
    }
    return 0
};



求两个整数数组中的公共数字（交集）  10min

//sqrt