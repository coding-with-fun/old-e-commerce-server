import mongoose, { model, type Document, type ObjectId } from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema<ICustomerSchema>(
    {
        customerID: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        profilePictureUrl: {
            type: String,
        },
        profilePictureFileName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        newEmail: {
            type: String,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerifiedAt: {
            type: Date,
        },
        contactNumber: {
            type: String,
            required: true,
            unique: true,
        },
        newContactNumber: {
            type: String,
        },
        contactNumberVerificationToken: {
            type: String,
        },
        contactNumberVerificationTokenSentAt: {
            type: Date,
        },
        password: {
            type: String,
            required: true,
        },
        passwordVerificationToken: {
            type: String,
        },
        loginOtp: {
            type: String,
        },
        loginOtpSentAt: {
            type: Date,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        deletedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Customer = model<ICustomerSchema>('Customer', customerSchema);

export default Customer;

export interface ICustomerSchema extends Document {
    customerID: string;
    name: string;
    profilePictureUrl?: string;
    profilePictureFileName?: string;
    email: string;
    newEmail?: string;
    emailVerificationToken?: string;
    emailVerifiedAt?: Date;
    contactNumber: string;
    newContactNumber?: string;
    contactNumberVerificationToken?: string;
    contactNumberVerificationTokenSentAt?: Date;
    password: string;
    passwordVerificationToken?: string;
    loginOtp?: string;
    loginOtpSentAt?: Date;
    address?: string;
    isActive: boolean;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type AdminDataType = Document<
    unknown,
    Record<string, unknown>,
    ICustomerSchema
> &
    Omit<
        ICustomerSchema & {
            _id: ObjectId;
        },
        never
    >;
