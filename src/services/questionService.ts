import * as questionRepository from '../repositories/questionRepository';
import * as userRepository from '../repositories/userRepository';

import { Question, Answer } from '../controllers/questionController';
import { QuestionDB, AnswerDB } from "../repositories/questionRepository";
import { UserDB } from '../repositories/userRepository';

import { NonExistentUser } from '../errors/user';
import {
    InvalidQuestion,
    InvalidAnswer,
    NonExistentQuestion,
    AlreadyAnsweredQuestion
} from '../errors/question';

export async function createQuestion(question: Question): Promise<QuestionDB> {
    const user: UserDB = await userRepository.getUserByNameAndClass(question.student, question.class);
 
    if (!user) throw new NonExistentUser();

    const createdQuestion: QuestionDB = await questionRepository.createQuestion(question, user.token);

    if (!createdQuestion)  throw new InvalidQuestion();

    return createdQuestion;
}

export async function createAnswer(answer: Answer, token: string, id: number): Promise<AnswerDB> {
    const user: UserDB = await userRepository.getUserByToken(token);
 
    if (!user) throw new NonExistentUser();

    const question: QuestionDB = await questionRepository.getQuestionById(id);

    if (!question) throw new NonExistentQuestion();

    if(question.answered) throw new AlreadyAnsweredQuestion();

    const createdAnswer: AnswerDB = await questionRepository.createAnswer(answer, token, id);

    if (!createdAnswer)  throw new InvalidAnswer();

    await questionRepository.updateQuestionToAnswered(id);

    return createdAnswer;
}

export async function getUnansweredQuestions(): Promise<QuestionDB[]>{
    const questions: QuestionDB[] = await questionRepository.getUnansweredQuestions();
    return questions;
}