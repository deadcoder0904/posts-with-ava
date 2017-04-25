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
	name: String,
	text: String
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req,res) => {
	Posts.find({},function (err,posts) {
		if(err) res.json({err})
		res.json({posts})
	})
})

app.post('/addPost',(req,res) => {
	const name = req.body.name
	const text = req.body.text
	if(name && text && name.trim() != '' && text.trim() != '')
		res.json({msg: `Send all params`})
	const post = new Posts({
		name,
		text
	})
	post.save((err,posts) => {
		if(err) res.json({err})
		res.json({msg: `Post added`})
	})
})

app.listen(PORT,() => {
	console.log(`Listening on PORT ${PORT}`)
})
