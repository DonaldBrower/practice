const isInBuffer = (char, buffer) => {
  if (buffer.indexOf(char) !== -1) {
    return true;
  }
}
/**
	chars: Arr, 
  state: Object { 
  	currentBuffer: Str, 
    uniqueSubstr: ArrInt
  }
  makes a decision on what to do with each character
 	among the current buffer, char can be either:
  	non unique 
    	-> buffer length is pushed to array of unique substring lengths
      -> buffer is reset
      -> char is appended to buffer, making it the first char in new substring
    unique 
    	-> char is appended to buffer
 	next char can be either defined or undefined:
  	undefined:
    	-> buffer length is pushed to array of unique substring lengths
*/
const stateMachine = (chars, state) => {
  chars.forEach((char, idx) => {
    let nextChar = chars[idx+1]
    if (isInBuffer(char, state.currentBuffer)) {
      // a repeat char has entered the loop
      state.uniqueSubstrings.push(state.currentBuffer.length);
      state.currentBuffer = "";
      state.currentBuffer += char;
    } else {
      // if it's not a repeat character, than it should be added to the buffer
      state.currentBuffer += char;
    }
    if (nextChar === undefined) {
      // this is the final character
      state.uniqueSubstrings.push(state.currentBuffer.length);
    }
  });
  let uniqueSubStringsLength = state.uniqueSubstrings.length;
  let lengthOfLongestSubStr = state.uniqueSubstrings.sort()[uniqueSubStringsLength-1]
  return lengthOfLongestSubStr;
}
/**
 * @param {string} s
 * @return {number}
 calls the statemachine and passes in characters and default state
 */
var lengthOfLongestSubstring = function(s) {
  if (s === "") return 0;
  let state = {
    "currentBuffer": "",
    "uniqueSubstrings": []
  };
  let lengthOfLongestStr = stateMachine(s.split(""), state);
  return lengthOfLongestStr;
};
lengthOfLongestSubstring("abcabcaa")