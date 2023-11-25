import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from "bcrypt"
import config from '../../config';

const nameSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

const addressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});

const orderSchema = new Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const userSchema = new Schema({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: nameSchema,
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    hobbies: { type: [String], default: [] },
    address: addressSchema,
    orders: { type: [orderSchema], default: [] },
});

// pre & post middleware | Hook for hashing and removing password from response 
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next()
})

userSchema.post('save', function (doc, next) {
    doc.password = "";
    next();
})

export const User = model<IUser>('User', userSchema);
