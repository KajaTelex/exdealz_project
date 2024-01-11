module.exports = (sequelize, DataTypes) => {
    const offer = sequelize.define("offer", {
       
        offerType : {
            type : DataTypes.BOOLEAN,
            defaultValue : "0"
        },
        title : {
            type : DataTypes.STRING,
            defaultValue : ""
        },
        description : {
            type : DataTypes.STRING,
            defaultValue : ""  
        },
      
       price : {
        type : DataTypes.DOUBLE,
        
       },
       discount : {
        type : DataTypes.DOUBLE,
      },

      offer_start_date : {
        type : DataTypes.DATE,
      },
      
      offer_end_date : {
        type : DataTypes.DATE
      },
      images_upload : {
        type : DataTypes.STRING,
        defaultValue : ""  
      },
      price_range: {
        type: DataTypes.STRING,
    },
    discount_range: {
        type: DataTypes.STRING,
    }
})

  return offer;
}
