import express from "express";
import {
   createSkill,
   updateSkill,
   deleteSkill,
   getSkill,
   getSkills
} from "../controllers/Skill.js";

const router = express.Router();

//CREATE
router.post("/:userid", createSkill);

//UPDATE
router.put("/:id", updateSkill);

//DELETE
router.delete("/:id/:userid", deleteSkill);

//GET
router.get("/find/:id", getSkill);

//GET ALL
router.get("/", getSkills);

export default router;
