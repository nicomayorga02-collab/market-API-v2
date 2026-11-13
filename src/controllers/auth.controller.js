import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export async function login(req, res) {
	const { email, password } = req.body ?? {};

	if (!email || !password) {
		return res.status(400).json({ message: 'email y password son obligatorios.' });
	}

	const user = await User.findOne({ where: { email } });
	if (!user || !(await user.comparePassword(password))) {
		return res.status(401).json({ message: 'Credenciales inválidas.' });
	}

	const secret = process.env.JWT_SECRET;
	if (!secret) {
		return res.status(500).json({ message: 'El servicio de autenticación no está configurado.' });
	}

	const userData = {
		id: user.id,
		fullname: user.fullname,
		email: user.email,
		phoneNumber: user.phoneNumber,
		address: user.address,
		isActive: user.isActive,
		gender: user.gender,
	};
	const token = jwt.sign(userData, secret, { expiresIn: '1h' });

	return res.status(200).json({
		message: 'Inicio de sesión exitoso.',
		data: { user: userData, token },
	});
}