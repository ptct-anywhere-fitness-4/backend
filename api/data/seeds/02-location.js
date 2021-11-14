exports.seed = function (knex) {
  return knex('location').insert(
    { location_name: 'Mc Donalds' },
    { location_name: 'Crunch Gym' },
    { location_name: 'Burger King' }
  );
};
