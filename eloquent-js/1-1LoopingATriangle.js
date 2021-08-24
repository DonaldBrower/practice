"use strict";

triangle(100)

//*************************
function triangle (level) {
  var triangle = { 
    count: 0, 
    output: '', 
    level 
  };
  
  do {
    triangle.output += '#'; 
    triangle.count += 1;

    console.log(triangle.output);
  } 
  while (triangle.count < triangle.level)
}



