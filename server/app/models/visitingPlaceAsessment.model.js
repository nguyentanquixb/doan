module.exports = (sequelize, DataTypes) => {
    const visitingPlaceAsessment = sequelize.define("visitingPlaceAsessment", {
        star: {
            type: DataTypes.STRING
        },
        comment: {
            type: DataTypes.STRING
        }  
    });

    return visitingPlaceAsessment;
};