"use strict";

module.exports = {
  mergeSort: main,
};

//*************************************************************
function main(arr) {
  if (arr.length < 2) {
    return arr;
  } else {
    return merge(
      main(arr.slice(0, arr.length / 2)),
      main(arr.slice(arr.length / 2, arr.length))
    );
  }
}

//*************************************************************
// HELPERS
//
//
function merge(left, right) {
  const output = [];

  while (left.length || right.length) {
    if (!left.length || right[0] < left[0]) {
      output.push(right.shift());
    } else if (!right.length || left[0] < right[0]) {
      output.push(left.shift());
    }
  }

  return output;
}
