/*
  moving from right to left 
  will the switch at position 9 be off if it is flipped from the on or off once for satisfying it's own condition, and q times for every switch at a position (q) that is divisible by 9

  n - how many digits, up to and including n, are divisible by n
    - if even, dont push n
    - if odd, push n 
  
  9 - 1
  8 - 0
*/

console.log(off(9));

function off(n) {
  const offSwitches = [];

  return recurse(n);
  function recurse(n) {
    if (n < 1) return offSwitches;

    // in the list of numbers (switches) 1.. n, if there are an odd number of
    // numbers that n is divisible by, push n to the output array
    let divisibles = 0;
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) divisibles++;
    }
    if (divisibles % 2 !== 0) offSwitches.push(n);

    return recurse(--n);
  }
}
