exports.seed = function (knex) {
  return knex('instructor').insert([
    {
      username: 'instructor',
      password: '$2a$08$rEJvvk8.BFnqHIRpKhwjiedlQEDYRutFECeSGIgcjt.hGKcPlVwR2',
      isInstructor: true,
    },
    {
      username: 'instructor1',
      password: '$2a$08$rEJvvk8.BFnqHIRpKhwjiedlQEDYRutFECeSGIgcjt.hGKcPlVwR2',
      isInstructor: true,
    },
    {
      username: 'instructor2',
      password: '$2a$08$rEJvvk8.BFnqHIRpKhwjiedlQEDYRutFECeSGIgcjt.hGKcPlVwR2',
      isInstructor: true,
    },
    {
      username: 'instructor3',
      password: '$2a$08$rEJvvk8.BFnqHIRpKhwjiedlQEDYRutFECeSGIgcjt.hGKcPlVwR2',
      isInstructor: true,
    },
    {
      username: 'instructor4',
      password: '$2a$08$rEJvvk8.BFnqHIRpKhwjiedlQEDYRutFECeSGIgcjt.hGKcPlVwR2',
      isInstructor: true,
    },
  ]);
};
