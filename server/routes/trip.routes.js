import { Router } from 'express';

const router = Router();

import { createTrip, getTrip, updateTrip, deleteTrip } from '../controllers/tripController.js';

router.post('/trips', createTrip);
router.get('/trips/:id', getTrip);
router.put('/trips/:id', updateTrip);
router.delete('/trips/:id', deleteTrip);

export default router;
