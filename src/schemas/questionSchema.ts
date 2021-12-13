import joi from 'joi';

const newQuestionSchema = joi.object({
  question: joi.string().min(2).required(),
  class: joi.string().min(2).max(3).required(),
  student: joi.string().min(2).required(),
  tags: joi.string(),
});

const newAnswerSchema = joi.object({
  answer: joi.string().min(2).required(),
});

export{ 
  newQuestionSchema,
  newAnswerSchema
}