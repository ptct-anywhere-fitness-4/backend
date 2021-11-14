exports.seed = function (knex) {
  return knex('instructor').insert([
    { instructor_username: 'shariq', instructor_password: 'apples' },
    { instructor_username: 'collin', instructor_password: 'pears' },
    { instructor_username: 'dalian', instructor_password: 'oranges' },
  ]);
};
