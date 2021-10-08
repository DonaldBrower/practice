var { pathFinder } = require("../pathFinder.js");

test("edge: 1x1 works", () => {
  expect(pathFinder(1, 1)).toBe(1);
});

test("1x2, 2x1 work", () => {
  expect(pathFinder(1, 2)).toBe(1);
  expect(pathFinder(2, 1)).toBe(1);
});

test("2x2, works", () => {
  expect(pathFinder(2, 2)).toBe(2);
  //expect(pathFinder(3, 3)).toBe(1);
  //expect(pathFinder(4, 4)).toBe(1);
});

//test("2x3, works", () => {
//expect(pathFinder(2, 3)).toBe(2);
//});
