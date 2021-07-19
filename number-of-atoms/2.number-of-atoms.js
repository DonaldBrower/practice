// MAIN
const numberOfAtoms = (formula) => {
  const numberOfAtoms = formula
    .expandGroupInnerContent(formula)
    .distributeGroupCoefficients(formula)
    .reduceToNumberOfAtoms(formula);

  return numberOfAtoms;
};

//MAIN PARSING LOGIC

const expandGroupInnerContent = (formula) => {
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

      const innerGroupAtoms = tokenizeAtoms(currentAtomString);
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

const tokenizeAtoms = (atomString) => {
  const atomCharacters = atomString.split("");
  const state = {
    buffer: "",
    quantString: "",
    atoms: [],
  };

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

  return state.atoms;
};

const distributeGroupCoefficients = (formula) => {
  const distributeOverAtoms = (coeffecient, atoms) => {
    atoms.forEach((atom) => {
      atom[1] = atom[1] * coeffecient;
    });
  };
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
  let groupTuple = findNumberAfterChar(formula, closeParenIdx);

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

  return distributeGroupCoefficients(replacedFormula);
};

// UTILITIES
const findNumberAfterChar = (string, char) => {
  let numStr = "";

  if (!isNumber(string[parenIdx + 1])) {
    return [1, parenIdx];
  }

  while (isNumber(string[parenIdx + 1])) {
    numStr += string[parenIdx + 1];
    parenIdx++;
  }

  if (numStr === "") {
    return [1, null];
  } else {
    return [+numStr, char];
  }
};

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
  let str = "";
  tuplesArr.forEach((tuple) => {
    str += tuple.join("");
  });
  return str;
};
