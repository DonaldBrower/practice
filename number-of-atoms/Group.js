const { extractAllNumbersAfterIdx } = require("./utils");

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

module.exports = { Group };
