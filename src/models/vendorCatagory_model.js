module.exports = (sequelize, DataTypes) => {
    const vendorCatagory = sequelize.define("vendorCatagory", {

    vendor_name : {
        type : DataTypes.STRING,
        defaultValue : ""
    },
    catagory_name : {
        type : DataTypes.STRING,
        defaultValue : ""
    }
    });

    return vendorCatagory;
}