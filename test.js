import test from 'ava'
import expect from 'expect.js'
import request from 'superagent'

test('Get all posts', async t => {
   const res = await request
							.get('http://localhost:6565/')
							.send({})
   const status = res.status
    t.is(status,200)
    t.is(typeof res.body.posts,'object')
})
