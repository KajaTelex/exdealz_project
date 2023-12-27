const { Sequelize , DataTypes} = require("sequelize");

const otpModel = require("../src/models/otp_models");


const instanceSequelize = new Sequelize ("akhil", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});


models = {
otp_model : otpModel(instanceSequelize ,DataTypes)
}

module.exports = {instanceSequelize, models};