const { Orders } = require("../database/models");

const ordersController = {
    total: async (req, res) => {
        try {
            const orders = await Orders.count();
            res.json(orders);
        } catch (error) {
            res.send(`Error: ${error}`);
        }
    }
};

module.exports = ordersController;