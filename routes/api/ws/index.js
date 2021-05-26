/* Path: /routes/api/ws/index.js ***/

const auth_ctrlr = require('../../../controllers/auth');
const crud_ctrlr = require('../../../controllers/crud');
const jwt = require('jsonwebtoken');

/* Function
 * -------------------
 * @param { WebSocket.Server } wss - websocket server
 */
module.exports = function(wss)
{
    wss.on('connection', (ws1) =>
	{
		let userAuthenticated = 0;

		ws1.on('message', async function(msg)
		{
			try {
				const client_message = JSON.parse(msg);
				const user_name = client_message.name;
				const user_message = client_message.message;

				// Match "auth xx" where xx is the auth token
				const has_token = user_message.match(/auth\s.*$/);

				// If message contains a token, validate and authenticate user
				if (has_token)
				{
					if (!userAuthenticated)
					{
						// Extract token from message
						const extracted_token = has_token[0].split(' ')[1];
						const token_valid = jwt.verify(
							extracted_token,
							process.env.JWT_SECRET
						);

						if (token_valid)
						{
							userAuthenticated = 1;
							ws1.send(JSON.stringify({
								"authentication": "ok"
							}));
						}
					}
				}
				else if (userAuthenticated)
				{
					// Match "history xx", where xx - arbitrary number
					const wants_history = user_message.match(/history\s\d+$/);

					if (wants_history)
					{
						const history_count = wants_history[0].split(' ')[1];
						
						new Promise((resolve, reject) => 
						{
							const result = crud_ctrlr
								.getLastMessages(history_count);

							if (result)
								resolve(result);
							else
								reject("Failed to get message history");
						}).then((result)=>
						{
						
							ws1.send(JSON.stringify({
								"result": result
							}));
							
						})
						/*.catch((err_msg)=>
						{
							ws1.send(JSON.stringify({
								"error": err_msg
							}));
						});*/

					}
					else
					{
						crud_ctrlr.pushMessage(user_name, user_message);
						wss.clients.forEach(client =>
						{
							if (client !== ws1)
								client.send(user_message);
						});
					}
				}
				// User is not authenticated
				else {
					ws1.send(JSON.stringify({
						"error": "This user is not authenticated"
					}));
					ws1.close();
				}
			}
			catch(e) {
				ws1.send(JSON.stringify({
					"error": "Failed to parse your message. Try again"
				}));
				console.log(e);
			}
		});
		ws1.send('{ "connection": "ok" }');
	});
};
