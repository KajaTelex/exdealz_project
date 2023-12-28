module.exports = (sequelize, DataTypes) => {
    const otp = sequelize.define("otps", {
        mobileNumber : {
            type : DataTypes.STRING
        },
        otp : {
            type : DataTypes.STRING
        },
        isVerified : {
            type : DataTypes.BOOLEAN,       
        }
    })
    return otp;
}