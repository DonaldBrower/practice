'use strict'

// while loops
function chessboard(size) {
  let i = 0 
  let oddRow = ''
  let evenRow = ''
  
  // build strings
  while (i < size) {
    if (i % 2 === 0) {
      oddRow += ' '
      evenRow += '#'
    } else { 
      oddRow += '#'
      evenRow += ' '
    }
   i++
  } 

  i = 0
  
  // lay out board
  while (i < size) {
    if (i % 2 === 0) {
      console.log(evenRow)
    } else {
      console.log(oddRow) 
    } 
    i++
  }
}

chessboard(20)


