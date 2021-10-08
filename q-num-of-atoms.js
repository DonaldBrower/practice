"use strict";

// import queue!
// const queue = require("../../../");

module.exports = {
  minWindow: main,
};
//*********k****************************************************
function main(source, target) {
  var remainingCharsOfType = target
    .split("")
    .reduce(addToRemaingCharsOfType, { total: target.length });
}

//*****************************************
/* function addToRemaingCharsOfType(acc, char) {
  if (!acc[char]) acc[char] = 1;
  else acc[char]++;
  return acc;
}

function isCharInMap(char, map) {
  if (map[char] > 0) return true;
  else return false;
}

function isLastCharInMap(char, map) {
  if (map[char] > 0 && map.total - 1 === 0) return true;
  else return false;
}

function shouldUpdateShortest(shortestWindow, currentWindow) {
  if (!shortestWindow || currentWindow.length < shortestWindow.length)
    return true;
  else return false;
}

function windowIsOpen(currentWindow) {
  if (currentWindow.length > 0) return true;
  else return false;
}
*/
