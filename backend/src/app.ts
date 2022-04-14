import express from 'express';
import { authorsRouter } from './routes/authors';

const app = express();

app.use(express.json());
app.use(authorsRouter);

export default app;
