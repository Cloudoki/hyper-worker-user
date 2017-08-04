exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.createTable('role', function (table) {
			table.increments('id').primary();
			table.string('slug').notNullable().unique();
			table.string('description');
			table.timestamps();
		}).createTable('user', function (table) {
			table.increments('id').primary();
			table.string('email').notNullable().unique();
			table.string('password').notNullable();
			table.string('first_name').notNullable();
			table.string('last_name').notNullable();
			table.boolean('super_admin').notNullable();
			table.integer('role_id').unsigned().references('role.id');
			table.timestamps();
		}).createTable('account', function (table) {
			table.increments('id').primary();
			table.string('slug').notNullable().unique();
			table.integer('role_id').unsigned().references('role.id');
			table.timestamps();
		}).createTable('permission', function (table) {
			table.increments('id').primary();
			table.string('slug').notNullable().unique();
			table.timestamps();
		}).createTable('permission_role', function (table) {
			table.integer('role_id').unsigned().references('role.id');
			table.integer('permission_id').unsigned().references('permission.id');
			table.timestamps();
		}).createTable('account_user', function (table) {
			table.integer('account_id').notNullable().unsigned().references('account.id');
			table.integer('user_id').notNullable().unsigned().references('user.id');
			table.unique(['user_id', 'account_id']);
			table.timestamps();
		}).then(function () {
			return knex("user").insert([{
				email: "admin@cloudoki.com",
				password: "a",
				first_name: "admin",
				last_name: "cloudoki",
				super_admin: true
			}]);
		})
	]);
};

exports.down = function (knex, Promise) {};