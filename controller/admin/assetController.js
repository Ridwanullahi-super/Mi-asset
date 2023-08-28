const { name } = require("ejs");
const Admin = require("../../Models/admin");
const Fixed_assets = require("../../Models/fixedAssets");

const addAssets = async(req, res)=>{
    let id = req?.session?.admin?.id;
    let Assets = await Fixed_assets.adminID(id)
    let admin_id = req?.session?.Fixed_assets?.admin_id
    
    res.render('admin/add-asset.ejs',{admin_id,Assets});
}

const sendAssets = async (req, res)=>{
    let admin = req?.session?.admin?.id
    try {
        let asset = new Fixed_assets(req.body)
        asset.admin_id = admin
        await asset.save()
        req.flash("success","you successfully added one assets")
        res.redirect('/admin/assets')
    } catch (error) {
        console.log(error.status);
        req.flash("danger","Failed! to add new asset")
        req.redirect("back")
    }
}

 const getAsset = (async(req, res)=>{
    let id = req?.session?.admin?.id;
    let Assets = await Fixed_assets.adminID(id)
    let admin_id = req?.session?.Fixed_assets?.admin_id
        res.render("admin/fixed_assets",{Assets, admin_id})
 })

const deleteAsset = (async(req, res)=>{
    try {
        let asset = await Fixed_assets.findId(req?.params?.id)
        await asset.delete();
        req.flash("success", "Asset deleted successfully!")
        res.redirect("back")
        
    } catch (error) {
        console.log(error,);
        req.flash("danger","unable to delete Asset")
        res.redirect("back")
    }
})

const updateAsset = (async (req, res)=>{
    try {
        let id = req?.params?.id
        let asset = await Fixed_assets.findId(id)
        // console.log(asset);
        console.log();
        asset.setObjProp(req.body)
        await asset.update()
        req.flash("success", "Asset updated successfully")
        res.redirect("/admin/assets")
    } catch (error) {
        req.flash("danger", "unable to update Asset")
        res.redirect("/admin/assets")
     throw error
    }
})
const getHome = ((req, res)=>{
    console.log("session",req.session.admin);
    res.render('admin/index.ejs')
})


module.exports ={addAssets, getHome, getAsset, sendAssets,deleteAsset, updateAsset}