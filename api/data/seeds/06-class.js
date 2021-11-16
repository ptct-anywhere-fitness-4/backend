exports.seed = function (knex) {
  return knex('class').insert([
    {
      name: 'ULTRA SUPER FAT BURNING',
      type: 'HIIT',
      date: new Date().toISOString(),
      start_time: '12:30',
      duration: 90,
      registered_clients: 2,
      max_clients: 15,
      instructor_id: 1,
      intensity_id: 2,
      location_id: 2,
    },
    {
      name: 'Serene Yoga',
      type: 'Yoga',
      date: new Date().toISOString(),
      start_time: '15:00',
      duration: 45,
      registered_clients: 1,
      max_clients: 5,
      instructor_id: 2,
      intensity_id: 1,
      location_id: 1,
    },
  ]);
};
