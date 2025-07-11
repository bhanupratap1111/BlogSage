import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import newsletterRouter from './routes/newsletterRoutes.js';

const app = express();

await connectDB();

//Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Blog API');
});
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);
app.use('/api/newsletter', newsletterRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;