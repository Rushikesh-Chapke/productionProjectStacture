import {Router} from 'express'

import {register} from '../controllers/user.controller.js';
import { verifyJWTHandler } from '../middlewares/verify.userToken.js';

const router = Router();

router.route("/register").post(verifyJWTHandler, register)

export default router