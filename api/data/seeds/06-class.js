exports.seed = function (knex) {
  return knex('class').insert([
    {
      class_name: 'ULTRA SUPER FAT BURNING',
      class_type: 'HIIT',
      class_date: new Date().toISOString(),
      start_time: '12:30',
      class_duration: 90,
      registered_clients: 0,
      max_clients: 15,
      instructor_id: 1,
      intensity_id: 2,
      location_id: 2,
    },
    {
      class_name: 'Serene Yoga',
      class_type: 'Yoga',
      class_date: new Date().toISOString(),
      start_time: '15:00',
      class_duration: 45,
      registered_clients: 0,
      max_clients: 5,
      instructor_id: 2,
      intensity_id: 1,
      location_id: 0,
    },
  ]);
};
