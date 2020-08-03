const {Users, Sequelize} = require("../database/models");

const usersController = {
    root: async (req, res) => {
        try {
            const users = await Users.findAndCountAll({
                attributes: ["id", [Sequelize.fn("CONCAT", Sequelize.col("first_name"), " ", Sequelize.col("last_name")), "name"], "business_name", "email", [Sequelize.fn("CONCAT", `http://localhost:${process.env.HOST_PORT}/users/`, Sequelize.col("id")), "detail"]]
            });
            users.users = users.rows;
            delete users.rows;
            res.json(users);
        } catch(error) {
            res.send("Error");
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
            let user = {...userInfo.dataValues, image_url};
            res.json(user);
        } catch(error) {
            res.send("Error");
        }
    }
};

module.exports = usersController;