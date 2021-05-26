const app = require('express');
const rt = app.Router();
const api_router = require('./api');

rt.use(function timeLog(req, res, next)
{
	console.log(
		'Time: ', Date.now() ,
		'\nPath: ', req.method + ' ' +  req.path +
		'\nParams: ', req.query || req.params
	);
	next();
});

rt.use('/api', api_router);


module.exports = rt;
