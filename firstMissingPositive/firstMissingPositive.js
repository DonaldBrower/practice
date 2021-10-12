"usc strict";

module.exports = {
  firstMissingPositive: main,
};

//*************************************************************
function main(nums) {
  let len = nums.length;
  let sum = 0;
  let largest = 0;
  let smallest = 0;

  for (let num of nums) {
    // remove integers smaller than 1
    if (num < 1) {
      nums.pop();
      len--;
    } else {
      // add to sum
      sum += num;

      // find the largest integer in the set
      if (num > largest) {
        largest = num;
      }

      // find the smallest integer in the set
      if (smallest == 0 || num < smallest) {
        smallest = num;
      }
    }
  }

  // assume the length of the full contigous sequece is equal to the largest
  // integer in the array
  let expectedLen = largest;

  // find what the expected sum would be if this were a contigous sequence
  // moving from 1 to expectedLen
  let expectedSum = 0;
  for (let i = 1; i <= expectedLen; i++) {
    expectedSum += i;
  }

  return {
    len,
    sum,
    smallest,
    expectedLen,
    expectedSum,
  };

  /*
    Received: {"expectedLen": 12, "expectedSum": 78, "len": 6, "smallest": 1, "sum":  s8}
    Received: {"expectedLen": 12, "expectedSum": 78, "len": 5, "smallest": 7, "sum": 47}
    Received: {"expectedLen": 4, "expectedSum": 10, "len": 3, "smallest": 1, "sum": 5}
    Received: {"expectedLen": 4, "expectedSum": 10, "len": 4, "smallest": 1, "sum": 7}
  */

  // how can i use the properties of the array and the elements inside the
  // array to find number that is the upper bound  of the sub sequence
  // incrementing from one, starting at zero, including 1
  //
  // as it stands right now, i'm looping through the array once, and by the end
  // i have the length of all the non negative integers, including duplicates;
  // the smallest integer of that set, and the largest integer of that set.
  //
  // with those values in mind, i can loop through the array again and:
  // - assign the number being iterated on to another variable, or add or subtract it's value
  //
  //
  // the greatest value doesn't tell us anything by itself. this could be the
  // upper bound i'm looking for, or there could be a gap between the greatest value and the value that and the upper bound. can the greatest value help find the upperbound?
  //
  //
  // the smallest value, if not one, gives away that the return value should be
  // one. how else could it be useful.
  //
  // the length.. i don't know yet.
}

// function main(nums) {
//   const map = nums.reduce(addToMap, { length: 0 });

//   let increment = 1;
//   let runCount = 0;

//   while (runCount <= map.length) {
//     if (!map[increment]) {
//       return increment;
//     } else {
//       increment++;
//       runCount++;
//     }
//   }
// }
//
// if (smallest != 1) {
//   return 1;
// } else {
//   for (let num of nums) {
//     if (num == smallest + 1) {
//       smallest = num;
//     }
//   }
// }

// return smallest + 1;
//
//*************************************************************
// HELPERS
// function addToMap(accumulator, element) {
//   if (!accumulator[element] && element > 0) {
//     accumulator[element] = true;
//     accumulator.length++;
//   }
//   return accumulator;
// }
