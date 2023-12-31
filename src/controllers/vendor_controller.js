const database = require("../../config/database_config");

const { successResponse, failureResponse } = require("../utility/utility");

const registartionVendorApi = async (req , res ) => {
    try{
        const { mobile_number,busineses_name,owner_name,categories,latitude,longitude,location_name,password,confirm_password,al_CodReferre,wallet_address,registrationType,status,shop_image,profile_image} = req.body;

         if (mobile_number === undefined) {
           res.status(401).json(failureResponse("failure", "mobile number has  undefined value"));
         }
        const isMobileNum_exists =await database.models.vendor_model.findOne({
          where : {
              mobile_number : mobile_number
          }
  
        });

        console.log(" checking data ===============================", isMobileNum_exists);



    if(!mobile_number) {
        res.status(401).json(failureResponse("failure","Please provide valid Mobile Number"));
    }
      else if(isMobileNum_exists !== null ) {
         res.status(401).json(failureResponse("failure","mobile number is already exists in vendor table"));  
    
   } else if(password !== confirm_password) {
    res.status(401).json(failureResponse("failure","Please provide correct confirm password "));  

   }
         
      else {
       const create_data = await database.models.vendor_model.create({mobile_number,busineses_name,owner_name,categories,latitude,longitude,location_name,password,confirm_password,al_CodReferre,wallet_address,registrationType,status,shop_image,profile_image});

       res.status(201).json(successResponse("success", "vendor registrered successfully", create_data));
      }


    } catch(error) {
      console.log("error=========================",error);
        res.status(400).json(failureResponse("failure" , "Vendor registartion is not done something went wrong"));

    }
}


const updateVendorApi = async (req, res) => {
    try {
      const mobileNumber = req.params.mobile_number;
      const Al_CodReferre = req.body.al_CodReferre;
  
      // Find the vendor based on mobile number
      const vendor = await database.models.vendor_model.findOne({
        where: {
          mobile_number: mobileNumber
        }
      });
       
      console.log("vendor------------------",vendor);
      // Check if mobile_number is provided and valid
      if (!mobileNumber) {
        res.status(404).json(failureResponse("failure", "Please provide valid mobile number"));

      }
  
       // If vendor not found
      else if (!vendor) {
         res.status(404).json(failureResponse("failure", "Vendor not found"));

      } 

   

      else {
        
      // Update the CodReffer
      const updateVendorData = await database.models.vendor_model.update(
        { al_CodReferre: Al_CodReferre,
        
        },
        {
          where: {
            mobile_number: mobileNumber
          }
        }
      );
  
      res.status(200).json(successResponse("success", "Vendor data updated successfully", updateVendorData));
     
    }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json(failureResponse("failure", "Vendor data not updated successfully",error));
    }
  }
  
  const deteteByMobVendorApi = async (req, res) => {
    try {
         const mobile_number = req.params.mobile_number;

         const deletedVendorData =  await database.models.vendor_model.destroy({
            where :{
              mobile_number : mobile_number
            }
         });

          res.status(200).json(successResponse("success", "vendor data deleted successfully",deteteByMobVendorApi));
  
        } catch(error) {
        console.error("Error:", error);
        res.status(500).json(failureResponse("failure", "Vendor data not deleted successfully",error));
      } 
    }


    const loginVendorApi = async (req, res) => {
      try {
        const { mobile_number, password } = req.body;

        // Find the vendor based on the provided mobile number
        const vendor = await database.models.vendor_model.findOne({
          where: { 
            mobile_number: mobile_number

           }
        });

        
  
        // If vendor not found
       if(!vendor) {
          return res.status(404).json(failureResponse("failure", "Vendor not found"));
        }
    
    
       else if (password !== vendor.password) {
         res.status(401).json(failureResponse("failure", "Invalid password"));
        }

        // Check if mobile number and password are provided
        else if (!mobile_number && !password) {
          res.status(400).json(failureResponse("failure", "Please provide mobile number and password"));
        }
    
        else {
          
        // Successful login
         res.status(200).json(successResponse("success", "Login successful", vendor));
        }

      } catch (error) {

        console.log("Error:", error);
        return res.status(500).json(failureResponse("failure", "Login failed"));
      }
    };

module.exports = {registartionVendorApi, updateVendorApi,deteteByMobVendorApi, loginVendorApi};