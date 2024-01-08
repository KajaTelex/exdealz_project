const database = require("../../config/database_config");

const { successResponse, failureResponse } = require("../utility/utility");

const otpSendApiController = async (req , res) => {
   try { 
    const { mobile_number } = req.body;

    if(!mobile_number) {
        res.status(401).json(failureResponse("failure","Please provide your Mobile Number"));
        
        
    } else {
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
    
      const isdata_exists =await database.models.otp_model.findOne({
        where : {
            mobile_number : mobile_number
        }

      })

      console.log(" checking data ===============================", isdata_exists);

      if(isdata_exists === null){
        const create_otp = await database.models.otp_model.create({mobile_number, otp});

        res.status(201).json(successResponse("success","Otp Send Successfully",create_otp));

          
      } else {
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


    }
   } catch(error) {
    res.status(401).json({
        status : "failure",
        message : "OTP not send successfully ,resend the OTP",
    })

    res.status(500).json(failureResponse("failure","Something went wrong"))

    console.log("error is ",error);
   }
} 



  const otpVerifyApiController = async (req , res) => {
    try{
        const mobileNumber = req.body.mobile_number;
        const verifyOtp =  req.body.otp;
        
        if (!mobileNumber) {
            res.status(401).json({
                status: "failure",
                message: "Please provide a valid mobile number",
         
            });
           
        } else if( !verifyOtp) {

            res.status(401).json({
            status: "failure",
             message: "Please enter a valid OTP", // null, undefined, NaN, 0, false, and empty string
            })
    
        } else  {
          
                  await database.models.otp_model
            .findOne({
               where : {
                  mobile_number : mobileNumber,
                } 
            });
                 
            const otp_update = await database.models.otp_model
            .update({
                isVerified : true
            },{
               where : {
                  mobile_number : mobileNumber,
               } 
            })
            res.status(201).json(successResponse("success","Otp verified Successfully",otp_update))

        }
         
        
    } catch(error) {
        res.status(404).json({
            status : "failure",
            message : "An error occurred while verifying OTP",
        })
    }
}

module.exports = {otpSendApiController, otpVerifyApiController};