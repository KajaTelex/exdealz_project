const express = require("express");
const router = express.Router();

const catagoryControlelr =  require("../../src/controllers/catagory_controller");

router.post("/create_catagory_api", catagoryControlelr.createCatagoryApi );

router.get("/getAll_catagories", catagoryControlelr.getAllCatagoriesApi);

router.get("/get_catagory_api/:id", catagoryControlelr.getCategoryByIdApi);

router.put("/update_catagory_api/:id", catagoryControlelr.updateCategoryApi);

router.delete("/delete_catagory_api/:id", catagoryControlelr.deleteCategoryApi);




module.exports = router;