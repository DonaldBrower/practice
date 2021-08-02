var { isCap, isNumber, replace, tupleJoin } = require("./utils");

var { Group } = require("./Group.js");

/* main loop */
main("MgA4(OgHKLMg(HOg3)2(KP9))");

// ******************************************************************************************
function main(formula) {
  var innerGroupContent = innerGroups(formula);

  var innerGroupContentExpanded = expandInnerGroups(innerGroupContent);
  var formulaInnerGroupsExpanded = replaceGroupsInString(
    formula,
    innerGroupContentExpanded
  );

  // ***************************************************************************

  var fullyExpandedString = recursivelyExpandDeepestGroups(
    formulaInnerGroupsExpanded
  );
  console.log(
    reduceFinalTuples(tokenizeAtoms(fullyExpandedString, stateMachine))
  );
  function recursivelyExpandDeepestGroups(formula) {
    // formula doesn't contain any parens, then we've hit our base case)
    if (!formula.match(/\(|\)/g)) {
      return formula;
    }

    // extract deepest group, expand, and recurse with the expanded string as the
    //  argument

    var parenGroupContent = deepestGroups(formula);

    var expandedParenGroups = parenGroupContent.map(function expand(group) {
      group.tokens = tokenizeAtoms(
        group.content.replace(/\(|\)/g, ""),
        stateMachine
      );
      if (group.coefficient > 1) {
        distributeOverAtoms(group.coefficient, group.tokens);
      } else {
        distributeOverAtoms(1, group.tokens);
      }
      return group;
    });

    var formulaParenGroupsExpanded = replaceGroupsInString(
      formula,
      expandedParenGroups
    );

    return recursivelyExpandDeepestGroups(formulaParenGroupsExpanded);
  }
  function reduceFinalTuples(tuples) {
    var atomsToQty = {};
    tuples.forEach(function processTuple(tuple, idx) {
      if (!atomsToQty[tuple[0]]) {
        atomsToQty[tuple[0]] = tuple[1];
      } else if (atomsToQty[tuple[0]]) {
        atomsToQty[tuple[0]] += tuple[1];
      }
    });

    var reducedTuples = [];
    for (let key in atomsToQty) {
      reducedTuples.push([key, atomsToQty[key]]);
    }

    var sortedTuples = reducedTuples.sort();
    return tupleJoin(sortedTuples);
  }
}

// ******************************************************************************************
/**
 * use the output of innerGroups(formula) to simplify the expressions within each group.
 * @param {*} formula
 * @param {*} innerGroups
 */
function expandInnerGroups(innerGroups) {
  for (let i = innerGroups.length; i >= 0; i--) {
    if (innerGroups[i]) {
      var { content, coefficient } = innerGroups[i];

      innerGroups[i].tokens = tokenizeAtoms(content, stateMachine);

      var { tokens } = innerGroups[i];

      if (coefficient > 0) {
        distributeOverAtoms(coefficient, tokens);
      }
    }
  }
  return innerGroups;
}

function replaceGroupsInString(target, groups) {
  var updatingTarget = target;

  for (let i = groups.length - 1; 0 <= i; i--) {
    var { idxFirst, wholegroupIdxLast, tokens } = groups[i];

    var expandedString = tupleJoin(tokens);
    updatingTarget = replace(
      updatingTarget,
      idxFirst,
      wholegroupIdxLast,
      expandedString
    );
  }
  return updatingTarget;
}

function distributeOverAtoms(coeffecient, atoms) {
  atoms.forEach(function distributeOverAtom(atom) {
    atom[1] = atom[1] * coeffecient;
  });
}

/**
 * @param {*} formula
 * @returns {Group[]} - returns a collection of Group objects, created
 *  from the match results of applying a regexp to the formula
 */
function deepestGroups(formula) {
  var deepestGroups = new RegExp(/(\([^\(]+?\))/g);

  return [...formula.matchAll(deepestGroups)].map(function groupFromRgx(group) {
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
  var atomsInGroups = new RegExp(/([A-Za-z]+)/g);

  return [...formula.matchAll(atomsInGroups)].map(function groupFromRgx(group) {
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
  var atomChars = atomString.split("");

  var state = {
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
  atomCharacters.forEach(function procesChar(char, i) {
    var nextChar = atomCharacters[i + 1] || null;

    // is this the last character for this atom/number?
    if (isCap(nextChar) === true || nextChar === null) {
      if (!isNumber(char)) {
        state.buffer += char;
      } else if (isNumber(char)) {
        state.quantString += char;
      }

      if (!state.quantString) {
        state.quantString = "1";
      }

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
