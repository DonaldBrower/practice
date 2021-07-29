const { isCap, isNumber, replace, tupleJoin } = require("./utils");

const { Group } = require("./Group.js");

/* main loop */
main("MgA4(OgHKLMg(HOg3)2(KP9))");
function main(formula) {
  const x_innerGroups = innerGroups(formula);
  const formulaInnerGroupsExpanded = expandInnerGroups(formula, x_innerGroups);
  const replacedInnerGroupFormula = replaceGroupsInString(
    formula,
    formulaInnerGroupsExpanded
  );
  const parenGroups = deepestGroups(replacedInnerGroupFormula);
  console.log(parenGroups);

  // the transformed formula is going to go into this function, and recursivly have the multiplicity applied all groups and subgroups.
  // deepestGroups();

  // console.log(JSON.stringify(formulaInnerGroupsExpanded, undefined, 2));
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
  return innerGroups;
  console.log(JSON.stringify(innerGroups, undefined, 2));
}

function replaceGroupsInString(targetString, tokengroups) {
  let updatingTargetString = targetString;
  for (let i = tokengroups.length - 1; 0 < i; i--) {
    const expandedString = tupleJoin(tokengroups[i].tokens);
    updatingTargetString = replace(
      updatingTargetString,
      tokengroups[i].idxFirst,
      tokengroups[i].wholegroupIdxLast,
      expandedString
    );
  }
  return updatingTargetString;
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
