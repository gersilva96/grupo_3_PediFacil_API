module.exports = (sequelize, dataTypes) => {

    const alias = "Categories";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    };

    const config = {
        tableName: "categories"
    };

    const Category = sequelize.define(alias, cols, config);

    //RELACIONES
    Category.associate = (models) => {
        Category.hasMany(models.Products, {
            as: "products",
            foreignKey: "category_id"
        });
    };

    return Category;
}