import express from "express";
import { login, register,DeleteUser } from "../controllers/Auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/delete", DeleteUser)

export default router