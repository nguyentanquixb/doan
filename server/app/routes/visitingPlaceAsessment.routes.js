module.exports = app => {
    const visitingPlaceAsessment = require("../controllers/visitingPlaceAsessment.controller.js");

    var router = require("express").Router();

    router.get("/", visitingPlaceAsessment.findAll);
    router.post("/", visitingPlaceAsessment.create);
    router.get("/:id", visitingPlaceAsessment.findOne);

    app.use('/api/visitingPlaceAsessment', router);
};