var { mergeSort } = require("../mergeSort.js");

test("mergeSort", () => {
  expect(mergeSort([23, 1, 3, 2, -1])).toEqual([-1, 1, 2, 3, 23]);
});
