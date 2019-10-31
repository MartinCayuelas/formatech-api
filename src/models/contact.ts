const database = require('../config/database');
import Sequelize from 'sequelize';

//Define -> name of the table
const Contact = database.sequelize.define('Contact', {
  idContact: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.TEXT
  },
  email: {
    type: Sequelize.TEXT
  },
  position: {
    type: Sequelize.TEXT
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Contact;