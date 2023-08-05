const {Router} = require('express')
const { addAssets, getProfile, getAsset, getHome, sendAssets } = require('../controller/assetController');
const { addRenters, getRenters, saveRenter, sendRenter, deleteRenter, updateRenter } = require('../controller/renterController');
const { getDepreciate } = require('../controller/depreciationController');
const { getProfit } = require('../controller/profitController');
const { getRemind } = require('../controller/remiderController');
const renterValidator = require('../validators/renterValidator');
const assetValidator = require('../validators/assetValidator');
const user = Router ();
// console.log(Router);




user.get("/add-asset", addAssets)
user.post("/add-asset", assetValidator, sendAssets)

user.get("/add-renter", addRenters)
user.post("/add-renter", sendRenter)
user.get("/renters", getRenters)
user.get("/renter/delete/:id", deleteRenter)
user.post("/renter/update/:id", updateRenter)

user.get("/assets", getAsset)

user.get('/home', getHome )
    
user.get('/profile', getProfile)

user.get("/depreciate", getDepreciate)

user.get("/profit", getProfit)

user.get("/reminder", getRemind)

// export part
module.exports = user;