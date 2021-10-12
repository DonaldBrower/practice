var { basicCalculator } = require("../basic-calculator.js");

test("it behaives", () => {
  expect(basicCalculator("1 + 1")).toBe(2);
});

test("it still behaives", () => {
  expect(basicCalculator("2 - 1 + 2")).toBe(3);
});

test("it really still behaives", () => {
  expect(basicCalculator("(1+(4+5+2)-3)+(6+8)")).toBe(23);
});
