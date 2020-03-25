var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    session = require('express-session');
    const cookieParser = require('cookie-parser');
    const cors = require('cors')

module.exports = function () {
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json()); 
    app.use(cookieParser());
    app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
    });
    app.use(cors());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    //Routes
    require('../routes/index.routes.js')(app);

    //const user = require('../routes/user.routes');
    app.use('/', require('../routes/user.routes'));
    app.use('/', require('../routes/recipe.routes'));
    app.use('/', require('../routes/inventory.routes'));
    app.use('/', require('../routes/sales.routes'));
    
    app.use(express.static('./public'));
    return app;
};
