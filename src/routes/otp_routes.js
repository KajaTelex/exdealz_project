const express = require("express");
const router = express.Router();

const otpControllers = require("../../src/controllers/otpControllers");

router.post("/generateOtp", otpControllers.otpSendApiController);

router.post("/verifyOtp", otpControllers.otpVerifyApiController);


module.exports = router;
