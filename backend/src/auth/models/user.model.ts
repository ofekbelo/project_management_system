import mongoose, { ObjectId, Schema, Document, Types } from 'mongoose'
import { UserRole, UserStatus } from '../types/user.types';

export interface IUser extends Document {
    email: string;
    password: string; // hashed
    firstName: string;
    lastName: string;
    role: UserRole | null; // null until approved by admin
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
    status: UserStatus;
    department: string | null; // assigned by admin
    reportingTo: ObjectId | null; // reference to manager/team lead
    profileImage?: string;
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function (p: string) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(p);
            },
            message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
        }
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: Object.values(UserStatus),
        default: UserStatus.PENDING_APPROVAL,
        required: true
    },
    department: {
        type: String,
        default: null,
        trim: true
    },
    reportingTo: {
        type: Types.ObjectId,
        ref: 'User',
        default: null
    },
    profileImage: {
        type: String,
        default: null,
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model<IUser>('Users', UserSchema);
