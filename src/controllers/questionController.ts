import { Request, Response, NextFunction } from "express";

import * as questionService from '../services/questionService';

import { newQuestionSchema, newAnswerSchema } from "../schemas/questionSchema";
import { QuestionDB } from '../repositories/questionRepository';

export interface Question {
    question: string;
    student: string;
    class: string;
    tags: string;
}

export interface Answer {
  answer: string;
}

export async function createQuestion(req: Request, res: Response, next: NextFunction): Promise<any> { 
  const validation = newQuestionSchema.validate(req.body);

  if (validation.error) return res.sendStatus(400);


  try {
    const newQuestion: Question = { 
      question: req.body.question, 
      class: req.body.class, 
      student: req.body.student,
      tags: req.body.tags
    }

    const createdQuestion: QuestionDB = await questionService.createQuestion(newQuestion);

    return res.status(201).send({ id: createdQuestion.id });
        
  } catch (error: any) {
    if (error.name === 'NonExistentUser') return res.status(404).send(error.message);
    if (error.name === 'InvalidQuestion') return res.status(400).send(error.message);
    next();
  }
}

export async function createAnswer(req: Request, res: Response, next: NextFunction): Promise<any> {
  const { answer } = req.body;
  const { authorization } = req.headers;
  const questionId: number = Number(req.params.id);

  if (!authorization || authorization.indexOf('Bearer ') !== 0)
    return res.status(401).send('Envie um Bearer token válido');
  
  const token = authorization.replace('Bearer ', '');

  const validation = newAnswerSchema.validate(req.body);
  
  if (!token || validation.error || !questionId) return res.sendStatus(400);
  
   try {
    const newAnswer: Answer = { 
      answer, 
    }

    await questionService.createAnswer(newAnswer, token, questionId);

    return res.sendStatus(201);
        
  } catch (error: any) {
    if (error.name === 'NonExistentUser') return res.status(404).send(error.message);
    if (error.name === 'NonExistentQuestion') return res.status(404).send(error.message);
    if (error.name === 'AlreadyAnsweredQuestion') return res.status(400).send(error.message);
    if (error.name === 'InvalidAnswer') return res.status(400).send(error.message);
    next();
  }

}

export async function getUnansweredQuestions(req: Request, res: Response, next: NextFunction): Promise<any>{
  try { 
    const questions: QuestionDB[] = await questionService.getUnansweredQuestions();
    return res.status(200).send(questions);
  } catch (error: any) {
    next();
  }
}

export async function getQuestion(req: Request, res: Response, next: NextFunction): Promise<any>{
  const questionId: number = Number(req.params.id);
  if (!questionId) return res.sendStatus(400);

  try { 
    const question: QuestionDB = await questionService.getQuestion(questionId);
    return res.status(200).send(question);
  } catch (error: any) {
    if (error.name === 'NonExistentQuestion') return res.status(404).send(error.message);
    next();
  }
}