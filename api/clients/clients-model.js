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

// joinClass
// unRegister
// getRegisteredClasses

/* 
MODELS WE NEED TO MAKE
Instructors
	- create a new class
	- update a class
	- delete a class
	- get their current classes
	- take their attendance
Client
	- join a class
	- un-register from a class
	- get all classes
	- get class by
		- id
		- filter
		- classes by registration status
		 - get all classes where 

Auth
	- create client
	- create instructor
*/

module.exports = {
  getClients,
  getClientById,
  createClient,
  getClientBy,
  getClassById,
  getClassBy,
};
