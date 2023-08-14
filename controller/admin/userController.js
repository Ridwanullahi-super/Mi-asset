const bcrypt = require("bcrypt")
const Admin = require("../../Models/admin")
let has = "$2b$10$CPGHFFC4pSB2C6lprtxKhem9Wl0.4nu3ra2s7I55VBcDzwgXv2FfC"
let otherp = "00000"

 const  login = (req, res)=>{
    res.render('admin/login')
 }
//  post access
 const getLogin =  async (req, res)=>{
   try {
      let {email, password} = req.body;
      let admin = await Admin.login(email, password)
      let pass = await bcrypt.compare(otherp,has)
      console.log(pass);
      if(admin){
         req.session.admin = admin;
         // console.log(req.path, req.url);
         req.flash("success","welcome " + admin.name())
         res.redirect(req?.session?.intent || '/admin/home');
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
    res.render('admin/create_account')
 } 
 const newadmin = async (req, res)=>{
    try {
        let admin = new Admin(req.body)
        await admin.save()
      //   console.log(admin);
      req.flash("success","you have sucessfully add one Admin")
        res.redirect("back")
      //   notifyAdmin(a)
    } catch (error) {
        console.log(error.status);
        req.flash("error","unable to add Admin")
        res.ridirect("back")
    }
 }
 module.exports = {login, creatAccount, newadmin, getLogin }