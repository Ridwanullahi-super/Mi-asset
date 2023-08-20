const bcrypt = require("bcrypt")
const User = require("../../Models/user")
// let has = "$2b$10$CPGHFFC4pSB2C6lprtxKhem9Wl0.4nu3ra2s7I55VBcDzwgXv2FfC"
// let otherp = "00000"

 const  Userlogin = (req, res)=>{
    res.render('user/login')
 }
//  post access
 const userGetLogin =  async (req, res)=>{
   try {
      let {email, password} = req.body;
      let user = await User.login(email, password)
      // let pass = await bcrypt.compare(otherp,has)
      // console.log(pass);
      if(user){
         req.session.user = user;
         console.log(req.path);
         req.flash("success","welcome " + user.name())
         res.redirect(req?.session?.intent || '/user/home');
      }else{
         req.flash("danger", "invalid Email or Password")
         res.redirect("back")
      }
   } catch (error) {
      console.log(error)
   }
 } 
//  end post login

 const creatAccountUser = (req, res)=>{
    res.render('user/create_account')
 } 
 const newUser = async (req, res)=>{
    try {
        let user = new User(req.body)
        await user.save()
        console.log(user);
        res.redirect("/user")
    } catch (error) {
        console.log(error);
      //   res.render("error")
    }
 }
 module.exports = {userGetLogin, creatAccountUser, newUser, Userlogin }