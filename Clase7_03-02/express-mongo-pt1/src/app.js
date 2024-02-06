import express from 'express';
import usersRoutes from './routes/users.routes.js';
import mongoose from 'mongoose';

const app = express();
const API_PREFIX = "api";
const PORT = 8080;
const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "mongoUserDB"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);

const conecction = mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
.then((conn) => {
    console.log('Connected to MongoDB', conn);
})
.catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(`/${API_PREFIX}/users`, usersRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});