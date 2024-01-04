
module.exports = (sequelize, DataTypes) => {
    const catagory = sequelize.define("catagory", {
        
        

        catagory_name : {
            type : DataTypes.STRING,
            unique : true
        },
        catagory_image : {
            type : DataTypes.STRING,
        },
        catagory_position : {
            type : DataTypes.INTEGER,
        }
    })


    
    return catagory;
}