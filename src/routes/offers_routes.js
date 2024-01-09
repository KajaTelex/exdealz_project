const express = require("express");
const router = express.Router();

const offersController = require("../controllers/offers_controllers");

router.post("/createOfferApi", offersController.offersCreate);

router.get("/getAllVendorsOffersAPi",offersController.getAllVendorsOffers);

router.get("/getvendorOffersApi/:vendorCatagoryId",offersController.getvendorOffersByVendorCatagoryId);

router.put("/updateofferApi/:id",offersController.updateOffers);

router.delete("/deleteOffersApi/:id",offersController.deleteOffersApi);









module.exports = router;