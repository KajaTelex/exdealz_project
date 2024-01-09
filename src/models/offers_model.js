module.exports = (sequelize, DataTypes) => {
    const offer = sequelize.define("offer", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey: true
        },
        offerType : {
            type : DataTypes.STRING,
            defaultValue : ""
        },
        title : {
            type : DataTypes.STRING,
            defaultValue : ""
        },
        description : {
            type : DataTypes.STRING,
            defaultValue : ""  
        },
        category : {
              type : DataTypes.STRING,
              UNIQUE : true,
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
      }
})

  return offer;
}
