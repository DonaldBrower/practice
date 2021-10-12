var { firstMissingPositive } = require("../firstMissingPositive.js");

test("firstMissingPositive", () => {
  expect(firstMissingPositive([4, 1, 2, 0, 3])).toBe(5);
});

test("firstMissingPositive", () => {
  expect(firstMissingPositive([1, 4, -1, 2])).toBe(3);
});

test("firstMissingPositive", () => {
  expect(firstMissingPositive([7, 8, 9, 11, 12])).toBe(1);
});

test("firstMissingPositive", () => {
  expect(firstMissingPositive([1, 7, 8, 9, 11, 12])).toBe(2);
});
