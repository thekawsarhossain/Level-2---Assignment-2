import { Schema, model } from 'mongoose';
import { IAddress, IName, IOrder, IUser, UserModel } from './user.interface';
import bcrypt from "bcrypt"
import config from '../../config';

const nameSchema = new Schema<IName>({
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
});

const addressSchema = new Schema<IAddress>({
    street: { type: String, required: [true, "Street field is required"] },
    city: { type: String, required: [true, "City field is required"] },
    country: { type: String, required: [true, "Country field is required"] },
});

const orderSchema = new Schema<IOrder>({
    productName: { type: String, required: [true, "Product name is required"] },
    price: { type: Number, required: [true, "Price field is required"] },
    quantity: { type: Number, required: [true, "Quantity field is required"] },
});

const userSchema = new Schema<IUser, UserModel>({
    userId: { type: Number, required: [true, "User id is required"], unique: true },
    username: { type: String, required: [true, "User name is required"], unique: true },
    password: { type: String, required: [true, "Password field is required"] },
    fullName: nameSchema,
    age: { type: Number, required: [true, "Age is required"] },
    email: { type: String, required: [true, "Email is required"] },
    isActive: { type: Boolean, required: true, default: true },
    hobbies: { type: [String], required: [true, "Hobbies are required"] },
    address: addressSchema,
    orders: { type: [orderSchema], default: [] },
}, { toJSON: { virtuals: true } });

// pre middleware | Hook for hashing the password 
userSchema.pre('save', async function (next) {
    const user = this as IUser;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next()
});

// Method to remove password field from response 
userSchema.methods.toJSON = function () {
    const userObj = this.toObject();
    delete userObj.password;
    return userObj;
}

// Static method to check user exists or not 
userSchema.statics.isUserExists = async function (userId: string) {
    return await User.findOne({ userId })
}

export const User = model<IUser, UserModel>('User', userSchema);
