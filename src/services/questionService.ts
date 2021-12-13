import * as questionRepository from '../repositories/questionRepository';
import * as userRepository from '../repositories/userRepository';

import { Question } from '../controllers/questionController';
import { QuestionDB } from "../repositories/questionRepository";
import { UserDB } from '../repositories/userRepository';

import { NonExistentUser } from '../errors/user';
import { InvalidQuestion } from '../errors/question';

export async function createQuestion(question: Question): Promise<QuestionDB> {
    const user: UserDB = await userRepository.getUserByNameAndClass(question.student, question.class);
 
    if (!user) throw new NonExistentUser();

    const createdQuestion: QuestionDB = await questionRepository.createQuestion(question, user.token);

    if (!createdQuestion)  throw new InvalidQuestion();

    return createdQuestion;
}