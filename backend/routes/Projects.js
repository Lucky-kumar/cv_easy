import express from "express";
import {
    createProject,
    deleteProject,
    updateProject,
    getProjects,
    getProject,
} from "../controllers/Project.js";

const router = express.Router();

//CREATE
router.post("/:userid", createProject);

//UPDATE
router.put("/:id", updateProject);

//DELETE
router.delete("/:id/:userid", deleteProject);

//GET
router.get("/find/:id", getProject);

//GET ALL
router.get("/", getProjects);

export default router;
