const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");

const database = require("./config/database_config");

const otpRoutes = require("./src/routes/otp_routes");

const vendorRoutes = require("./src/routes/vendor_routes");

const catagoryRoutes = require("./src/routes/catagory_routes");

 const vendorCatagoryRoutes = require("./src/routes/vendorCatagory_routes");

 const forgetPasswordRoutes = require("./src/routes/forgetPassword_routes");

 const offersRoutes = require("./src/routes/offers_routes");



var corsOptions = {
    origin : "*",
    corsSuccessStatus : 200
};

const PORT = 5001;
const app = express();

app.use(bodyParser.json());

app.use("/api", otpRoutes);

app.use("/api", vendorRoutes);

app.use("/api",catagoryRoutes);

app.use("/api", vendorCatagoryRoutes);

app.use("/api",forgetPasswordRoutes);

app.use("/api",offersRoutes);



async function init() {
    try {
        
    await database.instanceSequelize.authenticate();
    console.log(`mysql database connected successfully`);

    app.use(compression());

    app.use(cors(corsOptions));

    app.listen(PORT, function () {
        console.log(`server start connecting to port ${PORT}`);
    });
    } catch(error) {
        console.log(`unable to connect mysql database ${error}`);
    }
}



init();


database.instanceSequelize.sync({force: false})
.then(() => {
    console.log("model is synchronised properly");
})
.catch((error) => {
    console.log("model is not syc", error);
});