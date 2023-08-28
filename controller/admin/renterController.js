const Fixed_assets = require("../../Models/fixedAssets")
const Renters = require("../../Models/renters")
const User = require("../../Models/user")
const AddRenterNotification = require("../../mail/AddRenter")

const addRenters = (async (req, res) => {
    let id = req?.session?.admin?.id
    let Assets = await Fixed_assets.assetId(id)

    res.render("admin/add-renter", { Assets })
}
)

const sendRenter = async (req, res) => {
    try {
        // const admin = req?.session?.admin?.id
        // const renter = new Renters(req.body)

        // renter.admin_id = admin
        // const user  =
        // await renter.save();
        let { due_time, rent_time, fixed_asset_id, ...otherFieldsUser } = req.body;
        const user = new User(otherFieldsUser);
        let { first_name, surname, address, other_name, email, phone_number, ...otherFieldsRenter } = req.body;
        const renter = new Renters(otherFieldsRenter);
        const saveUser = await user.save();
        // funtion to send email to user
        AddRenterNotification(req.body.email, req.body.surname + " " + req.body.first_name, req.body.fixed_asset_id)  //not working
        renter.user_id = saveUser;
        renter.admin_id = req?.session?.admin?.id;
        const start = new Date(req.body.rent_time);
        const end = new Date(req.body.due_time);
        const yearDiff = end.getFullYear() - start.getFullYear();
        const monthDiff = end.getMonth() - start.getMonth();
        const totalMonths = yearDiff * 12 + monthDiff;
        renter.month = totalMonths;
        renter.rent_time = new Date(req.body.rent_time + ' 00:00:00');
        renter.due_time = new Date(req.body.due_time + ' 00:00:00');
        const saveRenter = await renter.save();

        req.flash("success", "you successfully add one renter"+ "\n" +"An email has been sent to the renter")
        res.redirect("/admin/renters")
    } catch (error) {
        res.redirect("back")
        req.flash("danger", "failed! to add renter")
        console.log(error.status);

    }

}

const getRenters = (async (req, res) => {
    let id = req?.session?.admin?.id
    let renters = await Renters.adminID(id)
    // let  Assets= await Fixed_assets.assetId(id)
    for (let renter of renters) {
        renter.asset = await Fixed_assets.findId(renter.fixed_asset_id)
        renter.user = await User.findId(renter.user_id)
    }
    let assets = await Fixed_assets.assetId(id)
    res.render("admin/renter", { renters, assets })
});



const saveRenter = async (req, res) => {
    let renter = new Renters(req.body);
    await renter.save()
    res.redirect("back")
    // console.log(renter);
}
const deleteRenter = async (req, res) => {
    try {
        let renter = await Renters.findId(req?.params?.id)
        await renter.delete();
        req.flash("success", "Renter deleted successfully!")
        res.redirect("back")

    } catch (error) {
        console.log(error,);
        req.flash("danger", "unable to delete Renter")
        res.redirect("back")
    }
}
const updateRenter = async (req, res) => {
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
module.exports = { addRenters, getRenters, saveRenter, sendRenter, deleteRenter, updateRenter }