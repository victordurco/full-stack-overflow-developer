import connection from "../database";

import { Answer, Question } from '../controllers/questionController';

export interface QuestionDB {
    id: number;
    question: string;
    student_token: string;
    answered: boolean;
    submited_at: Date;
    tags: string;
}

export interface AnswerDB {
    id: number;
    answer: string;
    answered_at: Date;
    answered_by: string;
    question_id: number;
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

export async function getQuestionById(id: number): Promise<QuestionDB>{
    const result = await connection.query(`
        SELECT * FROM questions WHERE id = $1;
    `, [id]);

    const question: QuestionDB = result.rows[0];
    return question;
}

export async function updateQuestionToAnswered(id: number): Promise<QuestionDB>{
    const result = await connection.query(`
        UPDATE questions
        SET answered = $1
        WHERE id = $2
        RETURNING *;
    `, [true, id]);
    
    const updatedQuestion: QuestionDB = result.rows[0];
    return updatedQuestion;
}

export async function createAnswer(answer: Answer, token:string, id: number): Promise<AnswerDB> {
    const result = await connection.query(`
        INSERT INTO 
            answers (answer, answered_by, question_id) 
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [answer.answer, token, id]
    );
    const createdAnswer: AnswerDB = result.rows[0];

    return createdAnswer;
}

export async function getUnansweredQuestions(): Promise<QuestionDB[]>{
    const result = await connection.query(`
        SELECT
            questions.id, questions.question, users.name, users.class, questions.submited_at as "submitedAt"
        FROM questions 
        JOIN users ON users.token = questions.student_token
        WHERE answered = false
        LIMIT 1000;
    `);
    const questions: QuestionDB[] = result.rows;
    return questions;
}

export async function getUnansweredQuestion(id: number): Promise<QuestionDB>{
    const result = await connection.query(`
        SELECT
            questions.question, users.name, users.class, questions.tags, questions.answered,  questions.submited_at as "submitedAt"
        FROM questions 
        JOIN users ON users.token = questions.student_token
        WHERE questions.id = $1;
    `, [id]);
    const question: QuestionDB = result.rows[0];
    return question;
}

export async function getAnsweredQuestion(id: number): Promise<QuestionDB>{
    const result = await connection.query(`
        SELECT
            questions.question, 
            users.name, 
            users.class, 
            questions.tags, 
            questions.answered,  
            questions.submited_at as "submitedAt",
            answers.answered_at as "answeredAt",
            answers.answered_by as "answeredBy",
            answers.answer
        FROM questions 
        JOIN users ON users.token = questions.student_token
        JOIN answers ON answers.question_id = questions.id
        WHERE questions.id = $1;
    `, [id]);
    const question: QuestionDB = result.rows[0];
    return question;
}
