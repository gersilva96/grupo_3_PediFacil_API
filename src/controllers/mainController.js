const mainController = {
    root: async (req, res) => {
        try {
            res.send("API de Pedí Fácil");
        } catch(error) {
            res.send(error);
        }
    }
};

module.exports = mainController;