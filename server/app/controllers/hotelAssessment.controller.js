
const db = require("../models");
const HotelAssessment = db.hotelAssessment;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  
  const hotelAssessment = {
    star: req.body.star,
    comment: req.body.comment,
    userId: req.body.userId,
    hotelId: req.body.hotelId,
    
    
  };
  HotelAssessment.create(hotelAssessment)
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
 
  const hotelId = req.query.hotelId;
  var condition = hotelId ? { hotelId: { [Op.like]: `${hotelId}` } } : null;
  // HotelAssessment.findAll({where: condition ,include: ["users"],include:["imageAssess"],include:["hotels"],})
  HotelAssessment.findAll({where: condition ,include:["imageAssess","hotels","users"]})

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
  const id = req.params.id;

  HotelAssessment.findByPk(id,{include: ["imageAssess",] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};


