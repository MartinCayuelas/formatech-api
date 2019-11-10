import Sequelize from 'sequelize';

//export default db = new Sequelize(process.env.SAGESSE_DATABASE_URL!);
export default new Sequelize.Sequelize(process.env.SAGESSE_DATABASE_URL!, {});
