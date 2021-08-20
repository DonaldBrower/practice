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

/* properties from regular expression exec output are mapped to Group object */
class Group {
  /**
   * regexRes = an object that represents the returned value of a call to
   *  regex.exec(str)
   *
   * @param {string} formula - from regexRes.input,, the whole formula, needed so
   *  that the coeffcient, which will be outside of the group, can be captured
   *  and assigned to this.coeffecient
   *
   * @param {string} content - from regexRes[0],, regexRes is an array with some
   *  extra properties, taking the zeroth index will give you the matched text
   *
   * @param {number} idxFirst - regexRes.index,, index of where the first char
   *  in regexRes[0] matches in regexRes.input
   *
   * @param {nummber} contentIdxLast - regexRes.index + regexRes[0].lenghth - 1,,
   *  index of the last char in regexRes[0] in regexRes.input
   */
  constructor(formula, content, idxFirst, contentIdxLast) {
    this.content = content;
    this.idxFirst = idxFirst;
    this.coefficient = extractAllNumbersAfterIdx(formula, contentIdxLast);
    this.wholegroupIdxLast =
      idxFirst +
      content.length +
      (this.coefficient ? this.coefficient.toString().length - 1 : -1);
  }
}

module.exports = {
  isCap,
  isNumber,
  replace,
  tupleJoin,
  extractAllNumbersAfterIdx,
  Group,
};
