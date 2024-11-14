import Users, { IUser } from "../models/user.model";
import { UserStatus } from "../types/user.types";

export class UserService {
    public async getAllUser(): Promise<IUser[]> {
        return await Users.find();
    }

    public async register(userData: Partial<IUser>): Promise<IUser> {
        const newUser = new Users(userData);
        return await newUser.save();
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        return await Users.findOne({ email: email })
    }

    public async getPendingApprovalUsers(): Promise<IUser[] | null> {
        return await Users.find({ status: UserStatus.PENDING_APPROVAL });
    }
}