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

export async function getUserByNameAndClass(name: string, studentClass: string): Promise<UserDB> {
    const result = await connection.query(`
        SELECT * FROM users WHERE name = $1 AND class = $2;
    `, [name, studentClass]);
    const user: UserDB = result.rows[0];
    return user;
}

export async function getUserByToken(token: string): Promise<UserDB> {
    const result = await connection.query(`
        SELECT * FROM users WHERE token = $1;
    `, [token]);
    const user: UserDB = result.rows[0];
    return user;
}