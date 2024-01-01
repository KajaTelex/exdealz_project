const express = require("express");
const router = express.Router();

const categoryControllers = require("../../src/controllers/categoryControllers");

router.post("/createCategory", categoryControllers.createCategoryController);

router.get("/getCategories",categoryControllers.getCategoriesController);

router.get("/getCategoryByName/:categoryName",categoryControllers.getCategoryByNameController);

router.put("/updateCategory/:categoryName", categoryControllers.updateCategoryController);

router.delete("/deleteCategory/:categoryName", categoryControllers.deleteCategoryController);


module.exports = router;