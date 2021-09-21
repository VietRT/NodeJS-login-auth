"use strict"

const submit = document.querySelector("#loginbtn");

submit.addEventListener("click", () => { 
  auth();
});

const auth = function () {
  const request = new XMLHttpRequest();
  const url = "/login";  
  request.open("GET", url);
  request.responseType = "json";

  request.onload = function() {
    const res = request.response;
    console.log(`result: ${res}`);
  }; 
  request.send();
};
