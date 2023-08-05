const User = require("../Models/user")
const bcrypt = require("bcrypt")
// let has = "$2b$10$YPcD3bPQwbJlCTEZV98iDOzEEfZ0ES5RPfNVnR/dQ3eepC9szIuGK"
// let otherp = "12345"

 const  login = (req, res)=>{
    res.render('login')
 }
//  post access
 const getLogin =  async (req, res)=>{
   try {
      let {email, password} = req.body;
      let user = await User.login(email, password)
      // let pass = await bcrypt.compare(otherp,has)
      // console.log(pass);
      if(user){
         req.session.user = user;
         console.log(req.path);
         req.flash("success","welcome " + user.name())
         res.redirect(req?.session?.intent || '/home');
      }else{
         req.flash("danger", "invalid Email or Password")
         res.redirect("back")
      }
   } catch (error) {
      console.log(error)
   }
 } 
//  end post login

 const creatAccount = (req, res)=>{
    res.render('create_account')
 } 
 const newUser = async (req, res)=>{
    try {
        let user = new User(req.body)
        await user.save()
        console.log(user);
        res.redirect("/")
    } catch (error) {
        console.log(error.status);
        res.render("error")
    }
 }
 module.exports = {login, creatAccount, newUser, getLogin }