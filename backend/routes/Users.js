import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUserSkills,
  getUserProjects

} from "../controllers/user.js";

const router = express.Router();

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", getUsers);

//GET ALL SKILLS OF USER
router.get("/skills/:id", getUserSkills);

//GET ALL PROJECTS OF USER
router.get("/projects/:id", getUserProjects);


export default router;
