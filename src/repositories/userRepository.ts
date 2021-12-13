import connection from "../database";

import { User } from '../controllers/userController';

export interface UserDB extends User  {
    token: string;
}

export async function createUser(user: User, token: string): Promise<UserDB> {
    const result = await connection.query(`
        INSERT INTO 
            users (name, class, token) 
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [user.name, user.class, token]
    );
    const createdUser: UserDB = result.rows[0];
    return createdUser;
}

export async function getUserByName(name: string): Promise<UserDB> {
    const result = await connection.query(`
        SELECT * FROM users WHERE name = $1;
    `, [name]);
    const user: UserDB = result.rows[0];
    return user;
}