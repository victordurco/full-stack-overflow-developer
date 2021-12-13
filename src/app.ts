import express, {Request, Response} from "express";
import cors from "cors";

import * as questionController from './controllers/questionController';
import * as userController from './controllers/userController';

import serverMiddlewareError from './middlewares/serverMiddlewareErro';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/status", (req: Request, res: Response) => {
    res.sendStatus(200);
});

app.post('/users', userController.createUser);

app.post('/questions', questionController.createQuestion);

app.post('/questions/:id', questionController.createAnswer);

app.get('/questions', questionController.getUnansweredQuestions);

app.use(serverMiddlewareError);

export default app;
