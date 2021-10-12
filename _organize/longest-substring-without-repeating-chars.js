/**	
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

console.log(lengthOfLongestSubstring("abcabcaa"));

/**
 * @param {string} s
 * @return {number}
 calls the statemachine and passes in characters and default state
 */
function lengthOfLongestSubstring(s) {
  if (s === "") return 0;
  const state = {
    currentBuffer: "",
    uniqueSubstrings: [],
  };

  const lengthOfLongestStr = stateMachine(s.split(""), state);
  return lengthOfLongestStr;
}

function stateMachine(chars, state) {
  let { currentBuffer, uniqueSubstrings } = state;

  chars.forEach((char, i) => {
    let nextChar = chars[i + 1];

    if (isInBuffer(char, currentBuffer)) {
      // a repeat char has entered the loop
      uniqueSubstrings.push(currentBuffer.length);
      currentBuffer = "";
      currentBuffer += char;
    } else {
      // if it's not a repeat character, than it should be added to the buffer
      currentBuffer += char;
    }

    // this is the final character
    if (nextChar === undefined) {
      uniqueSubstrings.push(currentBuffer.length);
    }
  });

  let uniqueSubStringsLength = uniqueSubstrings.length;
  let lengthOfLongestSubStr =
    uniqueSubstrings.sort()[uniqueSubStringsLength - 1];

  return lengthOfLongestSubStr;
}
function isInBuffer(char, buffer) {
  if (buffer.indexOf(char) !== -1) return true;
}
