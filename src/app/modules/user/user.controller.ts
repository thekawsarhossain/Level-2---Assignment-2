import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;

        const zodParsedData = userValidationSchema.safeParse(userData); // Validation using Zod

        if (zodParsedData.success) {
            const response = await UserServices.createUserInDB(zodParsedData.data); // Calling service function
            res.status(200).json({
                success: true,
                message: 'User created successfully!',
                data: response,
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'User creation failed!',
                error: zodParsedData.error.errors,
            });
        }

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
            message: (err as { message: string })?.message || 'Failed to fetch users',
            error: err,
        });
    }
};

const getUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params || {};

        const response = await UserServices.getUserFromDB(userId); // Calling service function

        if (response.success) {
            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: response.user,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found!",
                "error": {
                    "code": 404,
                    "description": "User not found!"
                }
            });
        }

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
