exports.seed = function (knex) {
  return knex('instructor').insert([
    { username: 'shariq', password: 'password' },
    { username: 'collin', password: 'password' },
    { username: 'dalian', password: 'password' },
    { username: 'alieze', password: 'password' },
    { username: 'donny', password: 'password' },
  ]);
};
