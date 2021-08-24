var { regularExpressionMatching } = require('../regular-expression-matching.js');

test("pattern doesn't match the entire string", () => {
  expect(regularExpressionMatching("aa", "a")).toBe(false);
});

test("pattern matches because of the star (*)", () => {
  expect(regularExpressionMatching("aa", "a*")).toBe(true);
});

test("matches zero or more of any charcater", () => {
  expect(regularExpressionMatching("ab", ".*")).toBe(true);
});

test("c can be repeated 0 times, a can be repeated one time", () => {
  expect(regularExpressionMatching("aab", "c*a*b")).toBe(true);
});

test("crooked letter", () => {
  expect(regularExpressionMatching("mississippi", "mis*is*p*.")).toBe(false);
});

test(" 'abcd' 'd*' false", () => {
  expect(regularExpressionMatching("abcd", "d*")).toBe(false);
});



