module.exports = (sequelize, dataTypes) => {

    const alias = "Roles";

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
        tableName: "roles"
    };

    const Role = sequelize.define(alias, cols, config);

    //RELACIONES
    Role.associate = (models) => {
        Role.hasMany(models.Users, {
            as: "users",
            foreignKey: "role_id"
        });
    };

    return Role;
}