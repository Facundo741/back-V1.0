import { Request, Response } from "express";
import { getUsers, createUser } from "../models/user.model";

export const getAllUsers = async (req: Request, res: Response)=> {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error});
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json({ user: newUser });
  } catch (error: unknown) { 
    if (error instanceof Error) {  
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Something went wrong." });
    }
  }
};