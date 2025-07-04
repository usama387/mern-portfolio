import { v2 as cloudinary } from "cloudinary";
import prisma from "../utils/prisma.js";

export const addProject = async (req, res) => {
  try {
    const { title, description, techStack, liveUrl, repoUrl } = req.body;

    // Accessing images from request files
    const images = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
      req.files?.image5?.[0],
    ].filter(Boolean);

    // Upload images to Cloudinary
    const imagesUrl = [];
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });
      imagesUrl.push(result.secure_url);
    }

    // Create project in database
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl: imagesUrl,
        techStack: JSON.parse(techStack),
        liveUrl: liveUrl || null,
        repoUrl: repoUrl || null,
      },
    });

    res.status(201).json({
      success: true,
      project: newProject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      messaage: "Internal server error while uploading project",
    });
  }
};

// controller to get all projects
export const getAllProjects = async (_, res) => {
  try {
    const projects = await prisma.project.findMany();

    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      messaage: "Internal server error while fetching projects",
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Project ID is required" });
    }

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      messaage: "Internal server error while fetching project",
    });
  }
};
