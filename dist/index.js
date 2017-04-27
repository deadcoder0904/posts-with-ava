'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = '6565';
var uri = 'mongodb://localhost/posts';

_mongoose2.default.connect(uri);

var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("Connected to Mongo DB");
});

var Posts = _mongoose2.default.model('post', {
	name: {
		type: String,
		uppercase: true,
		unique: true
	},
	text: {
		type: String
	}
});

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	Posts.find({}, function (err, posts) {
		if (err) res.json({ err: err });else res.json({ posts: posts });
	});
});

app.post('/addPost', function (req, res) {
	var name = req.body.name;
	var text = req.body.text;
	if (name == undefined || name.trim() == '' || text == undefined || text.trim() == '') {
		res.json({ msg: 'Send all params' });
		return;
	}
	var post = new Posts({
		name: name,
		text: text
	});
	post.save(function (err, posts) {
		if (err) res.json({ err: err });else res.json({ msg: 'Post added' });
	});
});

app.put('/editPost/:name', function (req, res) {
	var name = req.params.name;
	var text = req.body.text;
	if (name == undefined || name.trim() == '' || text == undefined || text.trim() == '') {
		res.json({ msg: 'Send all params' });
		return;
	}
	Posts.findOneAndUpdate({ name: name }, { text: text }, function (err, docs) {
		if (err) res.json({ err: err });else res.json({ msg: 'Post updated' });
	});
});

app.delete('/deletePost/:name', function (req, res) {
	var name = req.params.name;
	if (name == undefined || name.trim() == '') {
		res.json({ msg: 'Send post name' });
		return;
	}
	Posts.remove({ name: name }, function (err, docs) {
		if (err) res.json({ err: err });else res.json({ msg: 'Post deleted' });
	});
});

app.listen(PORT, function () {
	console.log('Listening on PORT ' + PORT);
});