import { UserControllers } from './user.controller';
import { Router } from 'express';

const router = Router();

router.post('/', UserControllers.createUser);

router.get('/', UserControllers.getUsers);

router.get('/:userId', UserControllers.getUser);

// router.delete('/:userId', StudentControllers.deleteStudent);

export const UserRoutes = router;
