import { Request, Response } from 'express';
import { orderValidationSchema, partialUserValidationSchema, userValidationSchema } from './user.validation';
import { UserServices } from './user.service';

// Creating new user 
const createUser = async (req: Request, res: Response) => {
    try {
        const zodParsedData = userValidationSchema.parse(req.body); // Validation using Zod

        const response = await UserServices.createUserInDB(zodParsedData); // Calling service function
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: response,
        });
    } catch (err) {
        if ((err as { name: string })?.name?.includes("ZodError")) {
            res.status(422).json({
                success: false,
                message: 'Failed to create user due to validation errors',
                error: {
                    code: 422,
                    description: (err as { errors: unknown })?.errors
                },
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to create user',
                error: {
                    code: 500,
                    description: (err as { message: string })?.message
                },
            });
        }
    }
};

// Get all users 
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
            error: {
                code: 500,
                description: (err as { message: string })?.message
            },
        });
    }
};

// Get single user by User id
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
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user',
            error: {
                code: 500,
                description: (err as { message: string })?.message
            },
        });
    }
};

// Delete single user by user id 
const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params || {};

        const response = await UserServices.deleteUserFromDB(userId); // Calling service function

        if (response.success && response.isDeleted) {
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: null
            });
        }
        else if (response.success && !response.isDeleted) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete user',
                error: {
                    code: 500,
                    description: null
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found!",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: {
                code: 500,
                description: (err as { message: string })?.message
            },
        });
    }
};

// User user by user id 
const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params || {};

        const zodParsedData = partialUserValidationSchema.parse(req.body); // Validation using Zod

        const response = await UserServices.updateUserInDB(userId, zodParsedData); // Calling service function
        if (response.success) {
            res.status(200).json({
                success: true,
                message: 'User updated successfully!',
                data: response?.user
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "User not found!",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
    } catch (err) {
        if ((err as { name: string })?.name?.includes("ZodError")) {
            res.status(422).json({
                success: false,
                message: 'Failed to update user due to validation errors',
                error: {
                    code: 422,
                    description: (err as { errors: unknown })?.errors
                },
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to update user',
                error: {
                    code: 500,
                    description: (err as { message: string })?.message
                },
            });
        }
    }
};

// Create a new order and push to user document 
const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const zodParsedData = orderValidationSchema.parse(req.body);

        const response = await UserServices.createNewOrderForUser(userId, zodParsedData);

        if (response.success) {
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Failed to create Order",
                error: {
                    code: 404,
                    description: "User not found, Failed to create Order!"
                }
            });
        }
    } catch (err) {
        if ((err as { name: string })?.name?.includes("ZodError")) {
            res.status(422).json({
                success: false,
                message: 'Failed to create order due to validation errors',
                error: {
                    code: 422,
                    description: (err as { errors: unknown })?.errors
                },
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to create order',
                error: {
                    code: 500,
                    description: (err as { message: string })?.message
                },
            });
        }
    }
}

// Get all orders for a specific user by user id 
const getUserOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const response = await UserServices.getUserOrdersFormDB(userId);

        if (response.success) {
            res.status(200).json({
                success: true,
                message: 'Order fetched successfully!',
                data: response.order,
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "Failed to fetch orders",
                error: {
                    code: 404,
                    description: "User not found, Failed to fetch orders!"
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user orders',
            error: {
                code: 500,
                description: (err as { message: string })?.message
            },
        });
    }
}

// Calculate user total ordered price and return 
const calculateAndGetUserTotalOrderPrice = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const response = await UserServices.calculateTotalOrderedPriceFromDB(userId);

        if (response.success) {
            res.status(200).json({
                success: true,
                message: 'Total price calculated successfully!',
                data: response.data,
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "Failed to calculate total price",
                error: {
                    code: 404,
                    description: "User not found, Failed to calculate total price!"
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to calculate total price',
            error: {
                code: 500,
                description: (err as { message: string })?.message
            },
        });
    }
}

export const UserControllers = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    createOrder,
    getUserOrders,
    calculateAndGetUserTotalOrderPrice
};
