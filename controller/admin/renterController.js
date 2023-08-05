const Fixed_assets = require("../../Models/fixedAssets")
const Renters = require("../../Models/renters")

const addRenters = (async(req, res)=>{
    let id = req?.session?.admin?.id
    let  Assets= await Fixed_assets.assetId(id)
    
    res.render("admin/add-renter",{Assets})
}
)

const sendRenter = async (req, res)=>{
    try {
       const admin = req?.session?.admin?.id
       const renter = new Renters(req.body)
       renter.admin_id = admin
       await renter.save();
       req.flash("success", "you successfully add one renter")
       res.redirect("/admin/renters")
   } catch (error) {
    res.redirect("back")
     req.flash("danger", "failed! to add renter")
    console.log(error.status);

   } 

} 

const getRenters = (async(req, res)=>{
    let id = req?.session?.admin?.id
    let  renters= await Renters.adminID(id)
    // let  Assets= await Fixed_assets.assetId(id)
    for(let renter of  renters){
        renter.asset = await Fixed_assets.findId(renter.fixed_asset_id) 
    }
    let assets = await Fixed_assets.assetId(id)
    res.render("admin/renter",{renters,assets})
});



const saveRenter = async (req, res)=>{
    let renter = new Renters(req.body);
    await renter.save()
    res.redirect("back")
    // console.log(renter);
}
const deleteRenter = async(req, res)=>{
    try {
        let renter = await Renters.findId(req?.params?.id)
        await renter.delete();
        req.flash("success", "Renter deleted successfully!")
        res.redirect("back")
        
    } catch (error) {
        console.log(error,);
        req.flash("danger","unable to delete Renter")
        res.redirect("back")
    }
}
const updateRenter = async(req, res)=>{
    try {
        let id = req?.params?.id
        let renter = await Renters.findId(id)
        console.log(req.body);
        renter.setObjProp(req.body)
        await renter.update()
        req.flash("success", "Renter updated successfully")
        res.redirect("back")
    } catch (error) {
        req.flash("danger", "unable to update renter")
        console.log(error.status);
        res.redirect("back")
    }
}
module.exports = {addRenters, getRenters, saveRenter,sendRenter,deleteRenter,updateRenter}