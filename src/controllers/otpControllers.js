const database = require("../../config/database_config");
const { successResponse, failureResponse } = require("../utilities/utilities");

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
            res.status(201).json(successResponse("success","Otp Send Successfully",createOtp))
            
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
            res.status(200).json(successResponse("success","Otp Send Successfully",data))
        }
    }
    else{
        res.status(200).json(failureResponse("failure","Please provide your Mobile Number"))
    }
   }catch(error){
    res.status(500).json(failureResponse("failure","Something went wrong"))
   }
} 

const otpVerifyApiController = async(req,res) => {
    try{
        const {mobileNumber,verifyOtp} = req?.body;
        if(!mobileNumber){
            res.status(400).json(failureResponse);
        }else if(!verifyOtp){
            res.status(400).json(failureResponse)
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
            res.status(200).json(successResponse);
        }
    } catch(error) {
        res.status(400).json(failureResponse)
    }
}

module.exports = {otpSendApiController, otpVerifyApiController};