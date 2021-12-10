import connection from "../database";
import { v4 as uuid } from "uuid";

interface User {
    name: string;
    class: string;
    token?: string;
}

export async function createUser(user: User): Promise<User> {
    const token = uuid();
    const result = await connection.query(`
        INSERT INTO 
            users (name, class, token) 
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [user.name, user.class, token]
    );
    const createdUser: User = result.rows[0];
    return createdUser;
}