const express = require("express");
const router = express.Router();

const otpControllers = require("../../src/controllers/otpControllers");

router.post("/create_otp_send_api", otpControllers.otpSendApiController);

router.post("/verify_otp_api", otpControllers.otpVerifyApiController);


module.exports = router;
