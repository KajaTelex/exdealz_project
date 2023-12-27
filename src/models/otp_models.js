module.exports = (sequelize, DataTypes) => {
    const otp = sequelize.define("otps", {
        mobile_number : {
            type : DataTypes.STRING
        },

        otp : {
            type : DataTypes.STRING
        },

        isVerified : {
            type : DataTypes.BOOLEAN,
            defaultValue: false       
         }
    })

    return otp;
}