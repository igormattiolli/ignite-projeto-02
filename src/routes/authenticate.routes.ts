// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticate = Router();

const authenticateUserController = new AuthenticateUserController();

authenticate.post("/sessions", authenticateUserController.handle);

export { authenticate };
