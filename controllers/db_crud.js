const conf = require('./../config');
const pg_client = conf.pg_client;


module.exports.getAllUsers = async () => 
{
	const req_result = await pg_client.query('SELECT * FROM "users"');

	return req_result.rows;

};

module.exports.
