import express from "express";
import isUserAuthenticated from "../middleware/isUserAuthenticated.js";
import upload from "../middleware/multer.js";
import { addProject, getAllProjects } from "../controllers/project.controller.js";

const projectRouter = express.Router();

projectRouter.post(
  "/add",
  isUserAuthenticated,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  addProject
);
projectRouter.get("/getAllProjects", getAllProjects)

export default projectRouter;
