"use strict";

var fetch = require("node-fetch");

main();

//************************************
async function main() {
  var url = "http://google.com";

  try {
    var webResponse = await makeWebRequest(url);
    console.log(webResponse);
  } catch (e) {
    handleError(e);
  }
}

async function makeWebRequest(url) {  
  var config = {
    method: "GET",
    headers: {
      "CONTENT-TYPE": "text/html"
    },
  };

  try {
    var response = await fetch(url, config);
    var text = await response.text()
    
    return text;
  } catch (e) {
    handleError(e);
  }
}

//*********************************
function handleError(error) {
  console.error("There has been an error");
  console.error("");
  console.error(error);
}
