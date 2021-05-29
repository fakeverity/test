/* ============================================================================
 * FILE: /routes/api/auth.js
 * ============================================================================ 
 */ 


/* UTIL IMPORTS
 * ==========================================================================*/
	const app = require('express');
	const auth_router = app.Router();


/* PROJECT IMPORTS 
 * ==========================================================================*/
	const auth_controller = require('./../../controllers/auth');


/* ENDPOINT: user authentication 
 * -----------------------------*/
auth_router.post('/auth', async (req, res) =>
{
	// parsed (using bodyparser) json object
	const user = req.body;

	if (user.name && user.password)
	{
		const auth_token = await auth_controller.authUser(user);

		if (auth_token)
			res.json({
				"token": auth_token
			});
		else
			res.json({
				"error": "wrong user name or password"
			});

		// prevent next statement from execution
		return;
	}
	
	res.json({
		"error": "bad request body. Must be in json format."
	});
});


module.exports = auth_router;
