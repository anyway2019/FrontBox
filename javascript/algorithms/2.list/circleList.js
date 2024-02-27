/**
 *  输入：head = [3,2,0,-4], pos = 1
    输出：true
 */
var circleList = function (list) {
  var head = list;
  var fast = list.next;
  while (head && fast && fast.next) {
    if (head.val == fast.val) {
      return true;
    }
    head = head.next;
    fast = fast.next.next;
  }

  return false;
};
