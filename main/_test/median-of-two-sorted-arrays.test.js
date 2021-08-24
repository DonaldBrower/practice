var { medianOfTwoSortedArrays } = require('../median-of-two-sorted-arrays.js');

test("median of 1,3 and 2 === 2.00000", () => {
  expect(medianOfTwoSortedArrays([1,3], [2])).toBe(2.00000);
});
test("median of 1,2 and 3,4 === 2.50000", () => {
  expect(medianOfTwoSortedArrays([1,2], [3,4])).toBe(2.50000);
});
test("median of 0,0 and 0,0 === 0.00000", () => {
  expect(medianOfTwoSortedArrays([0,0], [0, 0])).toBe(0.00000);
});
test("median of BLANK and 1 === 1.00000", () => {
  expect(medianOfTwoSortedArrays([], [1])).toBe(1.00000);
});
test("median of 2 and BLANK === 2.00000", () => {
  expect(medianOfTwoSortedArrays([2], [])).toBe(2.00000);
});
