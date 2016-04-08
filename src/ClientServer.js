// Imports
var WebApp = require('./web/app');
var WebSocket = require('ws');
var https = require('https');
var http = require('http');
var fs = require("fs");

// ClientServer implementation
function ClientServer() {
    // Config
    this.config = { // Border - Right: X increases, Down: Y increases (as of 2015-05-20)
		serverType: 'http',
		webserverPort: 80,
		serverPort: 433    };

    // Parse config
    this.loadConfig();
}

module.exports = ClientServer;

ClientServer.prototype.start = function() {
    WebApp.set('port', this.config.webserverPort);
    WebApp.setMaster(this);
    this.httpServer = http.createServer(WebApp);

    this.httpServer.listen(this.config.webserverPort);
    this.httpServer.on('error', onError.bind(this));
    this.httpServer.on('listening', onListening.bind(this));
	
	// functions
	function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.log('\u001B[31m[Client]\u001B[0m ' + this.config.webserverPort + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.log('\u001B[31m[Client]\u001B[0m ' + this.config.webserverPort + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
		return false;
    }

    function onListening() {
        var addr = this.httpServer.address();
        var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        console.log('\u001B[31m[Client]\u001B[0m Client Server started at ' + bind);
		return true;
    }
};

ClientServer.prototype.loadConfig = function() {
    try {
        // Load the contents of the config file
        var load = JSON.parse(fs.readFileSync('./configs/ClientConfig.json', 'utf-8'));

        // Replace all the default config's values with the loaded config's values
        for (var obj in load) {
            this.config[obj] = load[obj];
        }

    } catch (err) {
        // No config
        console.log(err);

        // Create a new config
        fs.writeFileSync('./configs/ClientConfig.json', JSON.stringify(this.config, null, '\t'));
    }
};