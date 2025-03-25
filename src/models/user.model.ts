import { Request, Response } from "express";
import pool from "../database";


export const getUsers = async ()=>{
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
}

export const createUser = async (userData: { name: string, email: string, password: string }) => {
  try {
    const { name, email, password } = userData;

    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }

    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
    const values = [name, email, password];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error: any) {
    if (error.code === "23505") {
      throw new Error("Email already exists.");
    }
    throw error;
  }
};

