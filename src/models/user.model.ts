import pool from "../database";
import { QueryResult } from "pg";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const getUsers = async (): Promise<unknown[]> => {
  try {
    const response: QueryResult = await pool.query("SELECT * FROM users");
    return response.rows;
  } catch (error) {
    throw new Error("Error fetching users: " + error);
  }
};

export const createUser = async (name: string, email: string, password: string): Promise<User> => {
  try {
    const response: QueryResult<User> = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    return response.rows[0];
  } catch (error) {
    throw new Error("Error creating user: " + error);
  }
};
