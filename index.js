const express = require("express");
const app = express();
const passport = require("passport");
const expressSession = require("express-session");
const db = require("./models");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("./config/passport");
require("dotenv").config();

app.use(cors());
app.use(expressSession({ resave: false, saveUninitialized: true, secret: "bebas mau di isi apa"}))
app.use(passport.initialize());
app.use(passport.session());


app.get("/api/v1/auth/google", passport.authenticate("google", {
  scope: ["email", "profile"],
  successRedirect: "/api/v1/auth/protected",
  failureRedirect: "/api/v1/auth/fail",
}))


app.get("/api/v1/auth/protected", async (req, res) => {
  console.log(req.user)
  const dataUser = await db.users.findOrCreate({
    where: {
      name: req.user.displayName,
      email: req.user.email,
      photo: req.user.picture,
      password:"kosong",
    }
  })
  const token = jwt.sign({ name: req.user.displayName, email: req.user.email, photo: req.user.picture}, "kety")
  res.redirect(`http://localhost:3000/${token}`)
})

app.get("/api/v1/users", async (req, res) => {
  if(!req.headers.authorization){
    return res.json({ message: "auth failed!"})
  }

  const token = req.headers.authorization.split(" ")[1]
  const credentials = jwt.verify(token, "kety");

  //console.log(credentials);

  if(credentials){
        const dataUserFromDB = await db.users.findOne({
          where: {
            email: credentials.email
          }
        })
        return res.json({ message: "Get Data Profile", data: dataUserFromDB})
  }
})

app.listen(8000, () => {
  console.log("server running on port 8000")
})