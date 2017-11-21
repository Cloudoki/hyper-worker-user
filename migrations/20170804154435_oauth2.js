exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.createTable('oauth_client', function (table) {
			table.increments('id').primary();
			table.string('client_id').notNullable().unique();
			table.string('client_secret').notNullable();
			table.string('redirect_uri').notNullable();
			table.string('name');
			table.string('description');
			table.string('grant_types');
			table.boolean('trusted');
			table.boolean('make_token');
			table.string('scope');
			table.integer('user_id').unsigned().references('user.id');
			table.timestamps();
		}).createTable('oauth_access_token', function (table) {
			table.increments('id').primary();
			table.string('access_token').notNullable().unique();
			table.timestamp('expiration_date').notNullable();
			table.string('scope');
			table.string('client_id').references('oauth_client.client_id');
			table.integer('user_id').unsigned().references('user.id');
			table.timestamps();
		}).createTable('oauth_authorization_code', function (table) {
			table.increments('id').primary();
			table.string('authorization_code').notNullable().unique();
			table.string('redirect_uri');
			table.timestamp('expiration_date').notNullable();
			table.string('scope');
			table.string('client_id').references('oauth_client.client_id');
			table.integer('user_id').unsigned().references('user.id');
			table.timestamps();
		}).createTable('oauth_refresh_token', function (table) {
			table.increments('id').primary();
			table.string('refresh_token').notNullable().unique();
			table.timestamp('expiration_date').notNullable();
			table.string('scope');
			table.string('client_id').references('oauth_client.client_id');
			table.integer('user_id').unsigned().references('user.id');
			table.timestamps();
		}).createTable('oauth_login', function (table) {
			table.increments('id').primary();
			table.timestamp('expiration_date').notNullable();
			table.string('token').notNullable();
			table.integer('account_id').unsigned().references('account.id');
			table.integer('user_id').unsigned().references('user.id');
			table.timestamps();
		}).createTable('oauth_approved_client', function (table) {
			table.increments('id').primary();
			table.string('client_id').references('oauth_client.client_id');
			table.integer('user_id').unsigned().references('user.id');
			table.timestamps();
		}).then(function () {
			return knex("oauth_client").insert([{
				client_id: "cl0ud0k001",
				client_secret: "Sup3rs3cr3tP4SSw0rd",
				redirect_uri: "http://localhost:3000/handle-code",
				name: "Cloudoki Client",
				description: "Cloudoki OAuth2 Client",
				grant_types: "authorization_code,implicit,password,client_credentials,refresh_token",
				trusted: true,
				make_token: true,
				scope: "*",
				user_id: 1
			}]);
		})
	])
}

exports.down = function (knex, Promise) {

}
