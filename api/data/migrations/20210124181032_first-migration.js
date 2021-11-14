const maxStringLength = 128;

exports.up = async (knex) => {
  await knex.schema
    .createTable('location', (tbl) => {
      tbl.increments('location_id');
      tbl.string('location_name', maxStringLength).notNullable().unique();
    })
    .createTable('intensity', (tbl) => {
      tbl.increments('intensity_id');
      tbl.string('intensity_name', maxStringLength).notNullable().unique();
    })
    .createTable('instructor', (tbl) => {
      tbl.increments('instructor_id');
      tbl.string('instructor_username', maxStringLength).notNullable().unique();
      tbl.string('instructor_password', maxStringLength).notNullable();
    })
    .createTable('client', (tbl) => {
      tbl.increments('client_id');
      tbl.string('client_username', maxStringLength).notNullable().unique();
      tbl.string('client_password', maxStringLength).notNullable();
    })
    .createTable('class', (tbl) => {
      tbl.increments('class_id');
      tbl.string('class_name', maxStringLength).notNullable().unique();
      tbl.string('class_type', maxStringLength).notNullable();
      tbl.string('class_date', maxStringLength).notNullable();
      // date (day/month/year) --> knex.time() --> current date/created at
      // https://stackoverflow.com/questions/41916012/storing-a-node-js-date-in-a-knex-datetime-mysql-datetime-field
      // consider julian date (integer) as a fallback
      // https://stackoverflow.com/questions/9229213/convert-iso-date-to-milliseconds-in-javascript/44537995
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
      tbl.string('start_time', maxStringLength).notNullable(); // military time, 00:00
      tbl.integer('class_duration').notNullable();
      tbl.integer('registered_clients').defaultTo(0).notNullable();
      tbl.integer('max_clients').notNullable();
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
      tbl
        .integer('location_id')
        .unsigned()
        .notNullable()
        .references('location_id')
        .inTable('location')
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
  await knex.schema.dropTableIfExists('instructor');
  await knex.schema.dropTableIfExists('intensity');
  await knex.schema.dropTableIfExists('location');
};
