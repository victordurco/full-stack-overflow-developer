import { v4 as uuid } from "uuid";
import * as userRepository from '../repositories/userRepository';

import { User } from '../controllers/userController';
import { UserDB } from "../repositories/userRepository";

import { InvalidUser } from '../errors/user';

export async function createUser(user: User): Promise<UserDB> {
    const token = uuid();

    const createdUser: UserDB = await userRepository.createUser(user, token);
  
    if (!createdUser)  throw new InvalidUser();

    return createdUser;
}
