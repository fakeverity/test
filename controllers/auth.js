/* ============================================================================
 * FILE: /controllers/auth.js
 * ============================================================================ 
 */


const conf = require('../config');
const pg_client = conf.pg_client;
const jwt = require('jsonwebtoken');


/* Function: authUser
 * -------------------------------
 * > Verifies user's credentials 
 * > If the right credentials provided a JWT-authentication token is generated
 * -------------------------------
 * @param { object } user - user credentials in form of object:
 *     - user.name
 *     - user.password
 * -------------------------------
 * @returns { string || null } - JWT token in or null in other case
 * -------------------------------
 */
module.exports.authUser= async function(user)
{
	try {
		/* SQL: find records that match provided credentials */
		let result = await pg_client.query(
			"SELECT * " + 
			"FROM users " +
			"WHERE user_name='" + user.name + "' " +
			"AND user_password='" + user.password + "'"
		);

		if (result.rows)
		{
			return jwt.sign({ user_name: user.name }, process.env.JWT_SECRET);
		}

		// If no result was returned from database
		return null;
	}
	catch(e) { console.log(e); }
};


/* Function: verifyToken
 * -------------------------------
 * > Validates and returns decoded data ( { user_name } )
 * -------------------------------
 * @returns { object } data - jwt-decoded data
 * -------------------------------
 */ 
module.exports.verifyToken = function(token)
{
	return jwt.verify(
		token,
		process.env.JWT_SECRET
	);
};
