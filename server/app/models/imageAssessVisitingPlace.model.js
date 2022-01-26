module.exports = (sequelize, DataTypes) => {
    const imageAssessVisitingPlace = sequelize.define("imageAssessVisitingPlace", {
        img: {
            type: DataTypes.STRING
        },
      
    });

    return imageAssessVisitingPlace;
};