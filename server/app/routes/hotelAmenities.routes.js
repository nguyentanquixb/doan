module.exports = app => {
    const hotelAmenities = require("../controllers/hotelAmenities.controller");

    var router = require("express").Router();

    router.get("/", hotelAmenities.findAll);
    router.post("/", hotelAmenities.create);

    app.use('/api/hotelAmenities', router);
};