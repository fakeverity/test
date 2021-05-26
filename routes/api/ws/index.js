/* Path: /routes/api/ws/index.js ***/

/* Function
 * -------------------
 * @param { WebSocket.Server } wss - websocket server
 */
module.exports = function(wss)
{
    wss.on('connection', (client) =>
	{
		client.send('{ "connection" : "ok" }');
	});
};
