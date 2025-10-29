import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import postRoutes from './src/routes/post.routes.js';

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts',postRoutes);

app.get('/', (req, res) => {
    res.send('ConnectSphere API is running...');
});

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
