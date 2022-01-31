const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Astronaut = sequelize.define('Astronaut', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 100]
        }
    },
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['COMMANDER', 'PILOT']
    }
});

module.exports = Astronaut;