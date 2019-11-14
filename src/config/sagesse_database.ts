import Sequelize from 'sequelize';

//export default db = new Sequelize(process.env.SAGESSE_DATABASE_URL!);
export const db = new Sequelize.Sequelize('postgres://'+process.env.SAGESSE_USER!+':'+process.env.SAGESSE_PASSWORD!+'@'+process.env.SAGESSE_HOST!+':'+process.env.SAGESSE_PORT!+'/'+process.env.SAGESSE_DATABASE_NAME!,{});
