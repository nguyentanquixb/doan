module.exports = app => {
    const hotelImage = require("../controllers/hotelImage.controller");

    var router = require("express").Router();

    router.get("/", hotelImage.findAll);
    router.post("/", hotelImage.create);
    router.get("/:id", hotelImage.findOne);

    app.use('/api/hotelImage', router);
};