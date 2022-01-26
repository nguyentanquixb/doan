module.exports = app => {
    const imageVisitingPlace = require("../controllers/imageVisitingPlace.controller");

    var router = require("express").Router();

    router.get("/", imageVisitingPlace.findAll);
    router.post("/", imageVisitingPlace.create);
    router.get("/:id", imageVisitingPlace.findOne);

    app.use('/api/imageVisitingPlace', router);
};