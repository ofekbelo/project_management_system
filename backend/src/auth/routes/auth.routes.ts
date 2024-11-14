import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/register', authController.register);
authRouter.post('/approve-user', authController.approveUser);

export default authRouter;