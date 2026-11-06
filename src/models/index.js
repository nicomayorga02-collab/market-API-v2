import 'dotenv/config';
import { Sequelize } from 'sequelize';
import initUserModel from './user.model.js';

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT || 5432),
		dialect: process.env.DB_DIALECT || 'postgres',
		logging: false,
	},
);

export const User = initUserModel(sequelize);

export async function testConnection() {
	await sequelize.authenticate();
	console.log('Conexión a PostgreSQL establecida correctamente.');
}

export default sequelize;
