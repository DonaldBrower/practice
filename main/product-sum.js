function productSum(specialArr, depthLevel = 1) {
  let sum = 0;

  specialArr.forEach((ele, idx) => {
    if (Array.isArray(ele)) {
      sum += productSum(ele, depthLevel + 1);
    } else {
      sum += ele;
    }
  });

  return sum * depthLevel;
}

console.log(productSum([1, 2, [3], 4, 5])); // -> 18
console.log(productSum([[1, 2], 3, [4, 5]])); // -> 27

// solving for
// - sum of all numbers in array
// each nested array is a multiplier for all
