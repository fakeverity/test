const conf = require('../config');
const pg_client = conf.pg_client;
const jwt = require('jsonwebtoken');

module.exports.authUser= async function(user)
{
	try {
		let result = await pg_client.query(
			"SELECT * " + 
			"FROM users " +
			"WHERE user_name='" + user.name + "' " +
			"AND user_password='" + user.password + "'"
		);

		if (result.rows)
		{
			return jwt.sign({ name: user.name }, process.env.JWT_SECRET);
		}

		return null;
	}
	catch(e) { console.log(e); }
};
