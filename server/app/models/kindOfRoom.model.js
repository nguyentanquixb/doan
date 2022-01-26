module.exports = (sequelize, DataTypes) => {
    const kindOfRoom = sequelize.define("kindOfRoom", {
        amenities: {
            type: DataTypes.STRING
        }
    });

    return kindOfRoom;
};