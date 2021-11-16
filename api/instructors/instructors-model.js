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

const getSchedule = async (instructor_id) => {
  const schedule = await db('class').where({ instructor_id }).orderBy('date');
  return schedule;
};

// FIND A SIMPLER WAY TO DO THIS
const getClassRoster = async (class_id) => {
  const rosterArray = await db('registration')
    .where({ class_id })
    .orderBy('client_id')
    .join('client', function () {
      this.on(function () {
        this.on('registration.client_id', '=', 'client.id');
      });
    });

  const testArray = [];
  for (let i = 0; i < rosterArray.length; i++) {
    testArray.push(rosterArray[i].username);
  }
  return testArray;
};

const markPresent = async (client_id, class_id) => {
  return await db('registration')
    .where({ client_id })
    .where({ class_id })
    .update({ attendance: true });
};

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
