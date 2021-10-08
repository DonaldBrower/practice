"use strict";

module.exports = {
  pathFinder,
};

/**
 * find the number of paths from the top left to the bottom right of an m by n
 * matix
 * */
function pathFinder(m, n) {
  if (m == 1 || n == 1) return 1;

  return pathFinder(m - 1, n) + pathFinder(m, n - 1);
}

//*************************************************************
// HELPERS
