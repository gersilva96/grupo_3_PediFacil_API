module.exports = (sequelize, dataTypes) => {

    const alias = "Users";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        business_name: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        first_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        role_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };

    const config = {
        tableName: "users"
    };

    const User = sequelize.define(alias, cols, config);

    //RELACIONES
    User.associate = (models) => {
        User.belongsTo(models.Roles, {
            as: "role",
            foreignKey: "role_id"
        });
        User.hasMany(models.Cart_items, {
            as: "cart_items",
            foreignKey: "user_id"
        });
        User.hasMany(models.Products, {
            as: "products",
            foreignKey: "user_id"
        });
        User.hasMany(models.Orders, {
            as: "orders",
            foreignKey: "user_id"
        });
        User.hasMany(models.Addresses, {
            as: "addresses",
            foreignKey: "user_id"
        });
    };

    return User;
}