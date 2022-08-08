const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { clientQuery, clientMutations } = require("./client");
const { projectQuery, projectMutations } = require("./project");
const { organizationQuery, organizationMutations } = require("./organization");

const query = new GraphQLObjectType({
  name: "query",
  fields: {
    ...clientQuery.fields,
    ...projectQuery.fields,
    ...organizationQuery.fields,
  },
});

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    ...clientMutations.fields,
    ...projectMutations.fields,
    ...organizationMutations.fields,
  },
});

module.exports = new GraphQLSchema({
  query,
  mutation,
});
