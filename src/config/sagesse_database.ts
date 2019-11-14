import Sequelize from 'sequelize';

//export default db = new Sequelize(process.env.SAGESSE_DATABASE_URL!);
export const db = new Sequelize.Sequelize(process.env.SAGESSE_DATABASE_NAME!, process.env.SAGESSE_USER!, process.env.SAGESSE_PASSWORD!, {host: process.env.SAGESSE_HOST!, port: parseInt(process.env.SAGESSE_PORT!), dialect: 'postgres', native: true, quoteIdentifiers: true});
