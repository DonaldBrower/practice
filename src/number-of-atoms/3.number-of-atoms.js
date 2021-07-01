// the group objects should only be created once inner groups have been simplified

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
    // this.wholegroupIdxLast = this.coefficient.toString().length - 1 || -1;
    this.wholegroupIdxLast =
      idxFirst +
      content.length +
      (this.coefficient ? this.coefficient.toString().length - 1 : -1);
  }
}
/**
 *
 * @param {*} formula - the string that the contentIdxLast parameter originates
 *  from
 * @param {*} contentIdxLast - the index of the character that will be used
 *  as the starting point from extracting all digits until a non-digit is
 *  founr
 *
 * @example
 */
const extractAllNumbersAfterIdx = (formula, contentIdxLast) => {
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
};

/**
 *
 * @param {*} formula
 * @returns {Group[]} - returns a collection of Group objects, created
 *  from the match results of applying a regexp to the formula
 */
const deepestGroups = (formula) => {
  let deepestGroups = new RegExp(/(\([^\(]+?\))/g);
  console.log();
  return [...formula.matchAll(deepestGroups)].map((group) => {
    return new Group(
      group.input,
      group[0],
      group.index,
      group.index + group[0].length - 1
    );
  });
};

/**
 *
 * @param {*} formula
 * @returns {Group[]} returns a collection of Group objects, created from the
 *  match results of applying the atomsInGroups regular expression to the formula
 */
const innerGroups = (formula) => {
  let atomsInGroups = new RegExp(/([A-Za-z]+)/g);
  return [...formula.matchAll(atomsInGroups)].map((group) => {
    return new Group(
      group.input,
      group[0],
      group.index,
      group.index + group[0].length - 1
    );
  });
  console.log();
};

const expandInnerGroups = (formula, innerGroups) => {
  for (let i = innerGroups.length; i >= 0; i--) {
    console.log(innerGroups[i]);
  }
};

/* main loop */

const main = (formula) => {
  // console.log(JSON.stringify(innerGroups(formula), undefined, 4));
  // console.log(JSON.stringify(deepestGroups(formula), undefined, 4));

  expandInnerGroups(formula, innerGroups(formula));
};

main("Mg(OH2(O2)22(O5))2");
