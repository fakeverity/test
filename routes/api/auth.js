const app = require('express');
const rt  = app.Router();

const auth_ctrl = require('./../../controllers/auth');

rt.post('/auth', (req, res) =>
{
	const user = {
		uname: req.query.name,
		upass: req.query.password
	};

	const token = auth_ctrl.checkUser(user);

	if (token)
		res.json({
			"token": token
		});
	else
		res.json({
			"error": "wrong user name or password"
		});
});

module.exports = rt;
