import { IUser } from "../models/user.model";
import { UserRole } from "./user.types";

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface RegisterResponse {
    success: boolean;
    userId?: string;
    message: string;
}

export interface UserApprovalRequest {
    userId: string;
    role: UserRole;
    reportingTo: string;
    notes?: string
}

export interface UserApprovalResponse {
    success: boolean;
    user?: Omit<IUser, "password">;
    message: string;
}