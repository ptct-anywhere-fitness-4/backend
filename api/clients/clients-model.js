const db = require('../data/db-config.js');

const getClients = () => {
  return db('client');
};

const getClientBy = (filter) => {
  return db('client').where(filter).orderBy('id');
};

const getClientById = async (id) => {
  const client = await db('client').where({ id }).first();
  return client;
};

const createClient = async (client) => {
  const [id] = await db('client').insert(client, 'id');
  return getClientById(id);
};

const getClassById = async (id) => {
  const queryClass = await db('class').where({ id }).first();
  return queryClass;
};

const getClassBy = (filter) => {
  return db('class').where(filter).orderBy('id');
};

const registerClass = (class_id) => {};

const unregisterClass = (class_id) => {};

const getRegisteredList = () => {};

module.exports = {
  getClients,
  getClientById,
  createClient,
  getClientBy,
  getClassById,
  getClassBy,
};
