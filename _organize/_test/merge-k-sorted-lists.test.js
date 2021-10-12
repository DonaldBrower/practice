var {
  mergeKSortedLists,
  createLinkedListsFromRepresentation,
} = require("../merge-k-sorted-lists.js");

var arrRepresentationOfLinkedLists = [
  [1, 4, 5],
  [1, 3, 4],
  [2, 6],
];

test("the list is flattend and the links are sorted", () => {
  var expectedOutput = [
    {
      val: 1,
      next: 1,
    },
    {
      val: 1,
      next: 2,
    },
    {
      val: 2,
      next: 3,
    },
    {
      val: 3,
      next: 4,
    },
    {
      val: 4,
      next: 4,
    },
    {
      val: 4,
      next: 5,
    },
    {
      val: 5,
      next: 6,
    },
    {
      val: 6,
      next: null,
    },
  ];
  expect(mergeKSortedLists(arrRepresentationOfLinkedLists)).toStrictEqual(
    expectedOutput
  );
});
test("creates a linked list node from the representation arrays used as input", () => {
  expect(createLinkedListsFromRepresentation([[1, 2]])).toEqual([
    [
      { val: 1, next: 2 },
      { val: 2, next: null },
    ],
  ]);
});
// test("median of 0,0 and 0,0 === 0.00000", () => {
//   expect(mergeKSortedLists([0, 0], [0, 0])).toBe(0.0);
// });
// test("median of BLANK and 1 === 1.00000", () => {
//   expect(mergeKSortedLists([], [1])).toBe(1.0);
// });
// test("median of 2 and BLANK === 2.00000", () => {
//   expect(mergeKSortedLists([2], [])).toBe(2.0);
// });
