/* ============================================================================
 * FILE: /controllers/main.js
 * ============================================================================ 
 */


/* UTIL IMPORTS
 * ==========================================================================*/
	const http = require('http');
	const express = require('express');
	const WebSocket = require('ws');
	const bodyparser = require('body-parser');
	const {
		Client
	} = require('pg');



/* PROJECT IMPORTS 
 * ==========================================================================*/
	const conf		   = require('./config');
	const routes       = require('./routes');
	const wsRouterInit = require('./routes/api/ws');



/* OBJECT DECLARATIONS & DEFINITIONS
 * ==========================================================================*/
	const app       = express();
	const pg_client = conf.pg_client;
	


/* INITIALIZE APP
 * ==========================================================================*/
	async function init()
	{
		
		await pg_client.connect();
		
		app.use(bodyparser.json());
		app.use(routes);
		app.set('view engine', 'pug');
		app.set('views', './views');

		const server = http.createServer(app);
		const wss    = new WebSocket.Server({ server, path: '/api/ws' });
		server.listen(conf.SERVER_PORT, conf.SERVER_HOST, (err) => 
		{
			console.log(
				'listening on: ' +
				conf.SERVER_HOST + ':' +
				conf.SERVER_PORT
			);
		});

		wsRouterInit(wss);
	}
	init();


/* EVENTS
 * ==============================================*/
    process.on('exit', disassemble);
    process.on('SIGINT', disassemble);


/* AUXILIARY FUNCTIONS
 * ==============================================*/

	/* Function: disassemble
     * ---------------------
     * > Executes shutting down actions
     * ---------------------
	 *  @property { int } pendingExec - shows if needed task are done execution
     */
    async function disassemble()
    {
		/* If function has active instance
		 * do not execute again */
		if (this.pendingExec)
			return;
		this.pendingExec = 1;

		// Close Postgres connection & report
        console.log('\nClosing database connection...');
        await pg_client.end().then(() => 
        {
		    console.log('Closed')
			process.exit();
        });
    }
