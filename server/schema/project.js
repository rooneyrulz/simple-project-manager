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
      async resolve(parent, args) {
        try {
          return await getProjects();
        } catch (err) {
          return new Error(err.message);
        }
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          return await getProject(args.id);
        } catch (err) {
          return new Error(err.message);
        }
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
      async resolve(parent, args, options) {
        try {
          return await saveProject(args, options);
        } catch (err) {
          return new Error(err.message);
        }
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        status: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args, options) {
        try {
          return await modifyProject(args, options);
        } catch (err) {
          return new Error(err.message);
        }
      },
    },
    removeProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args, options) {
        try {
          return await deleteProject(args.id, options);
        } catch (err) {
          return new Error(err.message);
        }
      },
    },
  },
};

module.exports = {
  projectQuery,
  projectMutations,
};
