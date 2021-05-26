const conf = require('../config');
const pg_client = conf.pg_client;
const jwt = conf.jwt;

module.exports.isAuthenticated = async function(user)
{
	let result = '';
    await pg_client.query(
        "SELECT * " + 
        "FROM users" +
        "WHERE user_name=" + user.name + " " +
		"AND user_password=" + user.password 
    ).then((res)=>
	{
		
		console.log(res.rows[0]);
		result = true;
	});

	return false
   // jwt.sign({ name: user.name }, process.env.JWT_SECRET);
          

    //if (auth_successfull)
     //   return { token: signed_token }
    //else
	//	return null;
};
