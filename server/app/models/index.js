const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.hotel = require("./hotel.model")(sequelize, Sequelize);
db.hotelAmenities = require("./hotelAmenities.model")(sequelize, Sequelize);
db.hotelAssessment = require("./hotelAssessment.model.js")(sequelize, Sequelize);
db.imageAssess = require("./imageAssess.model")(sequelize, Sequelize);
db.kindOfRoom = require("./kindOfRoom.model")(sequelize, Sequelize);
db.roomAmenities = require("./roomAmenities.model")(sequelize, Sequelize);
db.hotelImage =require("./hotelImage.model")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
 db.visitingPlace = require("../models/visitingPlace.model")(sequelize, Sequelize);
 db.imageVisitingPlace = require("../models/imageVisitingPlace.model")(sequelize, Sequelize);
 db.imageAssessVisitingPlace = require("../models/imageAssessVisitingPlace.model")(sequelize, Sequelize);
 db.visitingPlaceAsessment = require("../models/visitingPlaceAsessment.model")(sequelize, Sequelize);



 db.visitingPlace.hasMany(db.imageVisitingPlace, { as: "imageVisitingPlace" });
db.imageVisitingPlace.belongsTo(db.visitingPlace, {
  foreignKey: "visitingPlaceId",
  as: "visitingPlaces",
});


db.user.hasMany(db.visitingPlaceAsessment, { as: "visitingPlaceAsessment" });
db.visitingPlaceAsessment.belongsTo(db.user, {
  foreignKey: "userId",
  as: "usersvisitingPlace",
});

db.visitingPlace.hasMany(db.visitingPlaceAsessment, { as: "visitingPlaceAsessment" });
db.imageVisitingPlace.belongsTo(db.visitingPlaceAsessment, {
  foreignKey: "visitingPlaceId",
  as: "visitingPlace",
});
db.visitingPlaceAsessment.hasMany(db.imageAssessVisitingPlace, { as: "imageAssessVisitingPlace" });
db.imageAssessVisitingPlace.belongsTo(db.visitingPlaceAsessment, {
  foreignKey: "visitingPlaceAsessmentId",
  as: "visitingPlaceAsessment",
});




db.hotel.hasMany(db.hotelAssessment, { as: "hotelAssessment" });
db.hotelAssessment.belongsTo(db.hotel, {
  foreignKey: "hotelId",
  as: "hotels",
});

db.hotel.hasMany(db.hotelAmenities, { as: "hotelamenities" });
db.hotelAmenities.belongsTo(db.hotel, {
  foreignKey: "hotelId",
  as: "hotels",
});

db.hotel.hasMany(db.kindOfRoom, { as: "kindofrooms" });
db.kindOfRoom.belongsTo(db.hotel, {
  foreignKey: "hotelId",
  as: "hotels",
});

db.hotel.hasMany(db.roomAmenities, { as: "roomamenities" });
db.roomAmenities.belongsTo(db.hotel, {
  foreignKey: "hotelId",
  as: "hotels",
});

db.hotelAssessment.hasMany(db.imageAssess, { as: "imageAssess" });
db.imageAssess.belongsTo(db.hotelAssessment, {
  foreignKey: "hotelAssessmentId",
  as: "hotelAssessment",
});

db.hotel.hasMany(db.hotelImage, { as: "hotelImage" });
db.hotelImage.belongsTo(db.hotel, {
  foreignKey: "hotelId",
  as: "hotels",
});

// db.user.hasOne(db.hotelAssessment, { foreignKey: 'fk_user', targetKey: 'id' });
db.user.hasMany(db.hotelAssessment, { as: "hotelAssessment" });
db.hotelAssessment.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users",
});

//login
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin"];

// mgmap

// db.gmaplat.belongsTo(db.hotel, { foreignKey: 'hotelId', targetKey: 'id' });
// db.hotel.hasOne(db.gmaplat, { foreignKey: 'hotelId', targetKey: 'id' });

// db.gmaplng.belongsTo(db.hotel, { foreignKey: 'hotelId', targetKey: 'id' });
// db.hotel.hasOne(db.gmaplng, { foreignKey: 'hotelId', targetKey: 'id' });

module.exports = db;
