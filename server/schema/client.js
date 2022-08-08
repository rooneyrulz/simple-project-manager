const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const { ClientType } = require("./types");
const Client = require("../models/Client");

const clientQuery = {
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
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
        organizationId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
          organizationId: args.organizationId
        });
        return client.save();
      },
    },
    removeClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        const client = Client.findByIdAndRemove(args.id);
        return client;
      },
    },
  },
};

module.exports = {
  clientQuery,
  clientMutations,
};
