import { Schema, model } from 'mongoose';
import { IGurdian, ILocalGurdian, IName, IStudent, StudentMethods, StudentModel } from './student.interface';
import validator from "validator";
import bcrypt from "bcrypt"
import config from '../../Express/Assignment/src/app/config';

const nameSchema = new Schema<IName>({
    firstName: {
        type: String,
        trim: true,
        required: [true, "First name is required"], // For Custom error message 
        maxLength: [20, "First Name can't be more than 20 characters"],
        validate: {
            validator: function (value: string) {  // Cuatom function to validate
                // Here 'value' will be firstname what ever we will send from client side
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return value === firstNameStr;
            },
            message: "{VALUE} is not in capitalize format"
        }
    },
    middleName: { type: String, trim: true, },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Last name is required"],
        validate: { // Validate using external function 
            validator: (value: string) => validator.isAlpha(value),
            message: "{VALUE} is not valid"
        }
    },
});

const gurdianSchema = new Schema<IGurdian>({
    fatherName: {
        type: String,
        required: true,
    },
    fatherOccupation: {
        type: String,
        required: true,
    },
    fatherContactNo: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    motherOccupation: {
        type: String,
        required: true,
    },
    motherContactNo: {
        type: String,
        required: true,
    },
});

const localGurdianSchema = new Schema<ILocalGurdian>({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const studentSchema = new Schema<IStudent, StudentModel, StudentMethods>({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: [true, "Password is required"], maxlength: [20, "Password can't be more than 20 characters"] },
    name: {
        type: nameSchema,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // It will also create indexing 
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: "{VALUE} is not a valid email"
        }
    },
    dateOfBirth: { type: String },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: "The gender field can only be one of the following: 'male', or 'female' "
        }, // Again for custom error message 
        required: true
    },
    contactNo: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    gurdian: {
        type: gurdianSchema,
        required: true
    },
    localGurdian: {
        type: localGurdianSchema,
        required: true
    },
    profileImage: { type: String },
    isActive: {
        type: String,
        enum: ['active', 'inActive'],
        default: "active"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { toJSON: { virtuals: true } });

// pre & post save middleware | Hook 
studentSchema.pre('save', async function (next) {
    // Hashing password
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next()
})

studentSchema.post('save', function (doc, next) {
    // After save the document can make the password field empty in response
    doc.password = "";
    next();
})

// Query hook 
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next();
})

studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next();
})

// Aggregate 
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    next();
});


// Virtual 
studentSchema.virtual('fullName').get(function () {
    return this.name.firstName + this.name.middleName + this.name.lastName
})

// Custom instance method | Incase im looking for static method its in readme file 
studentSchema.methods.isUserExists = async function (id: string) {
    return await Student.findOne({ id })
}

export const Student = model<IStudent, StudentModel>('Student', studentSchema);
