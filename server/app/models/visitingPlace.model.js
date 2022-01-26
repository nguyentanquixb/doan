module.exports = (sequelize, DataTypes) => {
    const visitingPlace = sequelize.define("visitingPlace", {
        name: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
    });

    return visitingPlace;
};