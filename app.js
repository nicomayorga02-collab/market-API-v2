import 'dotenv/config';
import express from 'express';
import authRouter from './src/routes/auth.route.js';
import userRouter from './src/routes/user.route.js';

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());

app.get('/test', (req, res) => {
	res.status(200).json({ message: 'API funcionando' });
});

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
	console.log(`API escuchando en el puerto ${port}`);
});
