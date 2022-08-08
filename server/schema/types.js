const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const Client = require("../models/Client");
const Organization = require("../models/Organization");

const JWTResponseType = new GraphQLObjectType({
  name: "JWTResponse",
  fields: () => ({
    token: { type: GraphQLString },
    organization: { type: OrganizationType },
  }),
});

const OrganizationType = new GraphQLObjectType({
  name: "Organization",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    organization: {
      type: OrganizationType,
      resolve(parent, args) {
        return Organization.findById(parent.organizationId);
      },
    },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
    organization: {
      type: OrganizationType,
      resolve(parent, args) {
        return Organization.findById(parent.organizationId);
      },
    },
  }),
});

module.exports = {
  JWTResponseType,
  OrganizationType,
  ClientType,
  ProjectType,
};
