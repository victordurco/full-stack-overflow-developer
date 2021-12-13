import express, {Request, Response} from "express";
import cors from "cors";

import serverMiddlewareError from './middlewares/serverMiddlewareErro';
import * as userController from './controllers/userController';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/status", (req: Request, res: Response) => {
    res.sendStatus(200);
});

app.post('/users', userController.createUser);

app.use(serverMiddlewareError);

export default app;
