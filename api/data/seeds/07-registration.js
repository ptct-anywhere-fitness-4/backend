exports.seed = function (knex) {
  return knex('registration').insert([
    { client_id: 1, class_id: 1 },
    { client_id: 2, class_id: 1 },
    { client_id: 2, class_id: 2 },
  ]);
};
