const express = require("express")
const ejs = require('ejs');
const server = express()
const session = require('express-session');
const flash = require('simple-flash');
const { time, pathLoger } = require("./helpers/timeLogger");
const path = require('path');
const loginRoutes = require("./routes/loginRoutes")
const fileUpload = require("express-fileupload")
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/usersRoutes");
const authenticateUser = require("./middleware/authenticate");
const authenticateAdmin = require("./middleware/authenticateAdmin");
const Renters = require("./Models/renters");
const Fixed_assets = require("./Models/fixedAssets");
const autoReminder = require("./mail/autoReminder");
const schedule = require("node-schedule");
const notifyEmail = require("./mail/notifyMessageToRenter");
const cron = require("node-cron");
// const obj = require("../specs/server.specs.js")

const port = process.env.PORT || 4200 ;
// look up folders and path
server.use(express.static(path.join(__dirname, "public")));
server.use(express.static(path.join(__dirname,'uploads')));
server.use(express.urlencoded({ extended: true }));
server.use(express.json())

//extended javascript link
server.set("view engine", "ejs");
server.set("views", "pages");

// server.use(obj)
// session handler
server.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
);
// cron.schedule(`* * * * * *`,()=>{
// console.log("out");
// })
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

// file-upload
server.use(fileUpload())

// routes
server.use(loginRoutes)
server.use("/user", authenticateUser, userRoutes)
server.use ("/admin", authenticateAdmin, adminRoutes)

// automatic mail send

// async function BeforeToday(due_time,vrentime) {
//   var renters= await Renters.fetchTime()
//   const renter= renters.map(q=>q.due_time)  
//   let dueTime = new Date(renter.due_time).getTime()-(1000*60*60)
//   let rentDay = new Date(renter.rent_time)
//   let date = (new Date(Number(new Date(renter.due_time)))).getTime()
//   // console.log(date);
//    var newDate = date-86400000
//   let dayOFweek = new Date(newDate).getDay()
//   let month = new Date(newDate).getMonth() + 1;
//   let dayOfMonth = new Date(newDate).getDate()
//   let hour = new Date(newDate).getHours()
//   let minute = new Date(newDate).getMinutes()
//   let seconds = new Date(newDate).getSeconds()
//   let year = new Date(newDate).getFullYear()
//   let ExpectedDay = (rentDay.getTime()-dueTime.getTime())
//   return ExpectedDay;
// }









// server.use(express.json());


// helpers
// let logger = [time, pathLoger]

// server.use(logger)
// middleware handle

// running handle
server.listen(port, (err)=>{
  try {
  console.log(`server is running on port http://localhost:${port}`);
    
  } catch (err) {
    console.log(err)
  }
});
(async()=>{
  var renters= await Renters.fetchRenterAssetID()
  const due_dates= renters.map(q=>q.due_time)
    const first_names= renters.map(q=>q.first_name)  
    const surnames= renters.map(q=>q.surname)  
    const emails= renters.map(q=>q.email)  
    const asset_names= renters.map(q=>q.fs_name)  
    
    for (let i = 0; i < due_dates.length; i++) {
      const due_date = due_dates[i];
      const fullname = surnames[i] + " " + first_names[i];
      const email = emails[i];
      const asset_name = asset_names[i];
      // console.log(due_date,fullname,email, asset_name);
      
    var scheduleDate = new Date(due_date)
      scheduleDate.setDate(scheduleDate.getDate()-1)
      // console.log(due_date, scheduleDate.getMonth()+1);

      cron.schedule(`${scheduleDate.getMinutes()} ${scheduleDate.getHours()} ${scheduleDate.getDate()} ${scheduleDate.getMonth()+1} ${scheduleDate.getDay()}`,()=>{
       autoReminder(email, fullname, asset_name,due_date)
      })
    }
    
})()
server.get('/me', async(req, res) => {
  await res.send('Hello, World!');
});