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
const cron = require("node-cron")
const port = 4200|| process.env.PORT;
// look up folders and path
server.use(express.static(path.join(__dirname, "public")));
server.use(express.static(path.join(__dirname,'uploads')));
server.use(express.urlencoded({ extended: true }));
server.use(express.json())

//extended javascript link
server.set("view engine", "ejs");
server.set("views", "pages");


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

async function BeforeToday(due_time,vrentime) {
  var renters= await Renters.fetchTime()
  const renter= renters.map(q=>q.due_time)  
  let dueTime = new Date(renter.due_time).getTime()-(1000*60*60)
  let rentDay = new Date(renter.rent_time)
  let date = (new Date(Number(new Date(renter.due_time)))).getTime()
  // console.log(date);
   var newDate = date-86400000
  let dayOFweek = new Date(newDate).getDay()
  let month = new Date(newDate).getMonth() + 1;
  let dayOfMonth = new Date(newDate).getDate()
  let hour = new Date(newDate).getHours()
  let minute = new Date(newDate).getMinutes()
  let seconds = new Date(newDate).getSeconds()
  let year = new Date(newDate).getFullYear()
  let ExpectedDay = (rentDay.getTime()-dueTime.getTime())
  return ExpectedDay;
}

(async(req, res)=>{
  // let id = req?.session?.user?.id 
  var renters= await Renters.fetchTime()
  for(let i = 0; i<renters.length; i++){
    const renter= renters.map(q=>q.due_time)  
    
    const Dates = new Date()
    // const sendDate = await Dates(BeforeToday.year, BeforeToday.month, BeforeToday.dayOfMonth, 12, 0, 0);
    // const job = await schedule.scheduleJob(sendDate, notifyEmail(renter.email, renter.fullname, renter.asset, renter.due_time))
    
    const DueTime = renters.map(q=>q.due_time)
    console.log(DueTime);
  }
  console.log(renters);
})()

// console.log(renter);
// renter.asset = await Fixed_assets.findId(renter.id) 

// let reminder = async (req, res)=>{
//   let id = req?.session?.user?.id 
//   var renters= await Renters.fetchTime()
  
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