const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { clientQuery, clientMutations } = require("./client");
const { projectQuery, projectMutations } = require("./project");

const query = new GraphQLObjectType({
  name: "query",
  fields: {
    ...clientQuery.fields,
    ...projectQuery.fields,
  },
});

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    ...clientMutations.fields,
    ...projectMutations.fields,
  },
});

module.exports = new GraphQLSchema({
  query,
  mutation,
});
