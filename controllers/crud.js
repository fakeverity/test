const pg_client = require('../config').pg_client;

module.exports.getAllUsers = async () => 
{
	const req_result = await pg_client.query('SELECT * FROM "users"');

	return req_result.rows;

};

module.exports.pushMessage = async function(user_name, message)
{
	const user_id = pg_client.query(
		"SELECT user_id FROM users " +
		"WHERE user_name='" + user_name + "'"
	).then((result)=>
	{
		const user_id = result.rows[0].user_id;
		const query_insert = 
			"INSERT INTO messages(" +
				"user_id, " +
				"message_content) " +
			"VALUES(" + 
				"'"   + user_id + 
				"', '" + message + "')"
		;

		if (result)
			pg_client.query(query_insert);
				
	});
};

module.exports.getLastMessages = async function(msg_count)
{
	const result = await pg_client.query(
		"SELECT users.user_name, messages.message_content " +
		"FROM messages " + 
		"INNER JOIN users ON users.user_id = messages.user_id " +
		"ORDER BY messages.message_id DESC " +
		"LIMIT " + msg_count
	)
	
	return result.rows;
};
