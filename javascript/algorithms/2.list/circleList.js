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

var node1 = { val: 3, next: null };
var node2 = { val: 2, next: null };
var node3 = { val: 0, next: null };
var node4 = { val: -4, next: null };
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2;
console.log(circleList(node1));
