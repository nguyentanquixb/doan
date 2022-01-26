module.exports = app => {
    const imageAssessVisitingPlace = require("../controllers/imageAssessVisitingPlace.controller.js");

    var router = require("express").Router();

    router.get("/", imageAssessVisitingPlace.findAll);
    router.post("/", imageAssessVisitingPlace.create);


    app.use('/api/imageAssessVisitingPlace', router);
};