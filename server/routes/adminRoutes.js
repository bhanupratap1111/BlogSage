import express from 'express';
import {adminLogin} from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);

// Add more admin routes as needed
export default adminRouter;