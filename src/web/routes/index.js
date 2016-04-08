var express = require('express');
var router = express.Router();

var configs = {
	"gameTitle": "Plither",
	"urlName": "slither.ga",
	"urlLink": "http://slither.ga",
	"version": "44"
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', {
		coreConfigs: configs,
		title: ''		
	});
});

module.exports = router;