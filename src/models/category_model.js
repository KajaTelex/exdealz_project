module.exports = (sequelize,DataTypes) => {
    const category = sequelize.define("category",{
        categoryName: {
            type: DataTypes.STRING
        },
        categoryImage: {
            type: DataTypes.STRING
        },
        categoryPosition: {
            type: DataTypes.STRING
        }
    })
    return category;
}