const maxStringLength = 128;

exports.up = async (knex) => {
  await knex.schema
    .createTable('location', (tbl) => {
      tbl.increments('id');
      tbl.string('name', maxStringLength).notNullable().unique();
    })
    .createTable('intensity', (tbl) => {
      tbl.increments('id');
      tbl.string('name', maxStringLength).notNullable().unique();
    })
    .createTable('instructor', (tbl) => {
      tbl.increments('id');
      tbl.string('username', maxStringLength).notNullable().unique();
      tbl.string('password', maxStringLength).notNullable();
      tbl.boolean('isInstructor').notNullable().defaultTo(true);
    })
    .createTable('client', (tbl) => {
      tbl.increments('id');
      tbl.string('username', maxStringLength).notNullable().unique();
      tbl.string('password', maxStringLength).notNullable();
      tbl.boolean('isInstructor').notNullable().defaultTo(false);
    })
    .createTable('class', (tbl) => {
      tbl.increments('id');
      tbl.string('name', maxStringLength).notNullable().unique();
      tbl.string('type', maxStringLength).notNullable();
      tbl.string('date', maxStringLength).notNullable();
      // date (day/month/year) --> knex.time() --> current date/created at
      // https://stackoverflow.com/questions/41916012/storing-a-node-js-date-in-a-knex-datetime-mysql-datetime-field
      // consider julian date (integer) as a fallback
      // https://stackoverflow.com/questions/9229213/convert-iso-date-to-milliseconds-in-javascript/44537995
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
      tbl.string('start_time', maxStringLength).notNullable(); // military time, 00:00
      tbl.integer('duration').notNullable(); // minutes
      tbl.integer('registered_clients').defaultTo(0).notNullable();
      tbl.integer('max_clients').notNullable();
      tbl
        .integer('instructor_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('instructor')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('intensity_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('intensity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('location_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('location')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('registration', (tbl) => {
      tbl.increments('id');
      tbl.boolean('attendance').defaultTo(false).notNullable();
      tbl
        .integer('client_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('client')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('class_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('class')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .then(() => {
      return knex('intensity').insert([
        { name: 'easy' },
        { name: 'medium' },
        { name: 'hard' },
      ]);
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
