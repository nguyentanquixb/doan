const db = require("../models");
const ImageVisitingPlace = db.imageVisitingPlace;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
 
    const imageVisitingPlace = {
        img: req.body.img,
        visitingPlaceId: req.body.visitingPlaceId,

    };
    ImageVisitingPlace.create(imageVisitingPlace)
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
 

    ImageVisitingPlace.findAll({ })
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

exports.findOne = (req, res) => {
    const visitingPlaceId = req.params.id;
  
    ImageVisitingPlace.findByPk(visitingPlaceId)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };