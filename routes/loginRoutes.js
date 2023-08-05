const {Router} = require('express')
const { login, getLogin } = require('../controller/userController')
const loginValidator = require("../validators/loginValidator")
const {  creatAccount, newUser } = require('../controller/userController');

const log = Router()
log.get("/", login)
log.post("/", getLogin)


// create account handleler
log.get('/create-account', creatAccount)
log.post('/create-account', newUser)
module.exports = log;