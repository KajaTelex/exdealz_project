const express = require("express");
const router = express.Router();

const vendorControllers = require("../../src/controllers/vendorControllers");

router.post("/registration",vendorControllers.registrationController);
router.delete("/deleteVendor/:vendorMobileNumber",vendorControllers.deleteVendorController);
router.post("/updateVendor/:vendorMobileNumber",vendorControllers.updateVendorController);
router.post("/vendorLogin",vendorControllers.loginApiController);


module.exports = router;