const isCap = (str) => {
  if (Number(str) === +str) return false;

  if (str === str.toUpperCase()) {
    return true;
  } else {
    return false;
  }
};

const isNumber = (str) => {
  if (Number(str) === +str) {
    return true;
  } else {
    return false;
  }
};

const replace = (string, open, close, replaceStr) => {
  // replace an index range, inclusive of the start and end indexes
  let charArr = string.split("");
  charArr.splice(open, close + 1 - open);

  let replaceStrCharArray = replaceStr.split("");

  let frontArray = charArr.splice(0, open);

  let joinedArray = [].concat(frontArray, replaceStrCharArray, charArr);

  return joinedArray.join("");
};

const tupleJoin = (tuplesArr) => {
  // returns
  let str = "";
  tuplesArr.forEach((tuple) => {
    str += tuple.join("");
  });
  return str;
};

function extractAllNumbersAfterIdx(formula, contentIdxLast) {
  let numberHasEnded = false,
    i = contentIdxLast,
    output = "";

  while (!numberHasEnded) {
    if (Number.isInteger(+formula[++i])) {
      output += formula[i];
    } else {
      numberHasEnded = true;
    }
  }

  return +output;
}

module.exports = {
  isCap,
  isNumber,
  replace,
  tupleJoin,
  extractAllNumbersAfterIdx,
};
