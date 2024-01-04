const database = require("../../config/database_config");

const {failureResponse, successResponse} = require("../utility/utility");

const createVendorCatagoryApi = async (req, res) => {
    try {
      const {vendorId, catagoryId, catagory_name, vendor_name} = req.body;

      console.log(req.body);

      const existingAssociations = await database.models.vendorCatagory_model.findOne({
        where : {
            vendorId,
            catagoryId
        }
    });

    if (existingAssociations) {
      res.status(409).json(failureResponse("failure", "Already association is exists",existingAssociations))
    }

    else { const createNewAssociation = await database.models.vendorCatagory_model.create({
        vendorId,
        catagoryId,
        catagory_name,
        vendor_name
    });



   
    res.status(201).json(successResponse("success", "vendor added new catagory", categories));
    }
    
    }catch (error) {
        console.log("error-----------------------",error);
       res.status(500).json(failureResponse("failure", "something went wrong", error));
    }
}


const getAllvendorsCatagories = async (req, res) => {
    try {
        
        const categories = await database.models.vendorCatagory_model.findAll();

        res.status(201).json(successResponse("success", "each vendor's all catagories", categories));
    } catch (error) {
        console.error("Error::::::::::::::", error);
        res.status(500).json(failureResponse("failure", "Something went wrong", error));
    }
};

const getByIdvendorCatagories = async (req, res) => {
    try {
         const vendorId = req.params.vendorId;
        const categories = await database.models.vendorCatagory_model.findAll({
          where : {
            vendorId : vendorId
          }
        });

        res.status(201).json(successResponse("success", "found vendor's all catagories", categories));
    } catch (error) {
        console.error("Error::::::::::::::", error);
        res.status(500).json(failureResponse("failure", "Something went wrong", error));
    }
};

const updateByIdvendorCatagories = async (req, res) => {
    try {
         const vendorId = req.params.vendorId;
         const vendor_name = req.body.vendor_name;
        
        const updatedcategories = await database.models.vendorCatagory_model.update(
            {
                  vendor_name : vendor_name,
        },{
          where : {
            vendorId : vendorId
          }
        }
      );

        res.status(201).json(successResponse("success", "update vendor catagories", updatedcategories));
    } catch (error) {
        console.error("Error::::::::::::::", error);
        res.status(500).json(failureResponse("failure", "Something went wrong", error));
    }
};

const deleteByIdvendorCatagories = async (req, res) => {
    try {
         const id = req.params.id;
        
        const deletedcategories = await database.models.vendorCatagory_model.destroy({
            where : {
                id : id
            }
        })

        res.status(201).json(successResponse("success", "successfully delete vendor catagory", deletedcategories));
    } catch (error) {
        console.error("Error::::::::::::::", error);
        res.status(500).json(failureResponse("failure", "Something went wrong", error));
    }
};


module.exports = {createVendorCatagoryApi,getAllvendorsCatagories,getByIdvendorCatagories,updateByIdvendorCatagories, deleteByIdvendorCatagories}; 