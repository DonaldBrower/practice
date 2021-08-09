"use strict";

const arr = [1, 2, 3, 0, 0, 1, 2, 3]; // => 3
const arr2 = [1, -5, 20, -2, 2, -4]; // => 2
const arr3 = [1, -5, 20, -2, 2, -6]; // => -1

console.log(JSON.stringify(findSummedMiddle(arr), undefined, 2)); // 3
console.log(JSON.stringify(findSummedMiddle(arr2), undefined, 2)); // 2
console.log(JSON.stringify(findSummedMiddle(arr3), undefined, 2)); // 1

//*************************************************
function findSummedMiddle(arr) {
  function State(i, arr) {
    this.i = i;
    this.left = arr.slice(0, this.i);
    this.right = arr.slice(this.i + 1, arr.length);
  }

  var stateStorage = [];
  arr.forEach(function saveElState(el, i) {
    stateStorage.push(new State(i, arr));
  });

  var sumOnBothSidesIndex;
  stateStorage.forEach(function checkEquality(el, i) {
    var { left, right } = el;

    var leftSummed = 0;
    left.forEach(function add(el) {
      leftSummed += el;
    });

    var rightSummed = 0;
    right.forEach(function add(el) {
      rightSummed += el;
    });

    if (!sumOnBothSidesIndex && leftSummed === rightSummed) {
      sumOnBothSidesIndex = i;
    }
  });

  if (sumOnBothSidesIndex) {
    return sumOnBothSidesIndex;
  } else {
    return -1;
  }
}
