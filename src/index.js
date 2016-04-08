// Imports
var fs = require('fs');

// Init variables
var regServer = /^--gServer=(.*)/;
var runClient = false;
var gConfig = false;

// Configs values
var countServers = 1;

// Run PlitherWeb
process.argv.forEach(function(val) {
	if ( val == '--master' ) {
		runMaster = true;
	} else if (regServer.test(val)) {
		gConfig = regServer.exec(val)[1];
	}
});

if( runMaster ){
	var ClientServer = require('./ClientServer');
	var clientServer = new ClientServer();
	clientServer.start();
} else {
	var GameServer = require('./GameServer');
	var gameServer = new GameServer( ( fs.existsSync( gConfig ) ? gConfig : './configs/GameServer.json' ) );
	gameServer.start();
}