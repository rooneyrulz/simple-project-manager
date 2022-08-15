const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const {
  getClients,
  getClient,
  saveClient,
  removeClient,
} = require("../services/client");
const { ClientType } = require("./types");

const clientQuery = {
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      async resolve(parent, args) {
        try {
          return await getClients();
        } catch (err) {
          return new Error(err.message);
        }
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          return await getClient(args.id);
        } catch (err) {
          return new Error(err.message);
        }
      },
    },
  },
};

const clientMutations = {
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args, options) {
        try {
          return await saveClient(args, options);
        } catch (err) {
          return new Error(err.message);
        }
      },
    },
    removeClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args, options) {
        try {
          return await removeClient(args.id, options);
        } catch (err) {
          return new Error(err.message);
        }
      },
    },
  },
};

module.exports = {
  clientQuery,
  clientMutations,
};
