const { Sequelize , DataTypes} = require("sequelize");

const otpModel = require("../src/models/otp_models");


const instanceSequelize = new Sequelize ("xdeals", "root", "Khaja05$", {
    host: "localhost",
    dialect: "mysql"
});


models = {
otp_model : otpModel(instanceSequelize ,DataTypes)
}

module.exports = {instanceSequelize, models};