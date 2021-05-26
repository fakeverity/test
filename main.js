
/* UTIL IMPORTS
 * ==========================================================================*/
	const http = require('http');
	const express = require('express');
	const WebSocket = require('ws');
	const {
		Client
	} = require('pg');



/* PROJECT IMPORTS 
 * ==========================================================================*/
	const conf  = require('./config');
	const routes = require('./routes');
	const pg_client = conf.pg_client;
	const wsRouterInit = require('./routes/api/ws');

/* OBJECT DECLARATIONS & DEFINITIONS
 * ==========================================================================*/
	const app    = express();
	


/* INITIALIZE APP
 * ==========================================================================*/
	async function init()
	{
		
		await pg_client.connect();
		
		app.use(routes);
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
	 *  @property { int } pendingExec - designates if function finished its job
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
