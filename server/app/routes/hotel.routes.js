module.exports = app => {
    const hotel = require("../controllers/hotel.controller.js");

    var router = require("express").Router();

    router.get("/", hotel.findAll);
    router.post("/", hotel.create);
    router.get("/:id", hotel.findOne);
    router.put("/:id", hotel.update);

    app.use('/api/hotel', router);
};