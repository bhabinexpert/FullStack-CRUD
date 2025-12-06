import * as clientController from '../controllers/clientController.js';

import express from 'express';

const router = express.Router();
router.get('/clients', clientController.getClients);
router.post('/clients', clientController.addClients);
router.put('/clients/:id', clientController.updateClients);

export default router;