const database = require("../../config/database_config");

const {successResponse, FailureResponse, failureResponse} = require("../utility/utility");

const createCatagoryApi = async( req , res) => {
    try {
          const {id, catagory_name, catagory_image, catagory_position } = req.body;

          const isId_exists =await database.models.catagory_model.findOne({
            where : {
                id : id
            }
    
          });
  
          console.log(" checking data ===============================", isId_exists);

          if(isId_exists === null) {
            res.status(failureResponse("failure", "catagory is already exists"));
          }
  

          const createData = await database.models.catagory_model.create({id, catagory_name, catagory_image, catagory_position});

    res.status(201).json(successResponse("success", "catagory api is created", createData));

    }catch(error) {

        console.log("error======================",error);
        res.status(500).json(failureResponse("failure", " something went wrong",error))
    }
}

const getCategoryByIdApi = async (req, res) => {
    try {
        const id = req.params.id; 

        // Find the category by ID in the database
        const category = await database.models.catagory_model.findByPk(id);

        if (!category) {
            return res.status(404).json(failureResponse("failure", "Category not found"));
        }

        res.status(200).json(successResponse("success", "Category retrieved", category));
    } catch (error) {
        console.log("error======================", error);
        res.status(500).json(failureResponse("failure", "Something went wrong", error));
    }
};

const updateCategoryApi = async (req, res) => {
    try {
        const id = req.params.id// Assuming categoryId is passed as a route parameter
        const { catagory_name, catagory_image, catagory_position } = req.body;

        // Find the category by ID in the database
        const category = await database.models.catagory_model.findByPk(id);

        if (!category) {
            return res.status(404).json(failureResponse("failure", "Category not found"));
        }
       
        const updateCatApi = await database.models.catagory_model.update({
            catagory_name : catagory_name, 
            catagory_image : catagory_image, 
            //catagory_position : catagory_position
        },{

            where : {
                id : id
            }
        });

        res.status(200).json(successResponse("success", "Category updated", updateCatApi));
    } catch (error) {
        console.log("error======================", error);
        res.status(500).json(failureResponse("failure", "Something went wrong", error));
    }
};

const deleteCategoryApi = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Find the category by ID in the database
        const category = await database.models.catagory_model.findByPk(id);

        if (!category) {
            return res.status(404).json(failureResponse("failure", "Category not found"));
        }
       
        const deleteCatApi = await database.models.catagory_model.destroy({

            where : {
                id : id
            }
        });

        res.status(200).json(successResponse("success", "Category deleted", deleteCatApi));
    } catch (error) {
        console.log("error======================", error);
        res.status(500).json(failureResponse("failure", "Something went wrong", error));
    }
};


 module.exports = {createCatagoryApi, getCategoryByIdApi, updateCategoryApi, deleteCategoryApi};
