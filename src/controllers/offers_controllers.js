const database = require("../../config/database_config");
const{successResponse, failureResponse } = require("../../src/utility/utility");

const offersCreate = async(req, res) => {
    try{

        const { id, vendorCatagoryId,offerType, title,description,category, price,discount,
            offer_start_date,offer_end_date,images_upload } = req.body;

            if (!vendorCatagoryId ||!offerType||!title || !description || !category ||
                !price || !discount || !offer_start_date ||!offer_end_date ||!images_upload)
             {
              return res.status(400).json(failureResponse("failure",'All fields are required', error));
              }


            const createOfferData = await database.models.offers_model.create({id, vendorCatagoryId,offerType, title,description,category, price,discount,
                offer_start_date,offer_end_date,images_upload});


       res.status(201).json(successResponse("success","offer created successfully",createOfferData));
    }catch(error) {
        console.log(`error is ${error}`);
        res.status(500).json(failureResponse("failure","something went wrong", error))
    }

}

const getAllVendorsOffers = async (req, res) => {
    try {
          const findAllData = await database.models.offers_model.findAll();
        res.status(200).json(successResponse("success","found all vendors offers successfully",findAllData));
    }catch(error) {
        res.status(404).json(failureResponse("failure","data not found", error))

    }
}

const getvendorOffersByVendorCatagoryId = async(req, res) => {
    try{
         const vendorCatagoryId = req.params.vendorCatagoryId;
         const id = req.params.id;
         vendorsOffersData = await database.models.offers_model.findOne({
            where : {
                vendorCatagoryId : vendorCatagoryId 
            }
         })
  res.status(200).json(successResponse("success","found all vendors offers successfully",vendorsOffersData));

    }catch(error) {
        res.status(404).json(failureResponse("failure","data not found", error))

    }
}

const updateOffers = async(req,res) =>{
    try{

        const id = req.params.id;
        const category = req.body.category;

        const updatedData = await database.models.offers_model.update({category:category},{
            where : {
                id : id
            }
        })
        res.status(200).json(successResponse("success","offer data update successfully",updatedData));

    }catch(error) {
        res.status(404).json(failureResponse("failure","comething went wrong", error))

    }
}

const deleteOffersApi = async(req,res) =>{
    try{

        const id = req.params.id;

        const deletedData = await database.models.offers_model.destroy({
            where : {
                id : id
            }
        })
        res.status(200).json(successResponse("success","offer data update successfully",updatedData));

    }catch(error) {
        res.status(404).json(failureResponse("failure","comething went wrong", error))

    }
}


module.exports = {offersCreate,getAllVendorsOffers,getvendorOffersByVendorCatagoryId,updateOffers,deleteOffersApi};