"use strict";

module.exports = {
  minWindow: main,
};

//*************************************************************
function main(source, target) {
  var source__remainingCharsOfType = target
    .split("")
    .reduce(addToRemaingCharsOfType, { total: target.length });
  /**
   * example -> target === "ABAC":
   *   {
   *     A: 2,
   *     B: 1,
   *     C: 1,
   *     total: 4
   *   }
   */

  var remainingCharsOfType = { ...source__remainingCharsOfType };

  var shortestWindow = "";
  var currentWindow = "";

  for (let char of source) {
    if (isLastCharInMap(char, remainingCharsOfType)) {
      currentWindow += char;

      if (shouldUpdateShortest(shortestWindow, currentWindow)) {
        shortestWindow = currentWindow;
      }

      // reset after updating
      currentWindow = "";
      remainingCharsOfType = { ...source__remainingCharsOfType };

      continue;
    }

    if (isCharInMap(char, remainingCharsOfType)) {
      currentWindow += char;
      remainingCharsOfType[char]--;
      remainingCharsOfType.total--;
      continue;
    }

    if (windowIsOpen(currentWindow)) {
      currentWindow += char;
      continue;
    }
  }

  return shortestWindow;
}

//*****************************************
function addToRemaingCharsOfType(acc, char) {
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
