const { GraphQLString, GraphQLNonNull } = require("graphql");
const { OrganizationType, JWTResponseType } = require("./types");
const {
  saveOrganization,
  loginToOrganization,
  getCurrentOrganization,
} = require("../services/organization");

const organizationQuery = {
  fields: {
    currentOrganization: {
      type: OrganizationType,
      resolve(parent, args, options) {
        return getCurrentOrganization(options)
          .then((res) => res)
          .catch((err) => new Error(err.message));
      },
    },
    authenticateOrganization: {
      type: JWTResponseType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args, options) {
        return loginToOrganization(args)
          .then((res) => res)
          .catch((err) => new Error(err.message));
      },
    },
  },
};

const organizationMutations = {
  fields: {
    addOrganization: {
      type: JWTResponseType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return saveOrganization(args)
          .then((res) => res)
          .catch((err) => new Error(err.message));
      },
    },
  },
};

module.exports = {
  organizationQuery,
  organizationMutations,
};
