const Sequelize = require('sequelize');
let sequelize;

const db = {
  sequelize,
  Sequelize
};



sequelize = new Sequelize(process.env.DATABASE_URL, {});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;