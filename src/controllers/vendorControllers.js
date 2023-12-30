const CryptoJS = require("crypto-js");
const multer = require("multer");
const database = require("../../config/database_config");
const {validateParameters} = require("../validation/validation");
const { successResponse, failureResponse } = require("../utilities/utilities");

const registrationController = async (req,res) => {
    const {mobileNumber,businessName,ownerName,
    categories,latitude,longitude,locationName,password,
    confirmPassword,codeReferral,walletAddress,registrationType,status} = req?.body;

    const {shopImage,profileImage} = req?.file;
    
    const parameters = {mobileNumber,businessName,ownerName,categories,latitude,longitude,locationName,password,
    confirmPassword,codeReferral,walletAddress,registrationType,status,shopImage,profileImage};

    const message = validateParameters(parameters);

    if(message !== "Validation is successfull"){
        res.status(500).json(failureResponse("failure",message));
    }
    
    // Encryption 
    const key = "12345";
    const encryptedPassword = CryptoJS.AES.encrypt(password, key);
    const encryptedConfirmPassword = CryptoJS.AES.encrypt(confirmPassword, key);
    console.log("====Encrypted====",encryptedPassword);
    console.log("====EncryptedConfirmPassword====",encryptedConfirmPassword);

    //Decryption
    const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword,key);
    const decryptedConfirmPassword = CryptoJS.AES.decrypt(encryptedConfirmPassword,key);
    console.log("====Decrypted====",decryptedPassword);
    console.log("====DecryptedConfirmPassword====",decryptedConfirmPassword);

    const isDataExists = await database.models.vendor_model.findOne({
        where: {
            mobileNumber : mobileNumber
        }
    })

    if(isDataExists === null){
        const createVendor = await database.models.vendor_model.create({
            mobileNumber,businessName,ownerName,categories,latitude,longitude,locationName,encryptedPassword,
            confirmPassword,codeReferral,walletAddress,registrationType,status,shopImage,profileImage
        });
        res.status(201).json(successResponse("success","registration completed",createVendor));
    }
    else{
        res.status(500).json(failureResponse("failure","Registration already completed"));
    }
}

const updateVendorController = async (req,res) => {
    const {mobileNumber} = req?.params;
    const {businessName} = req?.body;

    if(mobileNumber){
        const isDataExists = await database.models.vendor_model.findOne({
            where: {
                mobileNumber: mobileNumber
            }
        });
        if(isDataExists){
            await database.models.vendor_model.update({businessName: businessName},{where:{mobileNumber:mobileNumber}});
            res.status(200).json(successResponse("success","Vendor is updated successfully"),isDataExists);
        }
        else{
            res.status(400).json(failureResponse("failure","Mobile Number doesn't exists"));
        }
    }
    else{
        res.status(400).json(failureResponse("failure","Please Provide the correct Mobile Number"));
    }
}

const deleteVendorController = async (req,res) => {
    const {mobileNumber} = req?.params;
    if(mobileNumber){
        await database.models.vendor_model.destroy({
            where : {
                mobileNumber: mobileNumber
            }
        });
        res.status(200).json(successResponse("success","Vendor is Deleted Successfully"));
    }
    else{
        res.status(400).json(failureResponse("failure","Please provide the correct Mobile Number"));
    }
}

const loginApiController = async (req,res) => {
    const {mobileNumber,password} = req?.body;
    try{
        if(!mobileNumber){
            res.status(400).json(failureResponse("failure","Please provide Mobile Number"));
        }
        else if(!password){
            res.status(400).json(failureResponse("failure","Please provide password"));
        }
        else{
            const record = await database.models.vendor_model.findOne({
                where: {mobileNumber: mobileNumber}
            });
            if(record){
                const key = "12345";
                const decryptedPassword = CryptoJS.AES.decrypt(record?.password,key);
                if(decryptedPassword === password){
                    res.status(200).json(successResponse("success","Login Successful",record));
                }
                else{
                    res.status(400).json(failureResponse("failure","Login Unsuccessful"));
                }
            }
            else{
                res.status(400).json(failureResponse("failure","Vendor doesn't exist"));
            }
        }
    }
    catch(error){
        res.send(500).json(failureResponse("failure","Login failed",error));
    }
}

module.exports = {registrationController,deleteVendorController,updateVendorController,loginApiController}