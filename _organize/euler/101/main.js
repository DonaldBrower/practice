"use strict";
console.log(main());
/**
 * project euler:
 *
 * optimum polynomial, problem 101
 *
 * polynomial function: 1 - n + n^2 - n^3 + n^4 - n^5 + n^6 - n^7 + n^8 - n^9 + n^10
 *
 */
function main() {
  // generate first two terms in the sequence
  var firstTwoTerms = [];
  for (let i = 1; i < 3; i++) firstTwoTerms.push(polynomialGenerator(i));
  return firstTwoTerms;

  /**
   * how do i get the assumed polynomial generating function from n terms in a sequence?
   *
   * constant function for a sequence with one term
   *
   * sequence with two terms has a linear relationship between the terms
   *
   * sequence with three terms has a quadratic relationship between the terms
   */
}

function polynomialGenerator(n) {
  return (
    1 -
    n +
    power(n, 2) -
    power(n, 3) +
    power(n, 4) -
    power(n, 5) +
    power(n, 6) -
    power(n, 7) +
    power(n, 8) -
    power(n, 9) +
    power(n, 10)
  );
}

function power(number, raisedTo) {
  var numberCopy = number;

  while (raisedTo > 1) {
    number = number * numberCopy;
    raisedTo = raisedTo - 1;
  }

  return number;
}
