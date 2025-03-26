import { Router } from "express";
import {  getAllUsers, 
          addUser } 
        from "../controllers/user.controller";

const router = Router();

router.get("/getAllUsers", getAllUsers);
router.post("/addUser", addUser);

export default router;