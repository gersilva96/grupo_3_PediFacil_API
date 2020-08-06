const { Products, Categories, Product_orders, Users, sequelize } = require("../database/models");
const { Op } = require("sequelize");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price, discount) => {
    let priceDot;
    if (discount == undefined) {
        priceDot = toThousand(price.toFixed(2));
    } else {
        priceDot = toThousand((price * (1 - (discount / 100))).toFixed(2));
    }
    let first = priceDot.slice(0, -3);
    let last = priceDot.slice(-3);
    let lastReplaced = last.replace(".", ",");
    return `$${first}${lastReplaced}`;
};

const productsController = {
    root: async (req, res) => {
        try {
            const total = await Products.count();
            const categories = await Categories.findAll();
            const productsQuery = await Products.findAll({
                include: [
                    { association: "user" },
                    { association: "category" }
                ],
                attributes: ["id", "name", "description", "category_id", "stock", "price", "discount"]
            });
            let countByCategory = [];
            categories.forEach(category => {
                let count = 0;
                productsQuery.forEach(product => {
                    if (product.dataValues.category_id == category.id) {
                        count++;
                    }
                });
                countByCategory.push({
                    name: category.name,
                    total: count
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
                product.price = formatPrice(parseFloat(product.price), product.discount);
                delete product.discount;
                product.detail = `http://localhost:${process.env.HOST_PORT}/products/${product.id}`;
            });
            let withStock = 0;
            productsQuery.forEach(product => {
                if (product.stock > 0) {
                    withStock++;
                }
            });
            const mostSoldQuery = await Product_orders.findOne({
                attributes: ["product_id", "quantity"],
                include: [{ association: "product", duplicating: true }],
                order: [["quantity", "DESC"]]
            });
            let mostSold = "-";
            if (mostSoldQuery != undefined) {
                mostSold = mostSoldQuery.product.name;
            }
            const topTenQuery = await sequelize.query("SELECT DISTINCT product_order.product_id, product_order.quantity, products.name FROM product_order INNER JOIN products ON products.id = product_order.product_id ORDER BY product_order.quantity DESC LIMIT 10;");
            const topTen = [];
            topTenQuery[0].forEach(product => {
                topTen.push({
                    name: product.name
                });
            });
            const sold = await Product_orders.aggregate("product_id", "count", { duplicating: false });
            res.json({ total, withStock, sold, mostSold, topTen, countByCategory, products });
        } catch (error) {
            res.send(`Error: ${error}`);
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
        } catch (error) {
            res.send(`Error: ${error}`);
        }
    },
    recents: async (req, res) => {
        try {
            const products = await Products.findAll({
                attributes: ["name", "stock", "price"],
                order: [["createdAt", "DESC"]],
                limit: 10
            });
            products.forEach(product => {
                product.price = formatPrice(parseFloat(product.price));
            })
            res.json(products);
        } catch (error) {
            res.send(`Error: ${error}`);
        }
    },
    comTotal: async (req, res) => {
        try {
            const products = await Products.findAll({ where: { stock: { [Op.gt]: 0 } } });
            let count = 0;
            products.forEach(product => {
                count += (parseFloat(product.price) * (1 - (parseInt(product.discount) / 100))) * product.stock;
            });
            let total = formatPrice(count);
            res.json(total);
        } catch (error) {
            res.send(`Error: ${error}`);
        }
    }
};

module.exports = productsController;