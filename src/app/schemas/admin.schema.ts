import mongoose, { type Document, type ObjectId, model } from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema<IAdminSchema>(
    {
        adminID: {
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
        isSuperAdmin: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Admin = model<IAdminSchema>('Admin', adminSchema);

export default Admin;

export interface IAdminSchema extends Document {
    adminID: string;
    name: string;
    profilePictureUrl: string;
    profilePictureFileName: string;
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
    isActive: boolean;
    isSuperAdmin: boolean;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type AdminDataType = Document<
    unknown,
    Record<string, unknown>,
    IAdminSchema
> &
    Omit<
        IAdminSchema & {
            _id: ObjectId;
        },
        never
    >;
