"use strict";

module.exports = {
  medianOfTwoSortedArrays: main,
};

//*************************************************************
function main(nums1, nums2) {
  return median(merge(nums1, nums2));
}

function median(mergedArray) {
  var len = mergedArray.length;
  if (len === 1) {
    return mergedArray[0];
  }

  var isEven = len % 2 === 0 ? true : false;

  if (isEven) {
    return (mergedArray[len / 2 - 1] + mergedArray[len / 2]) / 2;
  }
  if (!isEven) {
    return mergedArray[Math.floor(len / 2)];
  }
}

function merge(l, r) {
  var out = [];
  while (l.length != 0 || r.length != 0) {
    if (r.length == 0 || l[0] < r[0]) {
      out.push(l.shift());
    } else if (l.length == 0 || r[0] < l[0]) {
      out.push(r.shift());
    } else if (r[0] == 0 && l[0] == 0) {
      out.push(r.shift());
    }
  }
  return out;
}

//*************************************************************
// HELPERS
