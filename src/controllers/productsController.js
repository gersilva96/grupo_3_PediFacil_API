const {Products, Categories, Users} = require("../database/models");

const productsController = {
    root: async (req, res) => {
        try {
            const total = await Products.count();
            let countByCategory = {};
            const categories = await Categories.findAll();
            const productsQuery = await Products.findAll({
                include: [
                    {association: "user"},
                    {association: "category"}
                ],
                attributes: ["id", "name", "description", "category_id"]
            });
            categories.forEach(category => {
                let count = 0;
                productsQuery.forEach(product => {
                    if(product.dataValues.category_id == category.dataValues.id) {
                        count++;
                    }
                    countByCategory[category.name] = count;
                });
            });
            let products = [];
            productsQuery.forEach(product => {
                products.push(product.dataValues);
            });
            products.forEach(product => {
                product.seller = product.user.dataValues.business_name;
                product.category = product.category.dataValues.name;
                delete product.user;
                delete product.category_id;
                product.detail = `http://localhost:${process.env.HOST_PORT}/products/${product.id}`;
            });
            res.json({total, countByCategory, products});
        } catch(error) {
            res.send("Error");
        }
    },
    detail: async (req, res) => {
        try {
            const productsQuery = await Products.findByPk(req.params.id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            });
            let product = productsQuery.dataValues;
            const seller = await Users.findByPk(product.user_id);
            const category = await Categories.findByPk(product.category_id);
            product.seller = seller.business_name;
            product.category = category.name;
            product.image_url = `http://localhost:${process.env.HOST_PORT}/images/products/${product.image}`;
            delete product.user_id;
            delete product.category_id;
            res.json(product);
        } catch(error) {
            res.send("Error");
        }
    }
};

module.exports = productsController;