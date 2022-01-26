module.exports = (sequelize, DataTypes) => {
    const hotelImage = sequelize.define("hotelImage", {
  
      previewImage: {
        type: DataTypes.STRING
      },
      thumbnailImage: {
        type: DataTypes.STRING
      },
      alt: {
        type: DataTypes.STRING
      }
    });
    return hotelImage;
  };