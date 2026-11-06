import bcrypt from 'bcryptjs';
import { DataTypes, Model } from 'sequelize';

export default function initUserModel(sequelize) {
	class User extends Model {
		async comparePassword(password) {
			return bcrypt.compare(password, this.password);
		}
	}

	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			fullname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: { isEmail: true },
			},
			phoneNumber: {
				type: DataTypes.STRING,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING,
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			gender: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: 'User',
			tableName: 'users',
			timestamps: false,
			hooks: {
				beforeCreate: async (user) => {
					user.password = await bcrypt.hash(user.password, 10);
				},
				beforeUpdate: async (user) => {
					if (user.changed('password')) {
						user.password = await bcrypt.hash(user.password, 10);
					}
				},
			},
		},
	);

	return User;
}
