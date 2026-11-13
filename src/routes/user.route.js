import { Router } from 'express';
import {
	addUser,
	deleteUser,
	listUsers,
	updateUser,
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/', addUser);
userRouter.get('/', listUsers);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;