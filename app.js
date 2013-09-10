
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var exec = require('child_process').exec;
var user = require('./routes/user');
var path = require('path'), child;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var io = require('socket.io').listen(app.listen(app.get('port')));

io.sockets.on('connection', function (socket) {
    socket.emit('connected', { on: true });
});
console.log('Express server listening on port ' + app.get('port'));
