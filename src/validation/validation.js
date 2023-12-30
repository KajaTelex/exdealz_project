const validateParameters = (parameters) => {
    let message = ""
    if(!parameters?.mobileNumber){
        message = "Please provide your Mobile Number";
    }
    else if(!parameters?.businessName){
        message = "Please provide your Business Name";
    }
    else if(!parameters?.ownerName){
        message = "Please provide your Owner Name";
    }
    else if(!parameters?.categories){
        message = "Please provide the Categories Name";
    }
    else if(!parameters?.latitude){
        message = "Please provide the Latitude Name";
    }
    else if(!parameters?.longitude){
        message = "Please provide the Longitude Name";
    }
    else if(!parameters?.locationName){
        message = "Please provide the Location Name";
    }
    else if(!parameters?.password){
        message = "Please provide your Password";
    }
    else if(!parameters?.confirmPassword){
        message = "Please confirm your Password";
    }
    else if(!parameters?.codeReferral){
        message = "Please provide the Referral Code";
    }
    else if(!parameters?.walletAddress){
        message = "Please provide Wallet Address";
    }
    else if(!parameters?.registrationType){
        message = "Please provide the Registration Type";
    }
    else if(!parameters?.status){
        message = "Please provide the Status";
    }
    else if(!parameters?.shopImage){
        message = "Please upload the Shop Image";
    }
    else if(!parameters?.profileImage){
        message = "Please upload the Profile Image";
    }
    else{
        message = "Validation is successfull";
    }
    return message;
}

module.exports = {validateParameters}