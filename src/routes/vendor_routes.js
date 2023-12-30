 const express = require("express");
const router = express.Router();

const vendorController = require("../../src/controllers/vendor_controller");

router.post("/createRegistrationApi",vendorController.registartionVendorApi);

router.put("/updateRegistartionApi/:mobile_number", vendorController.updateVendorApi);

router.delete("/deteteByNameVendorApi/:owner_name", vendorController.deteteByNameVendorApi);


module.exports = router;  