"use strict";

module.exports = { regularExpressionMatching: main };

/* 
 * breaks on "abcd" and "d*" with this purely regex soltution. Is that why this
 * question exists?
 *
 * function main(str, pattern) {
  // https://regexr.com/64btj
  var reg = new RegExp("\\b(" + pattern + ")\\b", "g");

  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
  
} */




/* linfongi's solution from leetcode */
function main(s, p) {
  var sLen = s.length, pLen = p.length; 
  var map = {};

  return check(0, 0);

  function check(sIdx, pIdx) {
    var label = `${sIdx}:${pIdx}`;

    if (map[label] !== undefined) {
      return map[label];
    }

    if (sIdx > sLen) {
      return false;
    }

    if (sIdx === sLen && pIdx === pLen) {
      return true;
    }
    
    // make more declaritive?
    if (p[pIdx] == "." || p[pIdx] == s[sIdx]) {
      map[label] = p[pIdx + 1] == "*" ?
        check(sIdx + 1, pIdx) || check(sIdx, pIdx + 2) :
        check(sIdx + 1, pIdx + 1);
    } 
    else {
      map[label] = p[pIdx + 1] == "*" ? 
        check(sIdx, pIdx + 2) : false;
    }

    return map[label]; 

  }
}
