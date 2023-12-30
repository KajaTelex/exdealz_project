 const express = require("express");
const router = express.Router();

const vendorController = require("../../src/controllers/vendor_controller");

router.post("/createRegistrationApi",vendorController.registartionVendorApi);

router.put("/updateRegistartionApi/:mobile_number", vendorController.updateVendorApi);

router.delete("/deteteByMobVendorApi/:mobile_number", vendorController.deteteByMobVendorApi);

router.post("/createLogiApi", vendorController.loginVendorApi);


module.exports = router;  