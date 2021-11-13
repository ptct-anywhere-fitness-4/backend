// instructor --> intensity -->  client --> class --> registration
const maxStringLength = 128;

exports.up = async (knex) => {
  await knex.schema
    .createTable('instructor', (tbl) => {
      tbl.increments('instructor_id');
      tbl.string('instructor_username', maxStringLength).notNullable().unique();
      tbl.string('instructor_password', maxStringLength).notNullable();
    })
    .createTable('intensity', (tbl) => {
      tbl.increments('intensity_id');
      tbl.string('intensity_name', maxStringLength).notNullable().unique();
    })
    .createTable('client', (tbl) => {
      tbl.increments('client_id');
      tbl.string('client_username', maxStringLength).notNullable().unique();
      tbl.string('client_password', maxStringLength).notNullable();
    });
  // .createTable('class', (tbl) => {
  //   tbl.increments('class_id');
  //   tbl.string('name', maxStringLength);
  // })
};
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('client');
  await knex.schema.dropTableIfExists('intensity');
  await knex.schema.dropTableIfExists('instructor');
};
// users.timestamps(false, true);

/* 
exports.up = async function (knex) {
  await knex.schema
    .createTable('projects', (tbl) => {
      tbl.increments('project_id');
      tbl.string('project_name').notNullable();
      tbl.string('project_description');
      tbl.boolean('project_completed').defaultTo(false);
    })
    .createTable('resources', (tbl) => {
      tbl.increments('resource_id');
      tbl.string('resource_name').notNullable().unique();
      tbl.string('resource_description');
    })
    .createTable('tasks', (tbl) => {
      tbl.increments('task_id');
      tbl.string('task_description').notNullable();
      tbl.string('task_notes');
      tbl.boolean('task_completed').defaultTo(false);
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('project_resources', (tbl) => {
      tbl.increments('project_resource_id');
      tbl.string('assigned_resource');
      tbl
        .integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource_id')
        .inTable('resources')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
};

*/
