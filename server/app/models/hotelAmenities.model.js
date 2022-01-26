module.exports = (sequelize, DataTypes) => {
    const hotelAmenities = sequelize.define("hotelAmenities", {
        amenities: {
            type: DataTypes.STRING
        }
    });

    return hotelAmenities;
};