import { AuthorsController } from '@app/controllers/AuthorsController';
import { Router } from 'express';

const controller = new AuthorsController();

export const authorsRouter = Router();

authorsRouter.post('/authors', controller.store);
