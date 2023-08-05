// const User = require("../../Models/user")

// const getProfile =  (async(req, res)=>{
//     let id = req?.session?.user?.id
//     let user = await User.findId(id)
//     res.render('user/profile.ejs',{user})

// })

// const updateProfile = (async(req, res)=>{
//      try {
//         let id = req?.params?.id
//         let user = await User.findId(id)
//         // console.log(user);
//        user.setObjProp(req.body); 
//         await user.update()
//         req.flash("success", "user updated successfully")
//         res.redirect("back")
//     } catch (error) {
//         req.flash("danger", "unable to update user")
//         res.redirect("back")
//      throw error
//     }

// }) 
// const changePass = async(req, res)=>{
// let id = req?.session?.user?.id
// let user = await User.findId(id)
// // let {current_password, password} = req.body;/
// let  current_password = req.body.current_password;
//    let correct = await User.checkPass(id, current_password)
//    console.log(correct);

//    if(correct){
//   let user =  user.setObjProp(req.body) 
// console.log(user);
     
//       await user.update()
//        req.flash("success", "password successfully change!")
//        res.redirect("back")
//    }else{
//     req.flash("danger", "password entered is not correct")
//     res.redirect("back")
//    }

// }


// module.exports = {getProfile, updateProfile,changePass};