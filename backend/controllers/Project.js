import Project from "../models/Project.js";
import User from "../models/User.js";


export const createProject = async (req, res, next) => {
    const userId = req.params.userid;
    const newProject = new Project(req.body);
  
    try {
      const savedProject = await newProject.save();
      try {
        await User.findByIdAndUpdate(userId, {
          $push: { projects: savedProject._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedProject);
    } catch (err) {
      next(err);
    }
};

export const updateProject = async (req, res, next) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json(updatedProject);

    } catch (err) {
        next(err);
    }
};

export const deleteProject = async (req, res, next) => {
    const userId = req.params.userid;
    try {
      await Project.findByIdAndDelete(req.params.id);
      try {
        await User.findByIdAndUpdate(userId, {
          $pull: { projects: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Project has been deleted.");
    } catch (err) {
      next(err);
    }
};

export const getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    } catch (err) {
        next(err);
    }
};

export const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        next(err);
    }
};

