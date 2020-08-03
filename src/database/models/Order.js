module.exports = (sequelize, dataTypes) => {

    const alias = "Orders";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        order_number: {
            type: dataTypes.INTEGER.UNSIGNED.ZEROFILL,
            allowNull: false,
            unique: true
        },
        order_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        order_total: {
            type: dataTypes.DECIMAL(10,2)
        },
        order_description: {
            type: dataTypes.STRING(100)
        },
        user_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        address_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        status_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };

    const config = {
        tableName: "orders"
    };

    const Order = sequelize.define(alias, cols, config);

    Order.associate = (models) => {
        Order.belongsTo(models.Addresses, {
            as: "address",
            foreignKey: "address_id"
        });
        Order.belongsTo(models.Users, {
            as: "user",
            foreignKey: "user_id"
        });
        Order.belongsTo(models.Statuses, {
            as: "status",
            foreignKey: "status_id"
        });
        Order.belongsToMany(models.Products, {
            as: "products",
            through: "product_order",
            foreignKey: "order_id",
            otherKey: "product_id"
        });
    };

    return Order;
}