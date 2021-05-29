/* ============================================================================
 * FILE: /routes/api/index.js
 * ============================================================================ 
 */


/* UTIL IMPORTS
 * ==========================================================================*/
	const app = require('express');
	const api_router  = app.Router();


/* PROJECT IMPORTS 
 * ==========================================================================*/
	const auth_router = require('./auth');


/* OBJECT DECLARATIONS & DEFINITIONS
 * ==========================================================================*/
	// returns all the users from database
	const getUsers = require('./../../controllers/crud').getAllUsers;


/* ROUTERS & ENDPOINT ASSIGNMENT
 * ==========================================================================*/
	api_router.use(auth_router);
	api_router.get('/userlist', async (req, res) =>
	{
		const user_list = await getUsers();		

		res.json( user_list );
	});


module.exports = api_router;
