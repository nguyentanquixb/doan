module.exports = (sequelize, DataTypes) => {
    const hotelAssessment = sequelize.define("hotelAssessment", {
        star: {
            type: DataTypes.STRING
        },
        comment: {
            type: DataTypes.STRING
        }  
    });

    return hotelAssessment;
};