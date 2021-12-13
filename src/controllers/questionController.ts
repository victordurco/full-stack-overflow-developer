import { Request, Response, NextFunction } from "express";

import * as questionService from '../services/questionService';

import { newQuestionSchema } from "../schemas/questionSchema";
import { QuestionDB } from '../repositories/questionRepository';

export interface Question {
    question: string;
    student: string;
    class: string;
    tags: string;
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

    return res.status(200).send(createdQuestion.id);
        
  } catch (error: any) {
    if (error.name === 'NonExistentUser') return res.status(404).send(error.message);
    if (error.name === 'InvalidQuestion') return res.status(400).send(error.message);
    next();
  }
}