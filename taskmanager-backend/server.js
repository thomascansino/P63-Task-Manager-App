const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

connectDb();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/tasks', require('./routes/taskRoutes'));

app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port:', port);
});

