const { Sequelize , DataTypes} = require("sequelize");

const otpModel = require("../src/models/otp_models");
const vendorModel = require("../src/models/vendor_model");
const categoryModel = require("../src/models/category_model");


const instanceSequelize = new Sequelize ("akhil", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});


models = {
    otp_model : otpModel(instanceSequelize ,DataTypes),
    vendor_model : vendorModel(instanceSequelize,DataTypes),
    category_model : categoryModel(instanceSequelize,DataTypes)
}

module.exports = {instanceSequelize, models};