const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const { ProjectType } = require("./types");
const Project = require("../models/Project");

const projectQuery = {
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
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
        organizationId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        console.log(args);
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
          organizationId: args.organizationId,
        });
        return project.save();
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const { id, name, description, status } = args;
        const project = Project.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              description,
              status,
            },
          },
          {
            new: true,
          }
        );
        return project;
      },
    },
    removeProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        const project = Project.findByIdAndRemove(args.id);
        return project;
      },
    },
  },
};

module.exports = {
  projectQuery,
  projectMutations,
};
