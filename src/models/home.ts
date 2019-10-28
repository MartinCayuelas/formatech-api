const database = require('../config/database');
import Sequelize from 'sequelize';

//Define -> name of the table
const Home = database.sequelize.define('Home', {
  idHome: {
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

module.exports = Home;