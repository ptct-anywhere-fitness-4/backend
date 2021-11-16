const db = require('../data/db-config.js');

const getInstructors = () => {
  return db('instructor');
};

const getInstructorBy = (filter) => {
  return db('instructor').where(filter).orderBy('id');
};

const getInstructorById = async (id) => {
  const instructor = await db('instructor').where({ id }).first();
  return instructor;
};

const createInstructor = async (instructor) => {
  const [id] = await db('instructor').insert(instructor, 'id');
  return getInstructorById(id);
};

const getClassById = async (id) => {
  const queryClass = await db('class').where({ id }).first();
  return queryClass;
};

const createClass = async (newClass) => {
  const [id] = await db('class').insert(newClass);
  return getClassById(id);
};

async function updateClass(id, changes) {
  await db('class').where({ id }).update(changes);
  return getClassById(id);
}

function removeClass(id) {
  return db('class').where({ id }).del();
}

const getSchedule = async (id) => {
  const schedule = await db('class').where({ id }).orderBy('date');
  return schedule;
};

//this might be broken

const getClassRoster = async (id) => {
  const rosterId = await db('registration').where({ id }).orderBy('id');
  const roster = await db('client').where(rosterId.id);
  return roster;
};

//this might be broken

const markPresent = async (client_id, class_id) => {
  return await db('registration')
    .where({ client_id })
    .where({ class_id })
    .update({ attendance: true });
};

//this might be broken

module.exports = {
  getInstructors,
  getInstructorById,
  createInstructor,
  getInstructorBy,
  getClassById,
  createClass,
  updateClass,
  removeClass,
  getSchedule,
  getClassRoster,
  markPresent,
};
