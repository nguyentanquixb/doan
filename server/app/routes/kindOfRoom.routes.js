module.exports = app => {
    const kindOfRoom = require("../controllers/kindOfRoom.controller");

    var router = require("express").Router();

    router.get("/", kindOfRoom.findAll);
    router.post("/", kindOfRoom.create);

    app.use('/api/kindOfRoom', router);
};