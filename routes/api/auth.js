const app = require('express');
const router = app.Router();
const auth_ctrl = require('./../../controllers/auth');



/* AUTHENTICATE USER
 * =================================*/
router.post('/auth', async (req, res) =>
{
	const user = req.body;

	if (user.name && user.password)
	{
		const token = await auth_ctrl.authUser(user);

		if (token)
			res.json({
				"token": token
			});
		else
			res.json({
				"error": "wrong user name or password"
			});

		return;
	}
	
	res.json({
		"error": "bad request body"
	});
});

module.exports = router;
