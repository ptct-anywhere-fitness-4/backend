const db = require('../data/db-config.js');

const getInstructors = () => {
  return db('instructor');
};

const getInstructorBy = (filter) => {
  return db('instructor').where(filter).orderBy('id');
};

const getInstructorById = async (instructor_id) => {
  const instructor = await db('instructor').where({ instructor_id }).first();
  return instructor;
};

const createInstructor = async (instructor) => {
  const [instructor_id] = await db('instructor').insert(instructor);
  return getInstructorById(instructor_id);
};

const getClassById = async (class_id)=>{
    const queryClass = await db('class').where({class_id}).first()
    return queryClass
}

const createClass = async (newClass) =>{
    const [class_id] = await db('class').insert(newClass)
    return getClassById(class_id)
}


async function updateClass(id, changes) {
    await db("class").where({ id }).update(changes);
    return getClassById(id);
  }
  
  function removeClass(id) {
    return db("class").where({ id }).del();
  }

const getSchedule = async (instructor_id) =>{
const schedule = await db('class').where('instructor_id', instructor_id).orderBy('class_date')
return schedule
}

//this might be broken

const getClassRoster = async (class_id)=>{
const rosterId = await db('registration').where('class_id', class_id).orderBy('client_id')
const roster = await db('client').where(rosterId.client_id)
return roster
}

//this might be broken

const markPresent = async (client_id, class_id) =>{
return await db('registration').where('client_id',client_id).where('class_id', class_id).update({attendance: true})
}

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
