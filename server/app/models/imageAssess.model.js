module.exports = (sequelize, DataTypes) => {
    const imageAssess = sequelize.define("imageAssess", {
  
    img: {
        type: DataTypes.STRING
      }
    });
    return imageAssess;
  };