const {Router} = require('express')
const loginValidator = require("../validators/loginValidator")
const { login, getLogin, SendresetPassword, getpassword, getConfirmPassword, updateConfirmPassword } = require('../controller/admin/userController');
const { Userlogin, userGetLogin, creatAccountUser, newUser} = require('../controller/user/userController');
const Admin = require('../Models/admin');

const log = Router()

// user login routes 
log.get("/user",Userlogin)
log.post("/user", userGetLogin)

log.get("/", async(req, res)=>{
 res.render("index.ejs")
})
// create account handleler
log.get('/create-account', creatAccountUser)
log.post('/create-account', newUser)
// forget password
log.get("/admin/forget-password", getpassword)
log.post("/admin/forget-password", SendresetPassword)
// reset password
log.get("/admin/reset-password/:id",getConfirmPassword)
log.post("/admin/reset-password/:id", updateConfirmPassword)


// end of user


log.get("/admin",login)
log.post("/admin", getLogin)

module.exports = log;
