exports.seed = function (knex) {
  return knex('intensity').insert([
    { intensity_name: 'easy' },
    { intensity_name: 'medium' },
    { intensity_name: 'hard' },
  ]);
};
