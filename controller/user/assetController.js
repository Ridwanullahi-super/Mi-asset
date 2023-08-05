const { name } = require("ejs");
const Admin = require("../../Models/user");
const Fixed_assets = require("../../Models/fixedAssets");


// const addAssets = async(req, res)=>{
//     // let id = req?.session?.user?.id;
//     // let Assets = await Fixed_assets.adminID(id)

//     let admin_id = req?.session?.Fixed_assets?.admin_id
    
//     res.render('user/add-asset.ejs',{admin_id,Assets});
// }

// const sendAssets = async (req, res)=>{
//     let user = req?.session?.user?.id
//     try {
//         let asset = new Fixed_assets(req.body)
//         asset.admin_id = user
//         await asset.save()
//         req.flash("success","you successfully added one assets")
//         res.redirect('/user/assets')
//     } catch (error) {
//         console.log(error.status);
//         req.flash("danger","Failed! to add new asset")
//         req.redirect("back")
//     }
// }

 const getAsset = (async(req, res)=>{
    
        res.render("user/available_assets")
 })
 const RentAsset = async(req, res)=>{
    res.render("user/rent_asset")
 }
const rentdetails = async(req, res)=>{
    res.render("user/rent-detail")
}
const DueDate = async(req, res)=>{
    res.render("user/due_date")
}
// const deleteAsset = (async(req, res)=>{
//     try {
//         let asset = await Fixed_assets.findId(req?.params?.id)
//         await asset.delete();
//         req.flash("success", "Asset deleted successfully!")
//         res.redirect("back")
        
//     } catch (error) {
//         console.log(error,);
//         req.flash("danger","unable to delete Asset")
//         res.redirect("back")
//     }
// })

// const updateAsset = (async (req, res)=>{
//     try {
//         let id = req?.params?.id
//         let asset = await Fixed_assets.findId(id)
//         // console.log(asset);
//         console.log();
//         asset.setObjProp(req.body)
//         await asset.update()
//         req.flash("success", "Asset updated successfully")
//         res.redirect("/user/assets")
//     } catch (error) {
//         req.flash("danger", "unable to update Asset")
//         res.redirect("/user/assets")
//      throw error
//     }
// })
const getHome = (async(req, res)=>{
    // console.log("session", req.session.user);
    
    res.render('user/index.ejs')
})


module.exports ={getHome, getAsset,RentAsset,rentdetails, DueDate}