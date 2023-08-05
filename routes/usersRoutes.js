const {Router} = require('express')
// const { addAssets, getAsset, getHome, sendAssets, deleteAsset, updateAsset } = require('../controller/assetController');
// const { addRenters, getRenters, saveRenter, sendRenter, deleteRenter, updateRenter } = require('../controller/renterController');
// const { getDepreciate, updateDepreciate } = require('../controller/depreciationController');
// const { getProfit } = require('../controller/profitController');
// const { getRemind, sendEmail } = require('../controller/remiderController');
const renterValidator = require('../validators/renterValidator');
const assetValidator = require('../validators/assetValidator');
const { getHome, getAsset, RentAsset, rentdetails, DueDate } = require('../controller/user/assetController');
// const { getProfile, updateProfile, changePass } = require('../controller/profileController');
const user = Router ();
// console.log(Router);




// user.get("/assets", getAssets)
// user.post("/add-asset", assetValidator, sendAssets)

// user.get("/add-renter", addRenters)
// user.post("/add-renter", sendRenter)
// user.get("/renters", getRenters)
// user.get("/renter/delete/:id", deleteRenter)
// user.post("/renter/update/:id", updateRenter)

user.get("/assets", getAsset)
// user.post("/asset/update/:id", updateAsset)
// user.get("/asset/delete/:id", deleteAsset)

user.get('/home', getHome )
user.get("/rent-asset", RentAsset)
user.get("/rent-details", rentdetails)
user.get("/due-date", DueDate)
    
// user.get('/profile', getProfile)
// user.post('/profile', changePass)
// user.post('/profile/update/:id', updateProfile)

// user.get("/depreciate", getDepreciate)
// user.post("/depreciate/update/:id", updateDepreciate)

// user.get("/profit", getProfit)

// user.get("/reminder", getRemind)
// user.post("/reminder", sendEmail)

// export part
module.exports = user;