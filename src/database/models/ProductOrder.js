module.exports = (sequelize, dataTypes) => {

    const alias = "Product_orders";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        total_cost: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        unit_cost: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        order_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };

    const config = {
        tableName: "product_order"
    };

    const ProductOrder = sequelize.define(alias, cols, config);

    ProductOrder.associate = (models) => {
        ProductOrder.belongsTo(models.Orders, {
            as: "order",
            foreignKey: "order_id"
        });
        ProductOrder.belongsTo(models.Products, {
            as: "product",
            foreignKey: "product_id"
        });
    };

    return ProductOrder;
}