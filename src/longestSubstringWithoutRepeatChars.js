const repeatsInString = (char, currentSubstring) => {
  if (currentSubstring.indexOf(char) !== -1) return true;
};

/**
 * @param {String} s - string to search for longest substring with no repeating characters
 * 
 * @param {Object} state - a mutable object who's properties keep track of what we need to know about which substring any character is a part of
 * 
 * @param {String} state.currentBuffer - Characters are added to the currentSubstring property until a repeating character is iterated on, in which the currentSubstring's length is pushed to another array, and the currentSubstring property is reset to an empty string. The repeat character which was being iterated on when this process was kicked off is then added to the currentSubstring (now currently set to zero) and the loop keeps moving
 * 
 * @param {Array} state.nonRptSubstringLengths - a store of all the lengths of non-repeat strings that have been iterated through.
	

  decides what to do with each character in s

  char is either:
  	not unique among the characters in state.currentSubstring: 
    	-> buffer length is pushed to array of unique substring lengths
      -> buffer is reset
      -> char is appended to buffer, making it the first char in new substring
    unique among the characters in state.currentSubstring:
    	-> char is appended to buffer

  nextChar is:
  	undefined:
    	-> buffer length is pushed to array of unique substring lengths
*/
const stateMachine = (s, state) => {
  if (s === "") return 0;
  let chars = s.split("");
  let { currentSubstring, nonRptSubstringLengths } = state;

  chars.forEach((char, idx) => {
    let nextChar = chars[idx + 1];

    if (repeatsInString(char, currentSubstring)) {
      nonRptSubstringLengths.push(currentSubstring.length);
      currentSubstring = "";
      currentSubstring += char;
    } else {
      // if it's not a repeat character, than it should be added to the buffer
      currentSubstring += char;
    }
    if (nextChar === undefined) {
      // this is the final character
      nonRptSubstringLengths.push(currentSubstring.length);
    }
  });

  let longestRptSubstringLength =
    nonRptSubstringLengths.sort()[nonRptSubstringLengths.length - 1]; // the last index (greatest value)

  return longestRptSubstringLength;
};

/**
 * @param {string} s
 * @return {number}
 calls the statemachine and passes in characters and default state
 */
var lengthOfLongestRptSubstring = function (s) {
  const state = {
    currentSubstring: "",
    nonRptSubstringLengths: [],
  };
  const lengthOfLongestRptSubstring = stateMachine(s, state);
  return lengthOfLongestRptSubstring;
};

lengthOfLongestRptSubstring("abcabcd");
