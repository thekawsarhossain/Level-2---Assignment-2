import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;

        const zodParsedData = userValidationSchema.parse(userData); // Validation using Zod

        const response = await UserServices.createUserInDB(zodParsedData); // Calling service function

        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: response,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: (err as { message: string })?.message || 'Failed to create user',
            error: err,
        });
    }
};

const getUsers = async (_req: Request, res: Response) => {
    try {
        const response = await UserServices.getUsersFromDB(); // Calling service function

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: response,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: err,
        });
    }
};

const getUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params || {};

        const response = await UserServices.getUserFromDB(userId); // Calling service function

        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: response,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve student',
            error: err,
        });
    }
};

export const UserControllers = {
    createUser,
    getUsers,
    getUser
};
