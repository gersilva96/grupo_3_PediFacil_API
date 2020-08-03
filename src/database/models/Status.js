module.exports = (sequelize, dataTypes) => {

    const alias = "Statuses";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };

    const config = {
        tableName: "statuses"
    };

    const Status = sequelize.define(alias, cols, config);

    //RELACIONES
    Status.associate = (models) => {
        Status.hasMany(models.Orders, {
            as: "orders",
            foreignKey: "status_id"
        });
    };

    return Status;
}