exports.seed = function (knex) {
  return knex('client').insert([
    { client_username: 'john', client_password: 'password' },
    { client_username: 'jane', client_password: 'password' },
  ]);
};
