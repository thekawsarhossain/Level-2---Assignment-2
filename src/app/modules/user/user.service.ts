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


export const UserServices = {
    createUserInDB,
    getUsersFromDB,
    getUserFromDB
};
