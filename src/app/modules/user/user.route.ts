import { UserControllers } from './user.controller';
import { Router } from 'express';

const router = Router();

router.post('/', UserControllers.createUser);

router.get('/', UserControllers.getUsers);

router.get('/:userId', UserControllers.getUser);

router.delete("/:userId", UserControllers.deleteUser);

router.put("/:userId", UserControllers.updateUser)

// router.put("/:userId/orders", UserControllers.) // Create new order
/*

router.get("/:userId/orders", UserControllers.) // get all orders by id

router.get("/:userId/orders/total-price", UserControllers.) // Calculate total 

 */

export const UserRoutes = router;
