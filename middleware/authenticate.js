const authenticateUser = (req, res, next)=>{
    if(req.session.user){
        next()
    }else{
        req.session.intent = req.path
        res.redirect('/')
        // console.log('error');        
        
    }
}
module.exports = authenticateUser;
