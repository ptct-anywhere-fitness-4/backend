exports.seed = function (knex) {
  return knex('intensity').insert([
    { name: 'easy' },
    { name: 'medium' },
    { name: 'hard' },
  ]);
};
