module.exports = (sequelize, DataTypes) => {

const vendor = sequelize.define("vendor", {
    mobile_number : {
        type : DataTypes.STRING,
        
    },

    busineses_name : {
        type : DataTypes.STRING
    },

    owner_name : {
        type : DataTypes.STRING
    },
    categories  : {
        type : DataTypes.STRING
    },
    latitude  : {
        type : DataTypes.STRING
    },
    longitude  : {
        type : DataTypes.STRING
    },
    location_name  : {
        type : DataTypes.STRING
    },
    password  : {
        type : DataTypes.STRING
    },
    confirm_password : {
        type : DataTypes.STRING
    },
    al_CodReferre : {
        type : DataTypes.STRING
    },
    wallet_address : {
        type : DataTypes.STRING
    },
    registrationType : {
        type : DataTypes.STRING
    },
    status : {
        type : DataTypes.STRING
    },
    shop_image : {
        type : DataTypes.STRING
    },
    profile_image: {
        type : DataTypes.STRING
    }
})

return vendor;

}