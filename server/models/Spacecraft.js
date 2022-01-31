const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Spacecraft = sequelize.define('Spacecraft', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        }
    },
    maximumSpeed: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1000
        }
    },
    mass: {
        type: DataTypes.INTEGER,
        validate: {
            min: 200
        }
    }
});

module.exports = Spacecraft;