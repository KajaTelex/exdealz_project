module.exports = (sequelize, DataTypes) => {

const vendor = sequelize.define("vendor", {
    mobile_number : {
        type : DataTypes.STRING,
        defaultValue : false

    },

    busineses_name : {
        type : DataTypes.STRING,
        defaultValue : false

    },

    owner_name : {
        type : DataTypes.STRING,
        defaultValue : false

    },
  
    latitude  : {
        type : DataTypes.STRING,
        defaultValue : false

    },
    longitude  : {
        type : DataTypes.STRING,
        defaultValue : false

    },
    location_name  : {
        type : DataTypes.STRING,
        defaultValue : false

    },
    password  : {
        type : DataTypes.STRING,
        defaultValue : false

    },
    confirm_password : {
        type : DataTypes.STRING,

    },
    al_CodReferre : {
        type : DataTypes.STRING,
        defaultValue : false

    },
    wallet_address : {
        type : DataTypes.STRING,
        defaultValue : false

    },
    registrationType : {
        type : DataTypes.STRING,
        defaultValue : false

    },
    status : {
        type : DataTypes.STRING,
        defaultValue : false

    },
    shop_image : {
        type : DataTypes.STRING,
        defaultValue : false

    },
    profile_image: {
        type : DataTypes.STRING,
        defaultValue : false

    }
})


return vendor;

}