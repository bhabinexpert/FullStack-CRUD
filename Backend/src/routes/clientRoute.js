import * as clientController from '../controllers/clientController.js';
import express from 'express';


const router = express.Router();
router.get('/clients', clientController.getClients);
router.post('/clients', clientController.addClients);
router.put('/clients/:id', clientController.updateClients);
router.delete('/clients/:id', clientController.deleteClients);
router.get('/clients/search', clientController.searchClients);

export default router;