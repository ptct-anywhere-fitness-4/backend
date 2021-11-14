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
  
// updateClass
// deleteClass
// getCreatedClasses (filter)
// takeAttendance

// getClassRegistration
// updateAttendanceBy (clientID)

module.exports = {
  getInstructors,
  getInstructorById,
  createInstructor,
  getInstructorBy,
  getClassById,
  createClass,
  updateClass,
  removeClass,
};
