import sequelize from './src/models/index.js';

export async function syncDatabase() {
	await sequelize.sync({ alter: true });
	console.log('Modelos sincronizados con la base de datos.');
}

try {
	await syncDatabase();
} catch (error) {
	console.error('Error al sincronizar los modelos:', error.message);
	process.exitCode = 1;
} finally {
	await sequelize.close();
}
