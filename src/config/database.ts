import Sequelize from 'sequelize';

export default new Sequelize.Sequelize(process.env.DATABASE_URL!, {});
