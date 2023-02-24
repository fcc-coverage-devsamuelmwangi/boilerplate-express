const express = require('express');
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();

app.use((req,res,next)=>{
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

app.use(bodyParser.urlencoded({extended: false}))

app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res)=>{
    const absolute_path = __dirname + "/views/index.html";
    res.sendFile(absolute_path)
})


app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({"message": 'Hello json'.toUpperCase()});
      } else {
        res.json({"message": 'Hello json'});
      }
});

app.get("/now", (req, res, next)=>{
  req.time = new Date().toString()
  next()
 }, (req, res)=>{
    res.json({time: req.time})
 })

 app.get("/:word/echo", (req, res)=>{
  const word = req.params.word;
  res.json({echo: word})
  console.log(word)
})

app.get("/name", (req,res)=>{
  const first = req.query.first;
  const last = req.query.last;
  res.json({ name: `${first} ${last}`})
})

app.post("/name", (req, res)=>{
  const first = req.body.first;
  const last = req.body.last;
  res.json({ name: `${first} ${last}`})
})































module.exports = app;
