const { Orders } = require("../database/models");

const ordersController = {
    total: async (req, res) => {
        try {
            const orders = await Orders.count();
            const toResponse = {
                meta: {
                    status: 200
                },
                data: orders
            };
            res.json(toResponse);
        } catch (error) {
            res.send(`Error: ${error}`);
        }
    }
};

module.exports = ordersController;