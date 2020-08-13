
exports.up = function(knex) {
    return knex.schema.createTable('messages', function(table){
        table.increments()
        table.string('message').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now());

        table.string('from_user').notNullable()
        table.string('to_user').notNullable()

        table.foreign('from_user').references('id').inTable('users')
        table.foreign('to_user').references('id').inTable('users')

        table.string('room').notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('messages')
};
