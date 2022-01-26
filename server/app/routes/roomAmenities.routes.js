module.exports = app => {
    const roomAmenities = require("../controllers/roomAmenities.controller");

    var router = require("express").Router();

    router.get("/", roomAmenities.findAll);
    router.post("/", roomAmenities.create);

    app.use('/api/roomAmenities', router);
};