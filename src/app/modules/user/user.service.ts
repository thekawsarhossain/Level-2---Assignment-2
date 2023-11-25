import { IUser } from './user.interface';
import { User } from './user.model';

const createUserInDB = async (userData: IUser) => {
    const user = new User(userData);
    return await user.save();
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
    const users = User.findOne({ userId }).select({
        _id: 0,
        password: 0,
    });
    return users;
}


export const UserServices = {
    createUserInDB,
    getUsersFromDB,
    getUserFromDB
};
