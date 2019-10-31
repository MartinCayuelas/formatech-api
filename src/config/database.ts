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

const dbUrl = '' + connection.dialect + '://' + connection.username + ':' + connection.password + '@' + connection.host + ':' + connection.port + '/' + connection.database + '';

sequelize = new Sequelize(dbUrl || process.env.DATABASE_URL, {});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;