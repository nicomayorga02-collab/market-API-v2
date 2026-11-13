import { User } from '../models/index.js';

export async function addUser(req, res) {
	const { fullname, email, phoneNumber, password, address, gender } = req.body ?? {};

	if (!fullname || !email || !password) {
		return res.status(400).json({
			message: 'fullname, email y password son obligatorios.',
		});
	}

	const user = await User.create({
		fullname,
		email,
		phoneNumber,
		password,
		address,
		gender,
	});

	const { password: _password, ...userData } = user.toJSON();
	return res.status(201).json({ message: 'Usuario creado exitosamente', data: userData });
}

export async function listUsers(req, res) {
	const users = await User.findAll({
		attributes: { exclude: ['password'] },
	});

	return res.status(200).json({
		message: 'Usuarios obtenidos exitosamente',
		data: users,
	});
}

export async function updateUser(req, res) {
	const id = Number(req.params.id);
	if (!Number.isInteger(id) || id <= 0) {
		return res.status(400).json({ message: 'El id debe ser un entero positivo.' });
	}

	const user = await User.findByPk(id);
	if (!user) {
		return res.status(404).json({ message: 'Usuario no encontrado.' });
	}

	const allowedFields = [
		'fullname',
		'email',
		'phoneNumber',
		'password',
		'address',
		'isActive',
		'gender',
	];
	const updates = Object.fromEntries(
		allowedFields
			.filter((field) => Object.hasOwn(req.body ?? {}, field))
			.map((field) => [field, req.body[field]]),
	);

	if (Object.keys(updates).length === 0) {
		return res.status(400).json({ message: 'Debe proporcionar al menos un campo para actualizar.' });
	}

	await user.update(updates);

	const { password: _password, ...userData } = user.toJSON();
	return res.status(200).json({
		message: 'Usuario actualizado exitosamente',
		data: userData,
	});
}

export async function deleteUser(req, res) {
	const id = Number(req.params.id);
	if (!Number.isInteger(id) || id <= 0) {
		return res.status(400).json({ message: 'El id debe ser un entero positivo.' });
	}

	const user = await User.findByPk(id);
	if (!user) {
		return res.status(404).json({ message: 'Usuario no encontrado.' });
	}

	await user.destroy();

	return res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
}