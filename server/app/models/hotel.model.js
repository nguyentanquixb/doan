module.exports = (sequelize, DataTypes) => {
    const Hotel = sequelize.define("hotel", {
        name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.STRING
        },
        star: {
            type: DataTypes.STRING
        },
        introduce: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING
        },
        lat: {
            type: DataTypes.DOUBLE
        }  ,
        lng: {
            type: DataTypes.DOUBLE
        },   
        zoom: {
            type: DataTypes.DOUBLE
        },
        published: {
            type: DataTypes.BOOLEAN
          }

    });

    return Hotel;
};