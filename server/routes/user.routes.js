import { Router } from 'express';

const router = Router();

import { registerUser, loginUser, updateUserProfile } from '../controllers/userController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', updateUserProfile);

export default router;
