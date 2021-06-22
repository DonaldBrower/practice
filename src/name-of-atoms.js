/*
trying to solve this by
	1. expanding any parenthesis groups and distributing the right hand coeffecients (Mg2)->3<-, until it's just one long string
     eg: Abc(Def(Abc)2)3 -> AbcDef3Abc2Abc2																							
	2. Tokenizing the string: [ 
  	 	["Abc": 1],
      ["Def": 3],
      ["Abc": 2],
			["Abc": 2],
		 ]
  3. Reducing, and sorting by arrayElement[0]: [
			["Abc": 5],
			["Def": 3]
  ]
	4. joing the tuples and making a new string: "Abc5Def3"

/*
turn a string of atom names and numbers into an array of tuples:
[ [name, number], ... ]
*/
function main() {
  // let expandedGroups = expandGroups("MgOg2");
  let expandedGroups = expandGroups("Abc(Def(AbcOg2)2)3");
  return simplifyChemicalFormula(expandedGroups);
}

/* utils */
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

/*
 * atoms are tokenized while recursivly moving through the inside all of the
 * grouped sections of the forumla, as well as after reducing the tuples in a map
 *
 * uses state machine, returns an array of Tuples:
 * [atomName: str, atomQty: num]
 */
const tokenizeAtoms = (atomString, stateMachine) => {
  const atomChars = atomString.split("");

  const state = {
    buffer: "",
    quantString: "",
    atoms: [],
  };

  stateMachine(atomChars, state);
  return state.atoms;
};

/* 
  tokenize("MgOg2") should return [Mg, 2], [Og, 2]
  
  if parenthesis are used, then only the atoms inside get the coeffcient, eg: "Mg(OH)2" [Mg, 1], [O, 2], [H, 2] 

  distribute the atom string coeffecients before handling any parenthesis groups, so when the distributing the group coefeccient  happens, it can be applied to all the tuples, and then can be simply reduced  
*/
const stateMachine = (atomCharacters, state) => {
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
};

/*
  split by atom
  use option number at the end of continuous atom markers, or zero, and assign it to right side of tuple

  K(MgAu(HO2)2)3
*/
const stateMachine2 = (atomCharacters, state) => {
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
};

const distributeOverAtoms = (coeffecient, atoms) => {
  atoms.forEach((atom) => {
    atom[1] = atom[1] * coeffecient;
  });
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

const findNumberAfterCloseParen = (formula, parenIdx) => {
  let numStr = "";

  if (!isNumber(formula[parenIdx + 1])) {
    return [1, parenIdx];
  }

  while (isNumber(formula[parenIdx + 1])) {
    numStr += formula[parenIdx + 1];
    parenIdx++;
  }

  if (numStr === "") {
    return [1, null];
  } else {
    return [+numStr, parenIdx];
  }
};

const createExpandedExpression = (formula) => {
  /*
    stateMachine2 distributes the optional atom number to every atom in the string in the string
    stateMachine one treats each number as if it's for the atom immediately to 
    it's left, and each atom without a number is give one  
  */

  if (formula.indexOf("(") === -1) {
    return tokenizeAtoms(formula, stateMachine);
  }

  let openParenIdx = formula.lastIndexOf("(");
  let closeParenIdx = formula.indexOf(")");
  let groupTuple = findNumberAfterCloseParen(formula, closeParenIdx);

  let rawContent = formula.slice(openParenIdx + 1, closeParenIdx);
  let groupContent = tokenizeAtoms(rawContent, stateMachine);

  distributeOverAtoms(groupTuple[0], groupContent);

  let expandedGroupStr = tupleJoin(groupContent);
  let replacedFormula = replace(
    formula,
    openParenIdx,
    groupTuple[1],
    expandedGroupStr
  );

  return createExpandedExpression(replacedFormula);
};

const simplifyChemicalFormula = (formula) => {
  let expandedExpression = createExpandedExpression(formula);

  let atomsToQty = {};
  expandedExpression.forEach((tuple, idx) => {
    if (!atomsToQty[tuple[0]]) {
      atomsToQty[tuple[0]] = tuple[1];
    } else if (atomsToQty[tuple[0]]) {
      atomsToQty[tuple[0]] += tuple[1];
    }
  });

  let reducedTuples = [];
  for (let key in atomsToQty) {
    reducedTuples.push([key, atomsToQty[key]]);
  }

  let sortedTuples = reducedTuples.sort();
  return tupleJoin(sortedTuples);
};

/**
 * one approach is:
 *
 * in addition to the ourArray array of atom tuples, maybe we should include a piece
 * of data that also includes the start and end indices for replacement.
 *
 * if we make the replacements from right to left, then the indices of the next replacement
 * would not be mutated.
 *
 * Mg(OH)2 - init
 * Mg(O1H1)2 - pass on tuples[1]
 * Mg1(O1H1)2 - pass on tuples [0]
 *
 * tuples = [
 *   OurArray:[[Mg, 1], 0, 1]
 *   OurArray:[[O, 1], [H, 1], 3, 4],
 * ]
 *
 * on first pass you need to get the first parenthesis group, a la
 *
 * let openParenIdx = formula.lastIndexOf("(");
 * let closeParenIdx = formula.indexOf(")");
 *
 * and on subequent runs, until there are no atoms strings between the
 * first open parenthesis, the atomstring for
 *  secondLastIndexOf("(") and nextIndexOf(")"), approaching lastIndexOf("(")
 */
const expandGroups = (formula) => {
  const chars = formula.split("");
  const groupingChars = ["(", ")"];
  let { currentAtomString, tuples, start, end } = {
    currentAtomString: "",
    tuples: [],
    start: null,
    end: null,
  };

  chars.forEach((char, idx) => {
    const nextChar = chars[idx + 1];

    if ((groupingChars.includes(char) || !nextChar) && currentAtomString) {
      // you've reached the end of this group's atom string
      end = idx - 1;

      if (!nextChar && isNumber(char)) {
        end = idx;
      }

      if (isNumber(char)) {
        currentAtomString += char;
      }

      const innerGroupAtoms = tokenizeAtoms(currentAtomString, stateMachine2);
      tuples.push([innerGroupAtoms, [start, end]]);

      currentAtomString = "";
      start = null;
      end = null;
    }

    if (!isNumber(char) && !groupingChars.includes(char)) {
      // this is part of the atom name
      currentAtomString += char;

      if (start === null) {
        start = idx;
      }
    }

    if (isNumber(char) && currentAtomString) {
      // this is an optional number, not the group coefficient
      currentAtomString += char;
    }
  });

  // move through the groups, left to right, and join the tuples and replace the atom names and
  // optional number with the joined tuples.-
  for (let i = tuples.length - 1; i >= 0; i--) {
    let mytuple = tuples[i];
    let indexTuple = mytuple[mytuple.length - 1];

    mytuple.pop();

    let replaceString = "";
    mytuple.forEach((tuple) => {
      replaceString += tupleJoin(tuple);
    });

    formula = replace(formula, indexTuple[0], indexTuple[1], replaceString);
  }

  return formula;
};

console.log(main());
