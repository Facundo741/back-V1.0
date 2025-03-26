import { Request, Response } from "express";
import { getUsers, createUser } from "../models/user.model";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Error al obtener usuarios" });
  }
};

export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: "Name and email are required" });
    }
    const newUser = await createUser(name, email, password);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Error user no created" });
  }
};