module.exports = (sequelize, DataTypes) => {
    const imageVisitingPlace = sequelize.define("imageVisitingPlace", {
        image: {
            type: DataTypes.STRING
        }   
    });

    return imageVisitingPlace;
};