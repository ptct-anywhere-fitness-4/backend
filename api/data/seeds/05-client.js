exports.seed = function (knex) {
  return knex('client').insert([
    {
      username: 'client',
      password: '$2a$08$rEJvvk8.BFnqHIRpKhwjiedlQEDYRutFECeSGIgcjt.hGKcPlVwR2',
      isInstructor: false,
    },
    {
      username: 'client1',
      password: '$2a$08$rEJvvk8.BFnqHIRpKhwjiedlQEDYRutFECeSGIgcjt.hGKcPlVwR2',
      isInstructor: false,
    },
  ]);
};
