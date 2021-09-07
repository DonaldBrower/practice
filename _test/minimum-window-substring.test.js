var { minWindow } = require("../minimum-window-substring.js");

test("it behaives", () => {
  expect(minWindow("ADOBECODEBANC", "ABC")).toBe("BANC");
});

test("it still behaives", () => {
  expect(minWindow("a", "aa")).toBe("");
});

test("it really still behaives", () => {
  expect(minWindow("bdab", "ab")).toBe("ab");
});
