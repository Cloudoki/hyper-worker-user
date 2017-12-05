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
		}).createTable('password_recovery', function(table) {
			table.string('token').primary();
			table.string('email').notNullable().references('user.email');
			table.timestamps();
		}).then(function () {
			return knex("user").insert([{
				id: 1,
				email: "admin@cloudoki.com",
				password: "a",
				first_name: "admin",
				last_name: "cloudoki",
				super_admin: true
			}]).then(function () {
				return knex("role").insert({
					id:  1,
					slug: "ALL",
					description: "All the permissions"
				}).returning('id')
				.then(function(role_id) {
					return knex("account").insert({
						id:  1,
						slug: "hyper_account",
						role_id: role_id
					}).returning('id')
					.then(function (account_id) {
						return knex("account_user").insert({
							user_id:  1,
							account_id: account_id
						})
					})
				})
			});
		})
	]);
};

exports.down = function (knex, Promise) {};
