import connection from "../database";

import { Question } from '../controllers/questionController';

export interface QuestionDB {
    id: number;
    question: string;
    student_token: string;
    answered: boolean;
    submited_at: Date;
    tags: string;
}

export async function createQuestion(question: Question, token: string): Promise<QuestionDB> {
    const result = await connection.query(`
        INSERT INTO 
            questions (question, student_token, tags, answered) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
        [question.question, token, question.tags, false]
    );
    const createdQuestion: QuestionDB = result.rows[0];
    
    return createdQuestion;
}

