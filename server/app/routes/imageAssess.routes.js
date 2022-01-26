module.exports = app => {
    const imageAssess = require("../controllers/imageAssess.controller.js");

    var router = require("express").Router();
    router.post("/", imageAssess.create);
    router.get("/", imageAssess.findAll);
    router.post("/", imageAssess.create);

    app.use('/api/imageAssess', router);
};