const Fixed_assets = require("../Models/fixedAssets");
const User = require("../Models/user");

const addAssets = (req, res)=>{
    res.render('add-asset.ejs');
}

const sendAssets = async (req, res)=>{
    
    let user = req?.session?.user?.id
    try {
        let asset = new Fixed_assets(req.body)
        asset.user_id = user
        await asset.save()
        req.flash("success","you successfully added one assets")
        res.redirect('back')
    } catch (error) {
        console.log(error.status);
        req.flash("danger","Failed! to add new asset")
        req.redirect("back")
    }
}

 const getAsset = (async(req, res)=>{
    let id = req?.session?.user?.id;
    let Assets = await Fixed_assets.userID(id)
    let user_id = req?.session?.Fixed_assets?.user_id
        res.render("fixed_assets",{Assets, user_id})
 })

const getHome = ((req, res)=>{
    console.log("session",req.session.user);
    res.render('index.ejs')
})

const getProfile =  ((req, res)=>{
    res.render('profile.ejs')

})
module.exports ={addAssets, getHome, getProfile, getAsset, sendAssets}