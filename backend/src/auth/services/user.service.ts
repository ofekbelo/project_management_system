import Users, { IUser } from "../models/user.model";
import { UserRole, UserStatus } from "../types/user.types";

export class UserService {
    public async getAllUser(): Promise<IUser[]> {
        return await Users.find();
    }

    public async register(userData: Partial<IUser>): Promise<IUser> {
        const newUser = new Users(userData);
        return await newUser.save();
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        return await Users.findOne({ email })
    }

    public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser | null> {
        return await Users.findOne({ email, password });
    }

    public async getUserById(userId: string): Promise<IUser | null> {
        return await Users.findOne({ _id: userId })
    }

    public async getPendingApprovalUsers(): Promise<IUser[] | null> {
        return await Users.find({ status: UserStatus.PENDING_APPROVAL });
    }

    public async approveUserById(userId: string, role: UserRole, department: string, reportingTo: string): Promise<void> {
        await Users.findByIdAndUpdate(userId, { role, department, reportingTo, status: UserStatus.ACTIVE });
    }
}