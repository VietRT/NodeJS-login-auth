const express = require("express");
const app = express();

const routes = require("./routes");
const conn = require("./connections");

const route = [
  routes, 
  conn
];



const middleware = [
  express.json(), 
  express.urlencoded({extended: true})
];

app.use(middleware);
app.use("/", route);
app.use("/public", express.static("./public/"));


app.listen(4000, () => {
  console.log(`now listening on port 4000`);
})