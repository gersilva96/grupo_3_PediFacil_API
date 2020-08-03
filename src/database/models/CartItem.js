module.exports = (sequelize, dataTypes) => {

    const alias = "Cart_items";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        quantity: {
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };

    const config = {
        tableName: "cart_items"
    };

    const CartItem = sequelize.define(alias, cols, config);

    //RELACIONES
    CartItem.associate = (models) => {
        CartItem.belongsTo(models.Users, {
            as: "user",
            foreignKey: "user_id"
        });
        CartItem.belongsTo(models.Products, {
            as: "product",
            foreignKey: "product_id"
        });
    };

    return CartItem;
}