import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from 'bcrypt'
import { UserStatus } from "../types/user.types";

export class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public register = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password, firstName, lastName } = req.body;

            if (!email || !password || !firstName || !lastName) {
                res.status(400).json({ suceess: false, message: "One or more of the fields are empty." })
                return;
            }

            const userExist = await this.userService.getUserByEmail(email);
            if (userExist) {
                res.status(409).json({ success: false, message: "This email is already exist. Plase make the registration with other email." })
            }

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await this.userService.register({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: null,
                status: UserStatus.PENDING_APPROVAL
            });
            res.status(201).json({ isSuccess: true, userId: newUser._id, message: "SUCCESSS" })
        }
        catch {

        }
    }
}