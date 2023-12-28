const database = require("../../config/database_config");

const otpSendApiController = async (req , res) => {
   try { 
    //generating random otp numbers
    let generatedOtp = Math.floor(100000 + Math.random() * 900000);
    let otp = generatedOtp.toString();
    //console.log(typeof(otp));
    const { mobileNumber } = req?.body;
    //console.log(typeof(mobileNumber));
    if(mobileNumber){
        const isDataExists = await database.models.otp_model.findOne({
            where:{
                mobileNumber: mobileNumber
            }
        })
        console.log("=========checking if the mobileNumber already exists========",isDataExists);
        if(isDataExists === null){
            const createOtp = await database.models.otp_model.create({mobileNumber, otp, isVerified: false});
            res.status(201).json({
                status : "success",
                message : "otp send successfully",
                otp_data : createOtp
            })
        }else{
            await database.models.otp_model.update({otp: otp},{
                where:{
                    mobileNumber: mobileNumber
                }
            })
            const data = await database.models.otp_model.findOne({
                where: {
                    mobileNumber: mobileNumber
                }
            })
            res.status(201).json({
                status: "success",
                message: "otp sent successfully",
                create_otp_data: data
            })
        }
    }
    else{
        res.status(400).json({
            status: "failure",
            message: "Please provide a valid Mobile Number"
        })
    }
   }catch(error){
    res.status(401).json({
        status : "failure",
        message : "Otp not send successfully,resend the Otp",
    })
   }
} 

const otpVerifyApiController = async(req,res) => {
    try{
        const {mobileNumber,verifyOtp} = req?.body;
        if(!mobileNumber){
            res.status(400).json({
                status: "failure",
                message: "Please provide a valid Mobile Number",
            });
        }else if(!verifyOtp){
            res.status(400).json({
            status: "failure",
             message: "Please enter a valid Otp", 
            })
        }else{
            await database.models.otp_model
            .update({
                isVerified : true
            },{
               where : {
                  mobileNumber : mobileNumber,
               } 
            })
            const otp_record = await database.models.otp_model
            .findOne({
               where : {
                  mobileNumber : mobileNumber
               } 
            });
            res.status(200).json({
                status: "success",
                message: "OTP verified successfully",
                update_otp_data: otp_record
            });
        }
    } catch(error) {
        res.status(404).json({
            status : "failure",
            message : "Otp verification has failed, Please try again!",
        })
    }
}

module.exports = {otpSendApiController, otpVerifyApiController};