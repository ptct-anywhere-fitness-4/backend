exports.seed = function (knex) {
  return knex('client').insert([
    { username: 'john', password: 'password' },
    { username: 'jane', password: 'password' },
  ]);
};
