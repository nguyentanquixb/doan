module.exports = (sequelize, DataTypes) => {
    const roomAmenities = sequelize.define("roomAmenities", {
        amenities: {
            type: DataTypes.STRING
        }
    });

    return roomAmenities;
};