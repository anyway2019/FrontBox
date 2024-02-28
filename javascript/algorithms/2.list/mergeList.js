/**
 *  输入：1->2->4, 1->3->4
    输出：1->1->2->3->4->4
 * @param {*} left
 * @param {*} right
 */
var mergeList = function (left, right) {
  var head = { val: null, next: null };
  var res = head;
  while (left && right) {
    if (left.val < right.val) {
      res.next = left;
      left = left.next;
    } else {
      res.next = right;
      right = right.next;
    }
    res = res.next;
  }

  if (left) {
    res.next = left;
  }

  if (right) {
    res.next = right;
  }

  return head.next;
};

var headLeft = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 4,
      next: null,
    },
  },
};

var headRight = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 4,
      next: null,
    },
  },
};

console.log(mergeList(headLeft, headRight));
