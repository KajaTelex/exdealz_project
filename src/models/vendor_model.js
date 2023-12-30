module.exports = (sequelize, DataTypes) => {
    const vendor = sequelize.define("vendor", {
        mobileNumber : {
            type : DataTypes.STRING
        },
        businessName : {
            type : DataTypes.STRING
        },
        ownerName : {
            type : DataTypes.STRING,       
        },
        categories : {
            type: DataTypes.STRING
        },
        latitude: {
            type: DataTypes.STRING
        },
        longitude: {
            type: DataTypes.STRING
        },
        locationName: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        confirmPassword: {
            type: DataTypes.STRING
        },
        codeReferral: {
            type: DataTypes.STRING
        },
        walletAddress: {
            type: DataTypes.STRING
        },
        registrationType: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        shopImage: {
            type: DataTypes.BLOB
        },
        profileImage: {
            type: DataTypes.BLOB
        }
    });
    return vendor;
}