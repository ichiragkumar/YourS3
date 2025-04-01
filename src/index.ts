import express, {Express, Request ,Response} from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
dotenv.config();
connectDB()

const app : Express = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());



app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!');
});



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});