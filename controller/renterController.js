const Fixed_assets = require("../Models/fixedAssets");
const Renters = require("../Models/renters")

const addRenters = (async(req, res)=>{
    let id = req?.session?.user?.id
    let  Assets= await Fixed_assets.assetId(id)
    res.render("add-renter",{Assets})
}
)

const sendRenter = async (req, res)=>{
    try {
       const user = req?.session?.user?.id
       const renter = new Renters(req.body)
       renter.user_id = user
       await renter.save();
       req.flash("success", "you successfully add one renter")
       res.redirect("back")
   } catch (error) {
     req.flash("danger", "failed! to add renter")
    console.log(error.status);

   } 

} 

const getRenters = (async(req, res)=>{
    let id = req?.session?.user?.id
    let  renters= await Renters.userID(id)
    // let  Assets= await Fixed_assets.assetId(id)
    for(let renter of  renters){
        renter.asset = await Fixed_assets.findId(renter.fixed_asset_id) 
        console.log(renter.asset); 
    }
    
    res.render("renter",{renters,})
});

const saveRenter = async (req, res)=>{
    let renter = new Renters(req.body);
    await renter.save()
    res.redirect("back")
    // console.log(renter);
}
const deleteRenter = async(req, res)=>{
 
    try {
        // let id = req?.query?.params?.id
        // await Renters.delete(id);
        // res.render("renter",{id})
        let renter = await Renters.findId(req?.params?.id)
        await renter.delete();
        // res.render("renter",{id})
        // res.redirect("back")
        // req.flash("success", "Renter is deleted successfully!")
        res.redirect("back")
        req.flash("success", "Renter is deleted successfully!")
        
    } catch (error) {
        console.log(error,"error");
        res.redirect("back")
        req.flash("danger","unable to delete Renter")
    }
}
const updateRenter = async(req, res)=>{
    let renter = await Renters.findId(renter.id)
    try {
        let id = req.query.params.id
        await renter.update(id)
        res.redirect("back")
        req.flash("success", "Renter is updated successfully")
    } catch (error) {
        console.log(error.status);
        req.flash("danger", "unable to update renter")
    }
}
module.exports = {addRenters, getRenters, saveRenter,sendRenter,deleteRenter,updateRenter}