const conn = require('./connections');

const express = require('express');
const router = express.Router();
const path = require('path');

//console.log(__dirname );
router.get("/register", (req,res) => {
  res.sendFile(path.join(__dirname, "public/views/home.html"));
});

router.get("/login", (req,res) => {
  res.sendFile(path.join(__dirname, "public/views/login.html"));
});

module.exports = router;