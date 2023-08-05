const authenticateUser = (req, res, next)=>{
    if(req.session.user){
       return next()
    }else{
        req.session.intent = req.path
        req.flash("Info", "email or password is wronged")
        res.redirect('/')
        // console.log('error');        
        
    }
}
module.exports = authenticateUser;
