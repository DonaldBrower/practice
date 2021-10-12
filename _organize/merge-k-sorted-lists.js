"use strict";

module.exports = {
  mergeKSortedLists: main,
  createLinkedListsFromRepresentation,
};

//*************************************************************
function main(llArrRep) {
  var linkedLists = createLinkedListsFromRepresentation(llArrRep);
  var flatLists = linkedLists.flat();
  var flatListsValSorted = sort(flatLists);
  var flatListsNextLinkChanged = changeNextLinks(flatListsValSorted);

  return flatListsNextLinkChanged;
}

function createLinkedListsFromRepresentation(arrRep) {
  var linkedLists = arrRep.map(createList);
  return linkedLists;

  //*************************************
  function createList(llRep, i, arr) {
    return llRep.map(createNode);
  }
  function createNode(node, i, arr) {
    return { val: node, next: arr[i + 1] || null };
  }
}

function sort(arr) {
  if (arr.length < 2) return arr;

  var left = arr.slice(0, arr.length / 2);
  var right = arr.slice(arr.length / 2, arr.length);

  var leftSorted = sort(left);
  var rightSorted = sort(right);

  return merge(leftSorted, rightSorted);
}

function merge(left, right) {
  var out = [];

  while (left.length > 0 || right.length > 0) {
    if (left[0] && right[0]) {
      if (left[0].val <= right[0].val) {
        out.push(left.shift());
      } else if (right[0].val <= left[0].val) {
        out.push(right.shift());
      }

      // branching between scenarios where either:
      //   - both lists have at least one element (above if)
      //   - at least one is empty (below)
    } else if (!left[0] || !right[0]) {
      if (!left[0]) {
        out.push(right.shift());
      } else if (!right[0]) {
        out.push(left.shift());
      }
    }
  }

  return out;
}

function changeNextLinks(list) {
  // assumes the lists are sorted in an array by val

  list.forEach(function change(node, i, arr) {
    node.next = arr[i + 1]?.val || null;
  });

  return list;
}
