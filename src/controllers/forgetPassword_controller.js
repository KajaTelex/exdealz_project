const database = require("../../config/database_config");
const {failureResponse, successResponse} = require("../utility/utility");


const createotp_ForgetPassword = async(req, res) => {
    try {
        const { mobile_number } = req.body;

    if(!mobile_number) {
        res.status(401).json(failureResponse("failure","Please provide your Mobile Number"));
         }

        else  {
             function generateOtp() {
            const otp_length = 6;
            let otp = "";
            for(let i=0; i<otp_length; i++) {
                otp += Math.floor(Math.random() * 10); // 0 t0 9 digits generate and += add sring digit to next degit
            }
            return otp;
        }
    
        const otp = generateOtp();
        console.log(`six digit otp is ${otp} `);

        // Update the OTP for the existing mobile_number
        await database.models.otp_model.update({otp},{
            where : {
                mobile_number : mobile_number
            }
        });

          // Fetch the updated OTP data from the database
           const data =await database.models.otp_model.findOne({
            where : {
                mobile_number : mobile_number
            }
    
          }) 
          res.status(201).json(successResponse("success","Otp Send Successfully",data));

      }  
    }catch(error) {

        console.log("error-----------------",error)
        res.status(500).json(failureResponse("failure", "something went wrong", error));
    }
}


const confirmOTPAndResetPassword = async (req, res) => {
    try {
        const { mobile_number, otp, password, confirm_password } = req.body;
           console.log(req.body);
        const existingOTP = await database.models.otp_model.findOne({
            where: { mobile_number: mobile_number }
        });
        console.log(existingOTP);

        const vendor = await database.models.vendor_model.findOne({
            where: { mobile_number: mobile_number }
        });

        console.log(existingOTP);


        if (!mobile_number || !otp || !password || !confirm_password) {
            return res.status(400).json(failureResponse("failure", "Please provide all required information"));
        }

        if (!existingOTP || existingOTP.otp !== otp) {
            return res.status(400).json(failureResponse("failure", "Invalid OTP"));
        }

        if (password !== confirm_password) {
            return res.status(400).json(failureResponse("failure", "Passwords do not match"));
        }

        if (!vendor) {
            return res.status(404).json(failureResponse("failure", "Vendor not found"));
        }

        // Assuming your vendor model has a field called 'password' to update
        await database.models.vendor_model.update({ password: password }, { where: { mobile_number: mobile_number } });

        // Clear the OTP after successful password reset
        await database.models.otp_model.update({ otp: null }, { where: { mobile_number: mobile_number } });

        return res.status(200).json(successResponse("success", "Password reset successfully"));
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json(failureResponse("failure", "Something went wrong", error));
    }
}


module.exports = { createotp_ForgetPassword, confirmOTPAndResetPassword};