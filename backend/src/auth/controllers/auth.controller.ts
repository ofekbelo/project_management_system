import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from 'bcrypt'
import { UserStatus } from "../types/user.types";
import { validateEmail, validateName, validatePassword } from "../validations/authValidations";

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
            }

            const userExist = await this.userService.getUserByEmail(email);
            if (userExist) {
                res.status(409).json({ success: false, message: "This email is already exist. Plase make the registration with other email." })
            }

            if (!validatePassword(password)) {
                res.status(400).json({ success: false, message: "Your password is not valid. Please type valid password." });
            }

            if (!(await validateEmail(email))) {
                res.status(400).json({ success: false, message: "Your email is not valid." });
            }

            if (!validateName(firstName) || !validateName(lastName)) {
                res.status(400).json({ success: false, message: "Your firstname or lastname is not valid." });
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
            res.status(201).json({ success: true, userId: newUser._id, message: "SUCCESSS" })
        }
        catch {
            res.status(500).json({ success: false, message: "Server error. Please try again later." })
        }
    }

    public approveUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId, role, department, reportingTo } = req.body;

            if (!userId || !role || !department || !reportingTo) {
                res.status(400).json({ success: false, message: "One or more of the fields are empty." });
            }

            await this.userService.approveUserById(userId, role, department, reportingTo);
            res.status(201).json({ success: true, user: await this.userService.getUserById(userId), message: "SUCCESS" });
        }
        catch {
            res.status(500).json({ success: false, message: "Server error. Please try again later." });
        }
    }
}