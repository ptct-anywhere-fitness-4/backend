const db = require('../data/db-config.js');

const getClients = () => {
  return db('client');
};

const getClientBy = (filter) => {
  return db('client').where(filter).orderBy('id');
};

const getClientById = async (client_id) => {
  const client = await db('client').where({ client_id }).first();
  return client;
};

const createClient = async (client) => {
  const [client_id] = await db('client').insert(client);
  return getClientById(client_id);
};

const getClassById = async (class_id)=>{
    const queryClass = await db('class').where({class_id}).first()
    return queryClass
}

const getClassBy = (filter) => {
    return db('class').where(filter).orderBy('id');
  };


  const registerClass = (class_id) =>{

  }

  const unregisterClass = (class_id) =>{

  }

  const getRegisteredList = () =>{

  }

module.exports = {
  getClients,
  getClientById,
  createClient,
  getClientBy,
  getClassById,
  getClassBy,
};
