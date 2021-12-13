import { Request, Response, NextFunction } from "express";

import * as userService from '../services/userService';

import { newUserSchema } from "../schemas/userSchema";
import { UserDB } from '../repositories/userRepository';

export interface User {
    name: string;
    class: string;
}

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
  const validation = newUserSchema.validate(req.body);

  if (validation.error) return res.sendStatus(400);


  try {
    const newUser: User = { 
      name: req.body.name, 
      class: req.body.class, 
    }

    const createdUser: UserDB = await userService.createUser(newUser);

    return res.status(200).send(createdUser.token);
        
  } catch (error: any) {
    if (error.name === 'InvalidUser') return res.status(400).send(error.message);
    next();
  }
}
