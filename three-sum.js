"use strict";

module.exports = { threeSum: main };

var logStash = [];

function main(arr) {
  for (let fixed = 0; fixed < arr.length; fixed++) {
    var tuple = [arr[fixed], 0, 0];

    var arrCopy = [...arr];
    arrCopy[fixed] = null;
    arrCopy = arrCopy.filter(function notNull(e) {
      return e !== null;
    });

    logStash.push({
      fixed,
      arrCopy,
    });
  }
  return logStash;
}

// iterate through every element
//
// on each element:
//      the element being iterated over becomes the first in a tuple of 3 being constructed
//
//      save a variable which is the list, minus the element being iterated over.
//
//
//
