"use strict";

function Tree(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

module.exports = {
  inOrderTraverse,
  preOrderTraverse,
  postOrderTraverse,
};

function inOrderTraverse(tree) {
  if (tree === null) {
    return [];
  }

  return [
    ...inOrderTraverse(tree.left),
    tree.value,
    ...inOrderTraverse(tree.right),
  ];
}

function preOrderTraverse(tree) {
  if (tree === null) {
    return [];
  }

  return [
    tree.value,
    ...preOrderTraverse(tree.left),
    ...preOrderTraverse(tree.right),
  ];
}

function postOrderTraverse(tree) {
  if (tree === null) {
    return [];
  }

  return [
    ...postOrderTraverse(tree.left),
    ...postOrderTraverse(tree.right),
    tree.value,
  ];
}
