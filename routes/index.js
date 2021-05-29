/* ============================================================================
 * FILE: /routes/index.js
 * ============================================================================ 
 */


/* UTIL IMPORTS
 * ==========================================================================*/
	const app = require('express');
	const main_router = app.Router();


/* PROJECT IMPORTS 
 * ==========================================================================*/
	const api_router = require('./api');


/* Logs user requests to the server */
main_router.use(function timeLog(req, res, next)
{
	console.log(
		'Time: ', Date.now() ,
		'\nPath: ', req.method + ' ' +  req.path +
		'\nParams: ', req.query || req.params
	);
	next();
});


/* ROUTERS ASSIGNMENT
 * ==========================================================================*/
	main_router.use('/api', api_router);


module.exports = main_router;
