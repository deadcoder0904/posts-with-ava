import test from 'ava'
import superagent from 'superagent'

test('POST /addPost with no data', async t => {
   const res = await superagent
							.post('http://localhost:6565/addPost')
							.send({})
   const status = res.status
    t.is(status,200)
    t.is(typeof res.body.msg,'string')
    t.is(res.body.msg,'Send all params')
})

test('POST /addPost with only `name`', async t => {
   const res = await superagent
							.post('http://localhost:6565/addPost')
							.send({name: "HEY YO"})
   const status = res.status
    t.is(status,200)
    t.is(typeof res.body.msg,'string')
    t.is(res.body.msg,'Send all params')
})

test('POST /addPost with only `text`', async t => {
   const res = await superagent
							.post('http://localhost:6565/addPost')
							.send({text: "WTF YAAR"})
   const status = res.status
    t.is(status,200)
    t.is(typeof res.body.msg,'string')
    t.is(res.body.msg,'Send all params')
})

test('POST /addPost with all data', async t => {
   const res = await superagent
							.post('http://localhost:6565/addPost')
							.send({name: "TNA", text: "TNA Sucks !!!"})
   const status = res.status
    t.is(status,200)
    if(res.body.msg) {
	    t.is(typeof res.body.msg,'string')
	    t.is(res.body.msg,'Post added')
    }
    else {
    	t.is(typeof res.body.err,'object')
    }
})

test('PUT /editPost', async t => {
   const res = await superagent
							.put('http://localhost:6565/editPost/TNA')
							.send({text: "TNA Really Really Really Sucks !!!"})
   const status = res.status
    t.is(status,200)
    if(res.body.msg) {
	    t.is(typeof res.body.msg,'string')
	    t.is(res.body.msg,'Post updated')
    }
    else {
    	t.is(typeof res.body.err,'object')
    }
})

test('DELETE /deletePost', async t => {
   const res = await superagent
							.delete('http://localhost:6565/deletePost/TNA')
							.send({})
   const status = res.status
    t.is(status,200)
    if(res.body.msg) {
	    t.is(typeof res.body.msg,'string')
	    t.is(res.body.msg,'Post deleted')
    }
    else {
    	t.is(typeof res.body.err,'object')
    }
})

test('GET /', async t => {
   const res = await superagent
							.get('http://localhost:6565/')
							.send({})
   const status = res.status
    t.is(status,200)
    t.is(typeof res.body.posts,'object')
})
