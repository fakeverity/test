const app = require('express');
const rt  = app.Router();
const auth_router = require('./auth');

const getUsers = require('./../../controllers/crud').getAllUsers;

rt.use(auth_router);
rt.get('/userlist', async (req, res) =>
{
	const user_list = await getUsers();		

	res.json( user_list );
});


module.exports = rt;
