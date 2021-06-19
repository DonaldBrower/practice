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
atoms are tokenized while recursivly moving through the inside all of the 
grouped sections of the forumla, as well as after reducing the tuples in a map

uses state machine, returns an array of Tuples:
[atomName: str, atomQty: num]
*/
const tokenizeAtoms = (atomString, stateMachine) => {
  const atomChars = atomString.split("");

  const state = {
    buffer: "",
    quantString: "",
    atoms: [],
  };
  /* 
  vocab:
    - atom string: [[A [b [...b]]...]
        in a formula: HO(KOg2)3
          -> HO, KOg
    - atom number [atomString[*int]]
        in a formula: HO(KOg2)3
          -> 2 -- from the atom string/number COMBINATION of KOg2

        note that 3 is not an atom number. it is a grouping multiplier number
        so it is applied to the atom qty in the tuples, which has already been given whatever initial value after the atom number was distributed to the atoms.

  before the characters and state obj goes through the state machine:
    - get every atom string and optional number that is either independent of groups, or the groups' content

    let tempTuples = []
    atomChars.forEach

    HO(KOg3)2 -> ["HO" "KOg3"]
    - create a new tuple for every substring of this atom string that represents 
    and individual atom eg:
    
    "HO" -> [[H, undef], [O, undef]]


  */
  stateMachine(atomChars, state);
  return state.atoms;
};

/*
logic for the atoms tokenization
	-> read each character and it's next
  -> build up the atom string and the string of the optional number
  -> reset these string states once it's determined the loop is on the
     last character of the atom
     
  update: 3:38 - the state machine logic is all wrong. i don't know yet
  what the implication is for the rest of the program.
  
  right now, tokenize("MgOg2") would return [Mg, 1], [Og, 2]
  but it should return [Mg, 2], [Og, 2]
  
  if parenthesis are used, then only the atoms inside get the coeffcient, eg:
    "Mg(OH)2" [Mg, 1], [O, 2], [H, 2] 


  is it possible to just distribute the atom string coeffecients before handling any parenthesis groups, that
  way one the distribution of the group coefeccient  happens, it can be applied to all the tuples, and then can be simply reduced
  without worrying about if the right distribution was made with regards to the atom string expansions

  right now Mg(OH)2 ->

  
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
    // debugger;
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
//     is the next char the end of this atom/these atoms?
//     if (["(", ")", null].includes(nextChar)) {
//     	atoms.push([state.buffer, +state.quantString)
//     }
//     if (isCap(nextChar) === true || nextChar === null) {
//     	if (isNumber(char)) state.quantString += char;
//     	if (typeof char === "string") state.buffer += char;

//       if (!state.quantString) state.quantString = "1";

//       state.atoms.push([state.buffer, +state.quantString]);
//       state.buffer = "";
//       state.quantString = "";
//     }

//     if (isCap(nextChar) === false) {
//       if (!isNumber(char)) {
//       	state.buffer += char;
//       } else if (isNumber(char)) {
//         state.quantString += char;
//   });

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

  //   debugger;
  if (formula.indexOf("(") === -1) {
    return tokenizeAtoms(formula, stateMachine);
  }

  let openParenIdx = formula.lastIndexOf("(");
  let closeParenIdx = formula.indexOf(")");
  let groupTuple = findNumberAfterCloseParen(formula, closeParenIdx);

  let rawContent = formula.slice(openParenIdx + 1, closeParenIdx);
  let groupContent = tokenizeAtoms(rawContent, stateMachine2);

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

console.log(simplifyChemicalFormula("Mg(OH)2"));
console.log(tokenizeAtoms("Mg(OH)2", stateMachine2));
console.log(simplifyChemicalFormula("MgOg2"));
console.log(tokenizeAtoms("MgOg2", stateMachine2));

/*
what im seeing now is that when parens are there, simplifyChemicalFormula() works and makes the right string according to the screenshot

simplifyChemicalFormula("Mg(OH)2")
tokenizeAtoms("Mg(OH)2", stateMachine2)

-> H2Mg1O2                                                          // correct
-> [ [ 'Mg', 2 ], [ '(', 2 ], [ 'O', 2 ], [ 'H', 2 ], [ ')', 2 ] ]  // wrong

When no parens in main formula, the tokenizeAtoms routine with the stateMachine2 callback creates the right tokens, but the current simplifyRoutine doesn't achieve this.
the current simplifyRoutine calls tokenizeAtoms(..., stateMachine), so the original logic.

simplifyChemicalFormula("MgOg2")        // wrong
tokenizeAtoms("MgOg2", stateMachine2)   // correct

-> Mg1Og2
-> [ [ 'Mg', 2 ], [ 'Og', 2 ] ]
*/
