import { Router } from 'express';
import JWT from '../middlewares/jwt.middleware';
import Auth from '../controllers/auth.controller';

const router = Router();

router.post('/signin', Auth.Signin);
router.post('/login', Auth.Login);
router.get('/me', JWT.CheckJWT, Auth.Me);
router.post('/change-password', JWT.CheckJWT, Auth.ChangePassword);

export default router;