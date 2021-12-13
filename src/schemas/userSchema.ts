import joi from 'joi';

const newUserSchema = joi.object({
  name: joi.string().min(2).required(),
  class: joi.string().min(2).max(3).required()
});

export{ 
    newUserSchema
}