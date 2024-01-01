const database = require("../../config/database_config");
const { successResponse, failureResponse } = require("../utilities/utilities");

const createCategoryController = async (req,res) => {
    const {categoryName,categoryImage,categoryPosition} = req.body;
    try{
        const categoryRecord = await database.models.category_model.findOne({
            where: {categoryName: categoryName}
        });
        console.log("categoryRecord",categoryRecord);
        if(categoryRecord){
            res.status(200).json(failureResponse("failure","Category already exists"));
        }else{
            const category = await database.models.category_model.create({
                categoryName,categoryImage,categoryPosition
            });
            console.log("===category===",category);
            res.status(201).json(successResponse("success","Category Created Successfully",category));
        }
    }
    catch(error){
        res.status(400).json(failureResponse("failure","Something went wrong!!!"));
    }
}

const getCategoriesController = async (req,res) => {
    const categories = await database.models.category_model.findAll();
    try{
        if(categories){
            res.status(200).json(successResponse("success","Categories are retrieved successfully",categories));
        }
        else{
            res.status(400).json(failureResponse("failure","Categories are not Found"));
        }
    }
    catch(error){
        res.status(400).json(failureResponse("failure","Something went wrong!!!"));
    }
}

const getCategoryByNameController = async (req,res) => {
    const {categoryName} = req.params;
    const categoryByNameRecord = await database.models.category_model.findOne({
        where : {
            categoryName: categoryName
        }
    });
    try{
        if(categoryByNameRecord){
            res.status(200).json(successResponse("success","Category is retrieved successfully",categoryByNameRecord));
        }
        else{
            res.status(400).json(failureResponse("failure","Category is not found"));
        }
    }
    catch(error){
        res.status(400).failureResponse("failure","Something went wrong!!!")
    }
}

const updateCategoryController = async (req,res) => {
    const {categoryPosition} = req.body;
    const {categoryName} = req.params;
    try{
        const categoryRecord = await database.models.category_model.findOne({
            where: {
                categoryName: categoryName
            }
        })
        if(categoryRecord){
            await database.models.category_model.update({categoryPosition: categoryPosition},
            {
                where: {
                    categoryName: categoryName
                }
            })
            const updatedCategoryRecord = await database.models.category_model.findOne({
                where: {
                    categoryName: categoryName
                }
            })
            res.status(200).json(successResponse("success","Category updated successfully",updatedCategoryRecord));
        }
        else{
            res.status(400).json(failureResponse("failure","The requested category doesn't exist"));
        }
    }
    catch(error){
        res.status(400).json(failureResponse("failure","Something went wrong!!!"));
    }
}

const deleteCategoryController = async (req,res) => {
    const {categoryName} = req.params;
    const categoryRecord = await database.models.category_model.findOne({
        where: {
            categoryName: categoryName
        }
    });
    try{
        if(categoryRecord){
            await database.models.category_model.destroy({
                where: {categoryName: categoryName}
            });
            res.status(200).json(successResponse("success","The category is deleted successfully"));
        }
        else{
            res.status(400).json(failureResponse("failure","The requested category doesn't exist"));
        }
    }
    catch(error){
        res.status(400).json(failureResponse("failure","Something went wrong!!!"));
    }
}

module.exports = {createCategoryController,updateCategoryController,deleteCategoryController,getCategoriesController,getCategoryByNameController}