let deleteInPlace = function (arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      delete arr[i];
    } else {
      i++;
    }
  }
  return arr;
};

console.log(deleteInPlace([3, 2, 2, 3], 3));
