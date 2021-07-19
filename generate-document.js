/*
Generate Document

characters = a string of characters that can be used to create a document
document = a string

characters = 'aab !?'
document = 'aa ab!'
*/

function generateDocument(characters, doc) {
  const charMap = {};
  characters.split("").forEach((ele) => {
    if (!charMap[ele.toString()]) {
      charMap[ele] = [1, undefined];
    } else {
      charMap[ele][0]++;
    }
  });

  for (let i = 0; i < doc.length; i++) {
    if (!charMap[doc[i]]) {
      charMap[doc[i]][1] = 1;
    } else {
      charMap[doc[i]][1]++;
    }
  }

  console.log(charMap);

  // const docMap = {};
  // doc.split("").forEach((ele) => {
  //   if (!docMap[ele.toString()]) {
  //     docMap[ele] = 1;
  //   } else {
  //     docMap[ele]++;
  //   }
  // });

  // let canGenerate = true;
  // for (let key in docMap) {
  //   if (!charMap[key] || (charMap[key] < docMap[key])) {
  //     canGenerate = false;
  //   }
  // }
  // return canGenerate;
}

console.log(generateDocument("aaaabbc ", "aabccz"));

console.log(
  generateDocument(
    "&*&you^a%^&8766 _=-09     docanCMakemthisdocument",
    "Can you make this document &"
  )
);
