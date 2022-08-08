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
      resolve(parent, args) {
        return getClients()
          .then((res) => res)
          .catch((err) => new Error(err.message));
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return getClient(args.id)
          .then((res) => res)
          .catch((err) => new Error(err.message));
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
      resolve(parent, args, options) {
        return saveClient(args, options)
          .then((res) => res)
          .catch((err) => new Error(err.message));
      },
    },
    removeClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args, options) {
        return removeClient(args.id, options)
          .then((res) => res)
          .catch((err) => new Error(err.message));
      },
    },
  },
};

module.exports = {
  clientQuery,
  clientMutations,
};
