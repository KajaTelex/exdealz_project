const express = require("express");
const router = express.Router();

const forgetPasswordController = require("../controllers/forgetPassword_controller");

router.post("/createotp_ForgetPasswordApi", forgetPasswordController.createotp_ForgetPassword);

router.post("/confirmOTPAndResetPasswordApi", forgetPasswordController.confirmOTPAndResetPassword);




module.exports = router;
