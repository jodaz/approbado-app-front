
export async function up(knex) {
    return knex.schema.createTable('plans', table => {
        table.increments('id').primary();
        table.string('name');
        table.decimal('amount', 3, 2);
        table.timestamps();
    });
}
  
  
export async function down(knex) {
    return knex.schema.dropTable('plans')
}
  