"use strict";

var arr1 = [1, 2, 3, 0, 0, 1, 2, 3]; // => 3
var arr2 = [1, -5, 20, -2, 2, -4]; // => 2
var arr3 = [1, -5, 20, -2, 2, -6]; // => -1

console.log(bothSidesAreEqual(arr1));
console.log(bothSidesAreEqual(arr2));
console.log(bothSidesAreEqual(arr3));

//*********************************************
function bothSidesAreEqual(arr) {
  var sum = arr.reduce(function sumArr(acc, n) {
    return acc + n;
  });

  var accumulator = arr[0];
  for (let i = 1; i < arr.length - 2; i++) {
    var leftSum = accumulator;
    var rightSum = sum - leftSum - arr[i];

    if (leftSum === rightSum) {
      return i;
    } else {
      accumulator += arr[i];
    }
  }

  return -1;
}
