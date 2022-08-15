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
      async resolve(parent, args, options) {
        try {
          return await getCurrentOrganization(options);
        } catch (err) {
          return new Error(err.message);
        }
      },
    },
    authenticateOrganization: {
      type: JWTResponseType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args, options) {
        try {
          return await loginToOrganization(args);
        } catch (err) {
          return new Error(err.message);
        }
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
      async resolve(parent, args) {
        try {
          return await saveOrganization(args);
        } catch (err) {
          return new Error(err.message);
        }
      },
    },
  },
};

module.exports = {
  organizationQuery,
  organizationMutations,
};
