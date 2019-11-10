import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export default new Sequelize.Sequelize(process.env.DATABASE_URL!, {});
