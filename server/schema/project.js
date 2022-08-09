const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const {
  getProjects,
  getProject,
  saveProject,
  modifyProject,
  deleteProject,
} = require("../services/project");
const { ProjectType } = require("./types");

const projectQuery = {
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return getProjects()
          .then((res) => res)
          .catch((err) => new Error(err.message));
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return getProject(args.id)
          .then((res) => res)
          .catch((err) => new Error(err.message));
      },
    },
  },
};

const projectMutations = {
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLNonNull(GraphQLString) },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args, options) {
        return saveProject(args, options)
          .then((res) => res)
          .catch((err) => new Error(err.message));
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        status: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args, options) {
        return modifyProject(args, options)
          .then((res) => res)
          .catch((err) => new Error(err.message));
      },
    },
    removeProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args, options) {
        return deleteProject(args.id, options)
          .then((res) => res)
          .catch((err) => new Error(err.message));
      },
    },
  },
};

module.exports = {
  projectQuery,
  projectMutations,
};
