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
    })
    .createTable('class', (tbl) => {
      tbl.increments('class_id');
      tbl.string('class_name', maxStringLength).notNullable().unique();
      tbl.string('class_type', maxStringLength).notNullable().unique(); // do we want class_type to be unique?
      // start_time
      // duration
      // location
      tbl.integer('registered_clients').defaultTo(0).notNullable();
      tbl.integer('max_clients').defaultTo(null);
      tbl
        .integer('instructor_id')
        .unsigned()
        .notNullable()
        .references('instructor_id')
        .inTable('instructor')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('intensity_id')
        .unsigned()
        .notNullable()
        .references('intensity_id')
        .inTable('intensity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('registration', (tbl) => {
      tbl.increments('registration_id');
      tbl.boolean('attendance').defaultTo(false).notNullable();
      tbl
        .integer('client_id')
        .unsigned()
        .notNullable()
        .references('client_id')
        .inTable('client')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('class_id')
        .unsigned()
        .notNullable()
        .references('class_id')
        .inTable('class')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('registration');
  await knex.schema.dropTableIfExists('class');
  await knex.schema.dropTableIfExists('client');
  await knex.schema.dropTableIfExists('intensity');
  await knex.schema.dropTableIfExists('instructor');
};
