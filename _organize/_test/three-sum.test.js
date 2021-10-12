var { threeSum } = require("../three-sum.js");

test("[-1,0,1,2,-1,-4] -> [[-1,-1,2],[-1,0,1]]", () => {
  expect(threeSum([-1, 0, 1, 2, -1, -4])).toStrictEqual([
    [-1, -1, 2],
    [-1, 0, 1],
  ]);
});

test("empty case", () => {
  expect(threeSum([])).toStrictEqual([]);
});

test("zero case", () => {
  expect(threeSum([0])).toStrictEqual([]);
});
