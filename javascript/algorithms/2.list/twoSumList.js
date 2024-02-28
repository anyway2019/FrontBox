/**
 *  输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
    输出：7 -> 0 -> 8
    原因：342 + 465 = 807
 * @param {*} left 
 * @param {*} right 
 */
var twoSumList = function (left, right) {
  var temp = 0;
  var head = { val: null, next: null };
  var res = head;
  while (left && right) {
    var sum = left.val + right.val + temp;
    temp = sum > 9 ? Math.floor(sum / 10) : 0;

    left.val = sum > 9 ? sum % 10 : sum;
    res.next = left;

    res = res.next;
    left = left.next;
    right = right.next;
  }

  if (left) {
    left.val += temp;
    res.next = left;
  }

  if (right) {
    right.val += temp;
    res.next = right;
  }
  return head.next;
};

var headLeft = {
  val: 2,
  next: {
    val: 4,
    next: {
      val: 3,
      next: null,
    },
  },
};

var headRight = {
  val: 5,
  next: {
    val: 6,
    next: {
      val: 4,
      next: null,
    },
  },
};

console.log(twoSumList(headLeft, headRight));
