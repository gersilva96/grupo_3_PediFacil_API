const { Users, Roles, Sequelize } = require("../database/models");

const usersController = {
    root: async (req, res) => {
        try {
            const usersQuery = await Users.findAndCountAll({
                attributes: ["id", [Sequelize.fn("CONCAT", Sequelize.col("first_name"), " ", Sequelize.col("last_name")), "name"], "role_id", "business_name", "email", [Sequelize.fn("CONCAT", `http://localhost:${process.env.HOST_PORT}/users/`, Sequelize.col("id")), "detail"]]
            });
            const users = { ...usersQuery };
            users.users = users.rows;
            delete users.rows;

            //Contador de roles de usuario
            const roles = await Roles.findAll();
            let countByRole = [];
            let adminCount = 0;
            let sellerCount = 0;
            let buyerCount = 0;
            users.users.forEach(user => {
                switch (parseInt(user.dataValues.role_id)) {
                    case 1:
                        adminCount++;
                        break;
                    case 2:
                        sellerCount++;
                        break;
                    case 3:
                        buyerCount++;
                        break;
                }
            });
            roles.forEach(role => {
                countByRole.push({
                    role: role.name,
                    count: 0,
                });
            });
            countByRole.forEach(value => {
                if (value.role == "Administrador") {
                    value["count"] = adminCount;
                } else if (value.role == "Vendedor") {
                    value["count"] = sellerCount;
                } else if (value.role == "Comprador") {
                    value["count"] = buyerCount;
                }
            });
            users.countByRole = countByRole;
            //Contador de roles de usuario

            let admins = [];
            let sellers = [];
            let buyers = [];
            users.users.forEach(user => {
                switch (user.dataValues.role_id) {
                    case 1:
                        admins.push(user);
                        break;
                    case 2:
                        sellers.push({
                            business_name: user.business_name,
                            name: user.name
                        });
                        break;
                    case 3:
                        buyers.push({
                            name: user.dataValues.name
                        });
                        break;
                }
            });
            users.admins = admins;
            users.sellers = sellers;
            users.buyers = buyers;

            res.json(users);
        } catch (error) {
            res.send(`Error: ${error}`);
        }
    },
    detail: async (req, res) => {
        try {
            const userInfo = await Users.findByPk(req.params.id, {
                attributes: {
                    exclude: ["password", "role_id", "createdAt", "updatedAt"]
                }
            });
            let image_url = `http://localhost:${process.env.HOST_PORT}/images/users/${userInfo.image}`;
            let user = { ...userInfo.dataValues, image_url };
            res.json(user);
        } catch (error) {
            res.send(`Error: ${error}`);
        }
    }
};

module.exports = usersController;