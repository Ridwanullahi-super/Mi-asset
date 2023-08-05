const Admin = require("../../Models/admin")

const getProfile =  (async(req, res)=>{
    let id = req?.session?.admin?.id
    let admin = await Admin.findId(id)
    res.render('admin/profile.ejs',{admin})

})

const updateProfile = (async(req, res)=>{
    //  try {
    //     let id = req?.params?.id
    //     let admin = await Admin.findId(id)
    //     // console.log(admin);
    //    admin.setObjProp(req.body); 
    //     await admin.update()
    //     req.flash("success", "admin updated successfully")
    //     res.redirect("back")
    // } catch (error) {
    //     req.flash("danger", "unable to update admin")
    //     res.redirect("back")
    //  throw error
    // }
         let id = req?.params?.id
        let admin = await Admin.findId(id)
        console.log(req.file);
        const  photo = req.files.photos
        console.log(photo);
        if (photo) {
            if (!photo.mimetype.startsWith('image/')) {
                req.flash('Error', "only image file is allowed");
                req.session.formBody = req.body
                req.session.formErrors = {}
                return res.redirect('back')
            }
            if (photo.size > 5 * 1024 * 1024) {
                req.flash('Error', "File is too large. Maximum of 5mb is allowed");
                req.session.formBody = req.body
                req.session.formErrors = {}
                return res.redirect('back')
            }
            admin.setObjProp(req.body); 
            const fileName = `${(Math.random() * 10).toString(36) + Number(new Date())}.${ photo.mimetype.split('/')[1]}`
            console.log(fileName);
            photo.mv(resolve('uploads/admin/' + fileName), (err) => {
                if (!err) {
                    admin.photos = '/admin/' + fileName
                    console.log(admin);
                    admin.update()
                } else {
                    req.flash('Error', "Unable to upload your file");
                    req.session.formBody = req.body
                    req.session.formErrors = {}
                    return res.redirect('back')
                }
            })
        } else
            await admin.update()
            res.redirect('back');
            
    }
) 
const changePass = async(req, res)=>{
let id = req?.session?.admin?.id
let admin = await Admin.findId(id)
// let {current_password, password} = req.body;/
let  current_password = req.body.current_password;
   let correct = await Admin.checkPass(id, current_password)
   console.log(correct);

   if(correct){
  let admin =  admin.setObjProp(req.body) 
console.log(admin);
     
      await admin.update()
       req.flash("success", "password successfully change!")
       res.redirect("back")
   }else{
    req.flash("danger", "password entered is not correct")
    res.redirect("back")
   }

}


module.exports = {getProfile, updateProfile,changePass};