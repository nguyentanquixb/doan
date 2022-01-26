module.exports = app => {
    const visitingPlace = require("../controllers/visitingPlace.controller.js");

    var router = require("express").Router();

    router.get("/", visitingPlace.findAll);
    router.post("/", visitingPlace.create);
    router.get("/:id", visitingPlace.findOne);

    app.use('/api/visitingPlace', router);
};