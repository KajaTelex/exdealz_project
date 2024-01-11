const database = require("../../config/database_config");
const{successResponse, failureResponse } = require("../../src/utility/utility");

const offersCreate = async(req, res) => {
    try{
        
            const {vendorCatagoryId, offerType, title,description,price,discount,
            offer_start_date,offer_end_date,images_upload,price_range,discount_range} = req.body;

        

             if(!vendorCatagoryId){
                 res.status(400).json(failureResponse("failure",'provide valid vendorCatagoryId'));
              }
              else if(!offerType){
                res.status(400).json(failureResponse("failure",'provide valid offerType'));
             }

              else if(!title){
                 res.status(400).json(failureResponse("failure",'provide valid title'));
             }
             
             else if(!description){
                 res.status(400).json(failureResponse("failure",'provide valid description'));
             }

             else if(!price){
                 res.status(400).json(failureResponse("failure",'provide valid price'));
             }

             else if(!discount){
                 res.status(400).json(failureResponse("failure",'provide valid discount'));
             }
             
             else if(!offer_start_date){
                 res.status(400).json(failureResponse("failure",'provide valid offer_start_date'));
             }

             else if(!offer_end_date){
                 res.status(400).json(failureResponse("failure",'provide valid offer_end_date'));
             }
             else if(!images_upload){
                 res.status(400).json(failureResponse("failure",'provide valid image url'));
             }

              else if(!price_range){
                 res.status(400).json(failureResponse("failure",'provide valid price range'));
              }

              else if(!discount_range){
                 res.status(400).json(failureResponse("failure",'provide valid discount_range'));
              }

              else {
                
            const createOfferData = await database.models.offers_model.create({vendorCatagoryId, offerType, title,description, price, price_range,discount ,discount_range,
                offer_start_date,offer_end_date,images_upload});
                
            res.status(201).json(successResponse("success","offer created successfully",createOfferData));
        }
     }catch(error) {
        console.log("error is ::::::::", error);``
        res.status(500).json(failureResponse("failure","something went wrong", error));
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
         //const vendorCatagoryId = req.params.vendorCatagoryId;
         const offerType =  req.params.offerType;
         //const id = req.params.id;
         vendorsOffersData = await database.models.offers_model.findOne({
            where : {
               // vendorCatagoryId : vendorCatagoryId 
                 offerType : offerType
            }
         })
  res.status(200).json(successResponse("success","found vendor's all offers successfully",vendorsOffersData));

    }catch(error) {
        console.log("error:::::::::::::::::::",error)
        res.status(404).json(failureResponse("failure","data not found", error))

    }
}

const updateOffers = async(req,res) =>{
    try{

        const id = req.params.id;
        const title = req.body.title;

        const updatedData = await database.models.offers_model.update({title : title},{
            where : {
                id : id
            }
        })
        res.status(200).json(successResponse("success","offer data update successfully",updatedData));

    }catch(error) {
        res.status(404).json(failureResponse("failure","something went wrong", error))

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
        res.status(200).json(successResponse("success","offer data update successfully",deletedData));

    }catch(error) {
        res.status(404).json(failureResponse("failure","comething went wrong", error))

    }
} 


module.exports = {offersCreate, getvendorOffersByVendorCatagoryId, getAllVendorsOffers,updateOffers,deleteOffersApi};