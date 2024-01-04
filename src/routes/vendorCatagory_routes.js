const express = require("express");
const router = express.Router();


const vendorCatagoryController = require("../controllers/vendorCatagory_controller");

router.post("/createVendorCatagoryApi", vendorCatagoryController.createVendorCatagoryApi);

router.get("/getAllvendorsCatagoriesApi", vendorCatagoryController.getAllvendorsCatagories);

router.get("/getByIdvendorCatagoriesApi/:vendorId", vendorCatagoryController.getByIdvendorCatagories);

router.put("/updateByIdvendorCatagoriesApi/:vendorId", vendorCatagoryController.updateByIdvendorCatagories);

router.delete("/deleteByIdvendorCatagoriesApi/:id",vendorCatagoryController.deleteByIdvendorCatagories);



module.exports = router; 