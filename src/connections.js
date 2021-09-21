const express = require('express');
const router = express.Router();
const sql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const connection = sql.createConnection({
  user: "root",
  password: "Password",
  port: "3306",
  database: "login",
});

try {
  connection.connect();
  console.log(`connected to login database successfully`);
}catch(err) {
  console.log(`failed to connect to login database => ${err}`);
}

router.post("/register", async (req, res) => {
  //try to do something with body-parser or express's build in version express.json

  const salt = await bcrypt.genSalt(10);

  const hashedpw = await bcrypt.hash(req.body.password, salt);

  const token = jwt.sign({username: "ryan truong"}, "secretKey");
  
  const queryString = `INSERT INTO logininfo VALUES ("${req.body.username}", "${hashedpw}")`;
    connection.query(queryString, (err, row, fields) => {
      if(err && err.sqlMessage === `Duplicate entry '${req.body.username}' for key 'logininfo.PRIMARY'`) {
        console.log(`username is taken, choose another username`);
        res.redirect("/register");
      }else if(req.body.password !== req.body.passwordConfirmation) {
        console.log(`password and passwordConfirmation did not match`); //this still sends to DB even though they do not match
        this.connection.err
        res.redirect("/register");
      }
      else{
        console.log(`sign up successful`);
        //console.log(__dirname);
        res.redirect("/login");
        //res.send(`signup info successfully saved`);
      }
    })   
});

router.post("/login", (req,res) => {
  const queryString = `SELECT * FROM logininfo WHERE logininfo.username="${req.body.loginuser}"`;
  
  try {
    connection.query(queryString, (err, row, fields) => {
      if(err || !row[0]) {
        res.json("username not found");
      }
      else {
        const hash =  row[0].password;

        if(bcrypt.compare(req.body.loginpassword, hash)) {
          res.json(`passwords match, logging in`);
          //res.json(row);
        }else {
          console.log(`req.body.password: ${req.body.loginpassword} || hash: ${hash}`)
          res.json(`incorrect password, try again`);
        }
      }
    });    
  }catch(error) {
    console.log(`req.body.password: ${req.body.loginpassword} || hash: ${hash}`)
    res.send(`some error`);
  }
  
}); 


module.exports = router;