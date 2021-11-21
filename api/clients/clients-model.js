const db = require('../data/db-config.js');

const getClients = () => {
  return db('client');
};

const getClientBy = async (filter) => {
  return await db('client').where(filter).orderBy('id');
};

const getClientById = async (id) => {
  const client = await db('client').where({ id }).first();
  return client;
};

const createClient = async (client) => {
  const [id] = await db('client').insert(client, 'id');
  return getClientById(id);
};

const getAllClasses = async () => {
  // return await db('class');
  return await db('class').join('location', function () {
    this.on(function () {
      this.on('class.location_id', '=', 'location.id');
    });
  });
};

const getClassById = async (id) => {
  const queryClass = await db('class').where({ id }).first();
  return queryClass;
};

const getClassBy = (filter) => {
  return db('class').where(filter).orderBy('id');
};

const registerClass = async (client_id, class_id) => {
  return await db('registration').insert({ client_id, class_id });
};

const unregisterClass = async (client_id, class_id) => {
  return await db('registration')
    .where({ client_id })
    .where({ class_id })
    .del();
};

const getRegistrationClass = async (client_id, class_id) => {
  return await db('registration')
    .where({ client_id })
    .where({ class_id })
    .first();
};

const getRegisteredList = async (client_id) => {
  return await db('registration').where({ client_id });
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  getAllClasses,
  getClientBy,
  getClassById,
  getClassBy,
  unregisterClass,
  registerClass,
  getRegisteredList,
  getRegistrationClass,
};
