import { DataTypes, Model } from 'sequelize';

export default function initRoleModel(sequelize) {
	class Role extends Model {}

	Role.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			sequelize,
			modelName: 'Role',
			tableName: 'roles',
			timestamps: false,
		},
	);

	return Role;
}
