import { UserControllers } from './user.controller';
import { Router } from 'express';

const router = Router();

router.post('/', UserControllers.createUser);

router.get('/', UserControllers.getUsers);

router.get('/:userId', UserControllers.getUser);

router.delete("/:userId", UserControllers.deleteUser);

router.put("/:userId", UserControllers.updateUser);

router.put("/:userId/orders", UserControllers.createOrder);

router.get("/:userId/orders", UserControllers.getUserOrders);



export const UserRoutes = router;
