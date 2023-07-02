import { Router } from 'express';

const router = Router();

import { createTrip, getTrip, updateTrip, deleteTrip } from '../controllers/tripController.js';

router.post('/create', createTrip);
router.get('/all-trip/:id', getTrip);
router.put('/update/:id', updateTrip);
router.delete('/delete/:id', deleteTrip);

export default router;
