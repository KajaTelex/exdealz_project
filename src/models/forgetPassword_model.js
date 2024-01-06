module.exports = (Sequelize, DataTypes) => {
    const forgetPassword = Sequelize.define("forgetPassword", {
        mobile_number : {
            type : DataTypes.INTEGER,
            UNIQUE : true
            },

          otp : {
            type : DataTypes.INTEGER
          } ,
          
          password : {
            type : DataTypes.INTEGER

          },
          confirm_password : {
            type : DataTypes.INTEGER

          },
          isVerified : {
            type : DataTypes.BOOLEAN,
            defaultValue: false       
         }
    })

    return forgetPassword;
}