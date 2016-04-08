// Imports
var WebSocket = require('ws');
var fs = require("fs");

// GameServer implementation
function GameServer( confile ) {
    // Startup
    this.nodesPlayer = []; // Nodes controlled by players
    this.movingNodes = []; // For move engine
    this.clients = [];
    this.nodes = [];

    // Config
    this.config = {

	};

    // Parse config
    this.loadConfig( confile );
}

module.exports = GameServer;

GameServer.prototype.start = function() {
	console.log('\u001B[31m[Game]\u001B[0m Game Server started');
};

GameServer.prototype.loadConfig = function( confile ) {
    try {
        // Load the contents of the config file
        var load = JSON.parse(fs.readFileSync(confile, 'utf-8'));

        // Replace all the default config's values with the loaded config's values
        for (var obj in load) {
            this.config[obj] = load[obj];
        }

    } catch (err) {
        // No config
        console.log(err);

        // Create a new config
        fs.writeFileSync(confile, JSON.stringify(this.config, null, '\t'));
    }
};