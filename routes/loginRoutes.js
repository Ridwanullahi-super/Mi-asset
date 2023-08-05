const {Router} = require('express')
const loginValidator = require("../validators/loginValidator")
const { login, getLogin } = require('../controller/admin/userController');
const { Userlogin, userGetLogin, creatAccountUser, newUser } = require('../controller/user/userController');

const log = Router()

// user login routes 
log.get("/user",Userlogin)
log.post("/user", userGetLogin)


// create account handleler
log.get('/create-account', creatAccountUser)
log.post('/create-account', newUser)


// end of user


log.get("/admin",login)
log.post("/admin", getLogin)

module.exports = log;
