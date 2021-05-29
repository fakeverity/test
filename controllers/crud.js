/* ============================================================================
 * FILE: /controllers/crud.js
 * ============================================================================ 
 */


const pg_client = require('../config').pg_client;


/* Function: getAllUsers
 * -------------------------------
 * > Fetches all records from users table
 * -------------------------------
 * @returns { array } - array of user objects:
 *     {
 *	       user_id,
 *	       user_name,
 *	       user_password 
 *	   }
 * -------------------------------
 */
module.exports.getAllUsers = async () => 
{
	const req_result = await pg_client.query('SELECT * FROM "users"');

	return req_result.rows;
};


/* Function: pushMessage
 * -------------------------------
 * > Saves given message to the database
 * -------------------------------
 * @param { string } user_name - name of the message author
 * @param { string } message   - ...
 * -------------------------------
 * @returns { boolean } - 
 * -------------------------------
 */
module.exports.pushMessage = async function(user_name, message)
{
	const user_id = pg_client.query(
		"SELECT user_id FROM users " +
		"WHERE user_name='" + user_name + "'"
	).then((result)=>
	{
		console.log(result.rows)
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


/* Function: getLastMessages
 * -------------------------------
 * > Fetches and returns specified amount of messagages from database
 * -------------------------------
 * @param { int } msg_count - amount of recent messages from database
 * -------------------------------
 * @returns { array } messages
 * -------------------------------
 */
module.exports.getLastMessages = async function(msg_count)
{
	const result = await pg_client.query(
		"SELECT users.user_name, messages.message_content " +
		"FROM messages " + 
		"INNER JOIN users ON users.user_id = messages.user_id " +
		"ORDER BY messages.message_id DESC " +
		"LIMIT " + msg_count
	);
	return result.rows;
};
