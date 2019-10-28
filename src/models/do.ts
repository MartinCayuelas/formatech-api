const database = require('../config/database');
import Sequelize from 'sequelize';

//Define -> name of the table
const Do = database.sequelize.define('Do', {
  idDo: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.TEXT
  },
  content: {
    type: Sequelize.TEXT
  },
  media: {
    type: Sequelize.TEXT
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Do;