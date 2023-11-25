import express from 'express';
import cors from 'cors';
import { UserRoutes } from '../../../modules/user/user.route';

// Initializations
const app = express();
app.use(cors());

// Request parser
app.use(express.json());

// Routes
app.use('/api/users', UserRoutes);

export default app;
