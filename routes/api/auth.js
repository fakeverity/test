const app = require('express');
const router = app.Router();
const auth_ctrl = require('./../../controllers/auth');



/* AUTHENTICATE USER
 * =================================*/
router.post('/auth', async (req, res) =>
{
	const user = req.body;
	const token = await auth_ctrl.authUser(user);
	console.log(token)

	if (token)
		res.json({
			"token": token
		});
	else
		res.json({
			"error": "wrong user name or password"
		});
	
});

module.exports = router;
