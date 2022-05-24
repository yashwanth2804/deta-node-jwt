// install express with `npm install express` 
require("dotenv").config();
const express = require('express')
const app = express()
const Middlewares = require("./Middleware/VerifyToken")
app.use(express.json());

app.get('/public', (req, res) => res.send('this is public'))

app.get("/private", Middlewares.verifyToken, (req, res) => {
    res.json({ a: req.user });
  });
 
app.get("/login", async (req, res) => {
    const user = { id: 1, name: "yash" };
  
    const token = await Middlewares.create_token(user, res);
    res.json({ token });
  });
   
// export 'app'
module.exports = app