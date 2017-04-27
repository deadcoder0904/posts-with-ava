import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'

const PORT = `6565`
const uri = `mongodb://localhost/posts`

mongoose.connect(uri)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log("Connected to Mongo DB")
});

const Posts = mongoose.model('post',{
	name: {
		type: String,
		uppercase: true,
		unique: true
	},
	text: {
		type: String
	}
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req,res) => {
	Posts.find({},function (err,posts) {
		if(err) res.json({err})
		else res.json({posts})
	})
})

app.post('/addPost',(req,res) => {
	const name = req.body.name
	const text = req.body.text
	if(name == undefined || name.trim() == '' || text == undefined || text.trim() == '') {
		res.json({msg: `Send all params`})
		return
	}
	const post = new Posts({
		name,
		text
	})
	post.save((err,posts) => {
		if(err) res.json({err})
		else res.json({msg: `Post added`})
	})
})

app.put('/editPost/:name',(req,res) => {
	const name = req.params.name
	const text = req.body.text
	if(name == undefined || name.trim() == '' || text == undefined || text.trim() == '') {
		res.json({msg: `Send all params`})
		return
	}
	Posts.findOneAndUpdate({name},{text},(err,docs) => {
		if(err) res.json({err})
		else res.json({msg: `Post updated`})
	})
})

app.delete('/deletePost/:name',(req,res) => {
	const name = req.params.name
	if(name == undefined || name.trim() == '') {
		res.json({msg: `Send post name`})
		return
	}
	Posts.remove({name},(err,docs) => {
		if(err) res.json({err})
		else res.json({msg: `Post deleted`})
	})
})

app.listen(PORT,() => {
	console.log(`Listening on PORT ${PORT}`)
})
