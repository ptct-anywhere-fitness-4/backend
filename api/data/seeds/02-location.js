exports.seed = function (knex) {
  return knex('location').insert([
    { name: 'Mc Donalds' },
    { name: 'Planet Fitness' },
    { name: 'Burger King' },
  ]);
};
