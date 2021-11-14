exports.seed = function (knex) {
  return knex('instructor').insert([
    { instructor_username: 'shariq', instructor_password: 'password' },
    { instructor_username: 'collin', instructor_password: 'password' },
    { instructor_username: 'dalian', instructor_password: 'password' },
    { instructor_username: 'alieze', instructor_password: 'password' },
    { instructor_username: 'donny', instructor_password: 'password' },
  ]);
};
