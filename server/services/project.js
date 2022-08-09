const Project = require("../models/Project");

const getProjects = async () => {
  try {
    const projects = await Project.find().exec();
    return projects;
  } catch (error) {
    return error;
  }
};

const getProject = async (id) => {
  try {
    const projects = await Project.findById(id).exec();
    return projects;
  } catch (error) {
    return error;
  }
};

const saveProject = async (body, options) => {
  const { isAuth, org } = options;
  if (!isAuth || !org) {
    return new Error("Unauthorized!");
  }

  const { name, description, status, clientId } = body;

  try {
    const project = await new Project({
      name,
      description,
      status,
      clientId,
      organizationId: org.id,
    }).save();
    return project;
  } catch (error) {
    return error;
  }
};

const modifyProject = async (body, options) => {
  const { isAuth, org } = options;
  if (!isAuth || !org) {
    return new Error("Unauthorized!");
  }

  const { id, status } = body;

  try {
    const isExist = await Project.findById(id).exec();
    if (!isExist || isExist.organizationId !== org.id) {
      return new Error("Project not found!");
    }

    const project = await Project.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
        },
      },
      {
        new: true,
      }
    ).exec();
    return project;
  } catch (error) {
    return error;
  }
};

const deleteProject = async (id, options) => {
  const { isAuth, org } = options;
  if (!isAuth || !org) {
    return new Error("Unauthorized!");
  }

  try {
    const project = await Project.findById(id).exec();
    if (project.organizationId !== org.id) {
      return new Error("Access denied!");
    }
    return await project.remove();
  } catch (error) {
    return error;
  }
};

module.exports = {
  getProjects,
  getProject,
  saveProject,
  modifyProject,
  deleteProject,
};
