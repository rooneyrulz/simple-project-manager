const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const { getClient } = require("../services/client");
const { getOrganization } = require("../services/organization");

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
        return getOrganization(parent.organizationId)
          .then((res) => res)
          .catch((err) => new Error(err.message));
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
      async resolve(parent, args) {
        try {
          return await getClient(parent.clientId);
        } catch (err) {
          return new Error(err.message);
        }
      },
    },
    organization: {
      type: OrganizationType,
      async resolve(parent, args) {
        try {
          return await getOrganization(parent.organizationId);
        } catch (err) {
          return new Error(err.message);
        }
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
