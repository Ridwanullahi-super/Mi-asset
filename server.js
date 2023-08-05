const express = require("express")
const server = express()
const port = process.env.PORT||4200;
const ejs = require('ejs');
const path = require('path');
const usersRoutes = require("./routes/usersRoutes")
const loginRoutes = require("./routes/loginRoutes")
const session = require('express-session');
const { time, pathLoger } = require("./helpers/timeLogger");
const authenticateUser = require("./middleware/authenticate");
const flash = require('simple-flash')

// session handler
server.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
);

// flash engine
server.use(flash({ locals: "flash" }));

// validator engine
server.use(function (req, res, next) {
  res.locals.formBody = req.session.formBody;
  res.locals.formErrors = req.session.formErrors;
  delete req.session.formBody;
  delete req.session.formErrors;
  next();
});



// server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// look up folders
server.use(express.json())
server.use(express.static(path.join(__dirname, "public")));


//extended javascript link
server.set("view engine", "ejs");
server.set("views", "pages");

// helpers
// let logger = [time, pathLoger]
// server.use(logger)

server.use(loginRoutes)
// middleware handle
server.use(authenticateUser, usersRoutes)
// login route handlers

// get route





// running handle
server.listen(port, (err)=>{
  try {
  console.log(`server is running on port http://localhost:${port}`);
    
  } catch (err) {
    console.log(err)
  }
});