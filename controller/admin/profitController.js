const Fixed_assets = require("../../Models/fixedAssets");

const getProfit = (async(req, res)=>{
    let id = req?.session?.admin?.id;
    let Assets = await Fixed_assets.adminID(id)
let admin_id = req?.session?.Fixed_assets?.user_id
    res.render("admin/profit",{Assets,admin_id})
})
module.exports = {getProfit}