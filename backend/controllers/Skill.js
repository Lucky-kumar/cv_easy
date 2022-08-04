import Skill from "../models/Skill.js";
import User from "../models/User.js";

export const createSkill = async (req, res, next) => {
    const userId = req.params.userid;
    const newSkill = new Skill(req.body);
  
    try {
      const savedSkill = await newSkill.save();
      try {
        await User.findByIdAndUpdate(userId, {
          $push: { skills: savedSkill._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedSkill);
    } catch (err) {
      next(err);
    }
};

export const updateSkill = async (req, res, next) => {
    try {
        const updateSkill = await Skill.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json(updateSkill);

    } catch (err) {
        next(err);
    }
};

export const deleteSkill = async (req, res, next) => {
    const userId = req.params.userid;
    try {
      await Skill.findByIdAndDelete(req.params.id);
      try {
        await User.findByIdAndUpdate(userId, {
          $pull: { skills: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Skill has been deleted.");
    } catch (err) {
      next(err);
    }
};

export const getSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id);
        res.status(200).json(skill);
    } catch (err) {
        next(err);
    }
};

export const getSkills = async (req, res, next) => {
    try {
        const skills = await Skill.find();
        res.status(200).json(skills);
    } catch (err) {
        next(err);
    }
};