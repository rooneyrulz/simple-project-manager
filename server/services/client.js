const Client = require("../models/Client");

const getClients = async () => {
  try {
    const clients = await Client.find().exec();
    return clients;
  } catch (error) {
    return error;
  }
};

const getClient = async (id) => {
  try {
    const client = await Client.findById(id).exec();
    return client;
  } catch (error) {
    return error;
  }
};

const saveClient = async (body, options) => {
  const { isAuth, org } = options;
  if (!isAuth || !org) {
    return new Error("Unauthorized!");
  }

  const { name, email, phone } = body;

  try {
    const client = await new Client({
      name,
      email,
      phone,
      organizationId: org.id,
    }).save();
    return client;
  } catch (error) {
    return error;
  }
};

const removeClient = async (id, options) => {
  const { isAuth, org } = options;
  if (!isAuth || !org) {
    return new Error("Unauthorized!");
  }

  try {
    const client = await Client.findById(id).exec();
    if (!client || client?.organizationId !== org.id) {
      return new Error("Client not found!");
    }
    return await client.remove();
  } catch (error) {
    return error;
  }
};

module.exports = {
  getClients,
  getClient,
  saveClient,
  removeClient,
};
