const Sequelize = require('sequelize');
let sequelize;

const db = {
  sequelize,
  Sequelize
};

const connection = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
};

sequelize = new Sequelize('' + connection.dialect + '://' + connection.username + ':' + connection.password + '@' + connection.host + ':' + connection.port + '/' + connection.database + '', {});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;