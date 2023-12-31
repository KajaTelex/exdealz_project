
module.exports = (Sequelize, DataTypes) => {
    const catagory = Sequelize.define("catagory", {

        id : {
           type : DataTypes.INTEGER,
           primaryKey: true   
        },
       
        catagory_name : {
            type : DataTypes.STRING,
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