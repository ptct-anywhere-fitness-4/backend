const db = require('../data/db-config.js')

const getInstructors = () =>{
    return db('instructor')
}

const getInstructorBy = (filter)=>{
    return db('instructor').where(filter).orderBy('id')
}

const  getInstructorById = async (instructor_id) =>{
const instructor = await db('instructor').where({instructor_id}).first()
return instructor
}

const createInstructor = async (instructor) =>{
    const [instructor_id] = await db('instructor').insert(instructor)
    return getInstructorById(instructor_id)
}



module.exports = {
getInstructors,
getInstructorById,
createInstructor,
getInstructorBy,
}