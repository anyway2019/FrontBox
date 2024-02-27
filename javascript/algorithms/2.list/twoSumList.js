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
    temp = sum % 10;

    left.val = sum;
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
