"use strict";

const signupbtn = document.querySelector("#signupbtn");

signupbtn.addEventListener("click", () => {
  console.log(`submit button hit`);
}); 

const loginfromsignup = document.querySelector("#loginfromsignup");

loginfromsignup.addEventListener("click", () => {
  console.log("redirecting to login page");
  document.location = "/login";
});
