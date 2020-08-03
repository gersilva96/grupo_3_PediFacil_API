module.exports = (sequelize, dataTypes) => {

    const alias = "Products";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        code: {
            type: dataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            unique: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };

    const config = {
        tableName: "products"
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo(models.Users, {
            as: "user",
            foreignKey: "user_id"
        });
        Product.hasMany(models.Cart_items, {
            as: "cart_items",
            foreignKey: "product_id"
        });
        Product.belongsTo(models.Categories, {
            as: "category",
            foreignKey: "category_id"
        });
        Product.belongsToMany(models.Orders, {
            as: "orders",
            through: "product_order",
            foreignKey: "product_id",
            otherKey: "order_id"
        });
    };

    return Product;
}