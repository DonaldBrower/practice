recursion meetup.

recursion is more appropriate for some kinds of algorithms. pathfinding for
example.

make change problem: f(total) -> least amount of coins to make the total

what are the differnt parts of a recursive solution? Bianca says:

- where the loop starts
- where it ends
- how it gets from start to end

illustrates this first with the startments between the parenthesis of a for
loop. (what is the correct term for that?)

```
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// let i = 0;  <-- where the loop starts
// i < 5;      <-- where it ends
// i++;        <-- how it gets from start to end
```

now the example of a recursive loop function

```
function loop(i = 0) {
  if (i > 5) {
    return;
  }

  console.log(i);

  loop(i+1);
}

loop();

/**
  - in this case we don't need to return anything because we're just logging.
  - in cases where we'll need to return something from the recursive function
    call, it's for a strategic reason. she said "when we don't want to lose our value in the stack."
**/
```

the next example was a pathfinding problem

@TODO -> read through the examples, try the practice problems:
https://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/

if m or n is one, then there is ony one path.

0 -> 1
00 -> 1x2

00 -> 2x2
00

"the sum of f(m - 1, n), f(m, n - 1)" - bianca.

"relationship of the number of paths between one by two and two by two" -
Bianca.

what is that relationship?

```
function that's gonna return the number of paths from the top right to the top
left in an mXn matrix

function numberOfPaths(m, n) {
  if (m == 1 || n == 1) {
    return 1
  }

  return numberOfPaths(m - 1, n) + numberOfPaths(m, n - 1);
}
```

numberOfPaths(3,3);

Bianca on recursion problems, interview questions, how to think about them. paraphrasing:

"if you don't have an immediate aha moment, think of the easiest version of the
problem. a complicated path problem? think of this one."
