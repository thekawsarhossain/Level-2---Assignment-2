import { IUser } from './user.interface';
import { User } from './user.model';

const createUserInDB = async (userData: IUser) => {
    const user = new User(userData);
    const savedUser = await user.save();
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { _id, password, orders, ...rest } = savedUser.toObject({ versionKey: false }) || {};
    return rest
};

const getUsersFromDB = async () => {
    const users = User.find().select({
        _id: 0,
        username: 1,
        'fullName.firstName': 1,
        'fullName.lastName': 1,
        age: 1,
        email: 1,
        'address.street': 1,
        'address.city': 1,
        'address.country': 1,

    });
    return users;
}

const getUserFromDB = async (userId: string) => {
    const user = await User.isUserExists(userId);
    if (user?.userId) return { success: true, user };
    else return { success: false, user: null }
}

const deleteUserFromDB = async (userId: string) => {
    const user = await User.isUserExists(userId);
    if (user?.userId) {
        const response = await User.deleteOne({ userId });
        if (response.deletedCount >= 1) return { success: true, isDeleted: true, result: response }
        else return { success: true, isDeleted: false, result: response }
    }
    else return { success: false, isDeleted: false }
}

const updateUserInDB = async (userId: string, updatedUserData: Partial<IUser>) => {
    const existingUser = await User.isUserExists(userId);
    if (existingUser?.userId) {
        const { username, fullName, age, email, address, hobbies } = updatedUserData || {};
        const response = await User.updateOne({ userId }, {
            $set: {
                username: username || existingUser.username,
                age: age || existingUser.age,
                email: email || existingUser.email,
                'fullName.firstName': fullName?.firstName || existingUser.fullName.firstName,
                'fullName.lastName': fullName?.lastName || existingUser.fullName.lastName,
                'address.street': address?.street || existingUser.address.street,
                'address.city': address?.city || existingUser.address.city,
                'address.country': address?.country || existingUser.address.country,
            },
            ...(hobbies && hobbies.length > 0
                ? {
                    $addToSet: {
                        hobbies: { $each: hobbies },
                    },
                }
                : {}),

        }, {
            new: true,
            runValidators: true,
            select: '-orders -password -__v -_id',
        });
        return { success: true, result: response }
    }
    else return { success: false }
}


export const UserServices = {
    createUserInDB,
    getUsersFromDB,
    getUserFromDB,
    deleteUserFromDB,
    updateUserInDB
};
