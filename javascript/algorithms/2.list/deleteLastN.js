/**
 *  给定一个链表: 1->2->3->4->5, 和 n = 2.
    当删除了倒数第二个节点后，链表变为 1->2->3->5.
 */
var deleteN = function (l, n) {
  var head = { val: null, next: l };
  var pre = head;
  var cur = head;
  var count = 0;
  while (cur.next) {
    cur = cur.next;
    count++;
    if (count > n) {
      pre = pre.next;
    }
  }
  pre.next = pre.next.next;
  return head.next;
};

var root = {
  val: 1,
  next: {
    val: 2,
    next: { val: 3, next: { val: 4, next: { val: 5, next: null } } },
  },
};
console.log(deleteN(root, 2));
