/**
 * Created by lichun on 2018/3/20.
 */
var ws = require("nodejs-websocket");
var PORT = 3000;

// 不只有一个客户端连接
var clientCount = 0;

var connections = []; //进来的人

// 单聊在线
var signallines = [];

var server = ws.createServer(function(conn) {
	clientCount++;
	var thread;
	conn.on("text", function(str) {
		thread = JSON.parse(str);
		//console.log('conn/text => ',thread);
		connections.push(thread);
		
		//console.log('connections=>',connections);
		
		// 当发起单聊的人超过1个人的时候，就要确定单聊的路线
		if (connections.length > 1) {
			for (var i = 0; i < connections.length; i++) {
				for (var j = i + 1; j < connections.length; j++) {
					// 这里是判断单聊的路线，toname是要发送的人和要接受的人是否一样
					if (connections[i].receiveID == connections[j].sendID &&
						connections[j].receiveID == connections[i].sendID) {
						signallines.push(connections[j].receiveName);
						signallines.push(connections[j].sendName);
						
					}
					
				}
			}
		}
		broadcast(JSON.stringify(thread))
	});
	
	conn.on("close", function(code, reason) {
		//console.log("code closed", code);
		//console.log("reason closed", reason)
		clientCount = 0;
	});
	
	conn.on("error", function(err) {
		console.log('handle err');
		console.log(err);
	})
	
}).listen(PORT);

function broadcast(str) {
	//console.log('str', str);
	// 取到server下面的所有连接
	server.connections.forEach(function(connection) {
		connection.sendText(str);
	})
}