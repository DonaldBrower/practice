const { isCap, isNumber, replace, tupleJoin } = require("./utils");
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
    this.wholegroupIdxLast =
      idxFirst +
      content.length +
      (this.coefficient ? this.coefficient.toString().length - 1 : -1);
  }
}

/* main loop */
main("MgA4(OgHKLMg(HOg3)2(KP9))");
function main(formula) {
  const x_innerGroups = innerGroups(formula);
  const formulaInnerGroupsExpanded = expandInnerGroups(formula, x_innerGroups);

  console.log();
  // console.log(JSON.stringify(innerGroups(formula), undefined, 4));
  // console.log(JSON.stringify(deepestGroups(formula), undefined, 4));
  // expandInnerGroups(formula, innerGroups(formula));
}

/**
 *  use the output of innerGroups(formula) to simplify the expressions within each group
 * @param {*} formula
 * @param {*} innerGroups
 */
function expandInnerGroups(formula, innerGroups) {
  for (let i = innerGroups.length; i >= 0; i--) {
    if (innerGroups[i]) {
      let { content, coefficient } = innerGroups[i];
      innerGroups[i].tokens = tokenizeAtoms(content, stateMachine);
      let { tokens } = innerGroups[i];

      if (coefficient > 0) {
        distributeOverAtoms(coefficient, tokens);
      }
    }
  }

  //move through each group and replace it's index range in the formula with the joined tuples

  console.log(JSON.stringify(innerGroups, undefined, 2));
}

function distributeOverAtoms(coeffecient, atoms) {
  console.log();

  atoms.forEach((atom) => {
    atom[1] = atom[1] * coeffecient;
  });

  console.log();
}

/**
 *
 * @param {*} formula - the string that the contentIdxLast parameter originates
 *  from
 * @param {*} contentIdxLast - the index of the character that will be used
 *  as the starting point from extracting all digits until a non-digit is
 *  found
 */

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

/**
 *
 * @param {*} formula
 * @returns {Group[]} - returns a collection of Group objects, created
 *  from the match results of applying a regexp to the formula
 */
function deepestGroups(formula) {
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
}

/**
 *
 * @param {*} formula
 * @returns {Group[]} returns a collection of Group objects, created from the
 *  match results of applying the atomsInGroups regular expression to the formula
 */
function innerGroups(formula) {
  let atomsInGroups = new RegExp(/([A-Za-z]+)/g);
  return [...formula.matchAll(atomsInGroups)].map((group) => {
    return new Group(
      group.input,
      group[0],
      group.index,
      group.index + group[0].length - 1
    );
  });
}

/*
 * atoms are tokenized while recursivly moving through the inside all of the
 * grouped sections of the forumla, as well as after reducing the tuples in a map
 *
 * uses state machine, returns an array of Tuples:
 * [atomName: str, atomQty: num]
 */
function tokenizeAtoms(atomString, stateMachine) {
  const atomChars = atomString.split("");

  const state = {
    buffer: "",
    quantString: "",
    atoms: [],
  };

  stateMachine(atomChars, state);
  return state.atoms;
}

/* 
  tokenize("MgOg2") should return [Mg, 2], [Og, 2]
  
  if parenthesis are used, then only the atoms inside get the coeffcient, eg: "Mg(OH)2" [Mg, 1], [O, 2], [H, 2] 

  distribute the atom string coeffecients before handling any parenthesis groups, so when the distributing the group coefeccient  happens, it can be applied to all the tuples, and then can be simply reduced  
*/
function stateMachine(atomCharacters, state) {
  atomCharacters.forEach((char, i) => {
    const nextChar = atomCharacters[i + 1] || null;

    // is this the last character for this atom/number?
    if (isCap(nextChar) === true || nextChar === null) {
      if (!isNumber(char)) {
        state.buffer += char;
      } else if (isNumber(char)) {
        state.quantString += char;
      }

      if (!state.quantString) state.quantString = "1";

      state.atoms.push([state.buffer, +state.quantString]);
      state.buffer = "";
      state.quantString = "";
    }

    // are there more characters in this atom/number?
    if (isCap(nextChar) === false) {
      if (!isNumber(char)) {
        state.buffer += char;
      } else if (isNumber(char)) {
        state.quantString += char;
      }
    }
  });
}

/*
  split by atom
  use option number at the end of continuous atom markers, or zero, and assign it to right side of tuple

  K(MgAu(HO2)2)3
*/
function stateMachine2(atomCharacters, state) {
  atomCharacters.forEach((char, idx) => {
    const nextChar = atomCharacters[idx + 1] || null;

    if (isNumber(char)) {
      state.quantString += char;
    }

    if (isCap(char) || !isNumber(char)) {
      state.buffer += char;
    }

    if (isCap(nextChar) || nextChar === null) {
      state.atoms.push([state.buffer, undefined]);
      state.buffer = "";
    }

    if (nextChar === null) {
      state.atoms.map((atom) => {
        atom[1] = state.quantString === "" ? 1 : +state.quantString;
        return atom;
      });

      state.buffer = "";
    }
  });
}
