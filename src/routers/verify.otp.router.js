import {Router} from 'express';
const router = Router();

import { verifyEmail } from '../middlewares/verify.otp.email.js';

router.route('/otp', verifyEmail).post(verifyEmail)


export default router