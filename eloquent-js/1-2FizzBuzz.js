'use strict'

// three statement for loop 
function fizzbuzz (limit) {
  for (let i = 0; i <=  limit; i++) {
    if (i % 3 === 0) {
      console.log('fizz')
    } else if ( i % 5 === 0) {
      console.log('buzz')
    } else {
      console.log(i.toString())
    }
  }
}

fizzbuzz(100)


