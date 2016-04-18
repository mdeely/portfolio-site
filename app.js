/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')

var app = express()
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.locals.basedir = app.get('views');

app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  var obj = require('./views/db.json');
  res.render( 'index', obj );
})

app.get('/about', function (req, res) {
  res.render( 'about' );
})

app.get('/:projectName', function (req, res) {
  var projectName = req.params.projectName;

  res.locals.projectName = projectName;

  var obj = require('./views/db.json');
  res.render( 'project', obj );
})

app.listen(3000)