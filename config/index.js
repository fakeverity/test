function conf_init() 
{
/* DECLARATIONS
 * ==============================================*/
	const dotenv = require('dotenv').config();
	const { Client } = require('pg');
	

/* CONFIG SETUP
 * ==============================================*/
	this.SERVER_HOST = process.env.SERVER_HOST || '127.0.0.1'; 
	this.SERVER_PORT = process.env.SERVER_PORT || 3000;
	this.postgres = {
		HOST: process.env.PG_HOST || 'localhost',
		PORT: process.env.PG_PORT || 5432,
    	USER: process.env.PG_USER || 'postgres',
		PASS: process.env.PG_PASS || '',
		DB:   process.env.PG_DB
    };

	this.pg_client = new Client({
		host:     postgres.HOST,
		port: 	  postgres.PORT,
		user: 	  postgres.USER,
		password: postgres.PASS,
		database: postgres.DB
	});

    return this;
};


module.exports = conf_init();
