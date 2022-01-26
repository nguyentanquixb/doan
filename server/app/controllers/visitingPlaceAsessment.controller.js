
const db = require("../models");
const VisitingPlaceAsessment = db.visitingPlaceAsessment;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  
  const visitingPlaceAsessment = {
    star: req.body.star,
    comment: req.body.comment,
    userId: req.body.userId,
    visitingPlaceId: req.body.visitingPlaceId,
    
    
  };
  VisitingPlaceAsessment.create(visitingPlaceAsessment)
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
 
  const visitingPlaceId = req.query.visitingPlaceId;
  var condition = visitingPlaceId ? { visitingPlaceId: { [Op.like]: `${visitingPlaceId}` } } : null;
  // HotelAssessment.findAll({where: condition ,include: ["users"],include:["imageAssess"],include:["hotels"],})
  VisitingPlaceAsessment.findAll({where: condition ,include:["imageAssessVisitingPlace","visitingPlace","usersvisitingPlace"]})

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
 

  VisitingPlaceAsessment.findByPk({include: ["imageAssessVisitingPlace",] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};


