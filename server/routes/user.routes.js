import { Router } from 'express';

const router = Router();

import { registerUser, loginUser, updateUserProfile, updateName, updateAbout, updateLocation } from '../controllers/userController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/name', updateName);
router.post("/about", updateAbout);
router.post("/location", updateLocation);

router.put('/:id', updateUserProfile);


export default router;
