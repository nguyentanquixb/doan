
const db = require("../models");
const ImageAssessVisitingPlace = db.imageAssessVisitingPlace;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.img) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const imageAssessVisitingPlace = {
        img: req.body.img,
        visitingPlaceAsessmentId: req.body.visitingPlaceAsessmentId,

    };
    ImageAssessVisitingPlace.create(imageAssessVisitingPlace)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.findAll = (req, res) => {
  
    ImageAssessVisitingPlace.findAll({ include: ["visitingPlaceAsessment"], })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
