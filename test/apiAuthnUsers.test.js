//
// process.env.NODE_ENV = 'test';
//
// let chai = require('chai');
// let chaiHttp = require('chai-http');
//
// let should = chai.should()
//
// chai.use(chaiHttp);
//
// const ipServer = 'http://localhost:3001'
// // const ipServer = 'https://bok.cybermantra.net'
// let profile;
//
// describe('POST register user', function(){
//     this.timeout(0);
//     it('it should return object user success create', (done)=>{
//         chai.request(ipServer)
//             .post('/api/register')
//             .send({
//                 username: "test user",
//                 password: "testuser",
//                 email: "ms@mail.com"
//             })
//             .end((err, res)=>{
//                 // console.log('(test.apiAuth) register user err ', err)
//                 should.not.exist(err);
//                 res.should.have.status(200)
//                 const body = res.body;
//                 body.should.have.property('success').eql(true)
//                 body.should.have.property('result')
//                 profile = body.result;
//                 console.log('body create bucket ',body)
//                 done();
//             })
//     })
// })
//
// describe('POST register user EXIST', ()=>{
//     it('it should return object user ERROR create', (done)=>{
//         chai.request(ipServer)
//             .post('/api/register')
//             .send({
//                 username: "test user",
//                 password: "testuser",
//                 email: "ms@mail.com"
//             })
//             .end((err, res)=>{
//                 // should.exist(err);
//                 res.should.have.status(500)
//                 const body = res.body;
//                 body.should.have.property('success').eql(false)
//                 body.should.have.property('message')
//                 console.log('body create bucket ',body)
//                 done();
//             })
//     })
// })
//
//
// describe('POST login users', ()=>{
//     it('it should RETURN user', (done)=>{
//         chai.request(ipServer)
//             .post('/api/login')
//             .send({
//                 username: profile.username,
//                 password: 'testuser'
//             })
//             .end((err, res)=>{
//                 res.should.have.status(200)
//                 const body = res.body;
//                 console.log('(test.login) result', body)
//                 body.should.have.property('success').eql(true)
//                 body.should.have.property('token')
//                 body.should.have.property('data')
//                 profile = body
//                 done();
//             })
//     })
// })
//
// describe('GET detail user by id', ()=>{
//     it('it should return detail user', (done)=>{
//         chai.request(ipServer)
//             .get('/api/users/'+profile.data._id)
//             .set('authorization', profile.token)
//             .end((err, res)=>{
//                 const body = res.body;
//                 console.log('(test.GET by _id) result', body)
//                 res.should.have.status(200)
//                 body.should.have.property('success').eql(true)
//                 body.should.have.property('result')
//                 done();
//             })
//     })
// })
//
// describe('PUT update users', ()=>{
//     it('it should RETURN success = true', (done)=>{
//         chai.request(ipServer)
//             .put('/api/users/'+profile.data._id)
//             .set('authorization', profile.token)
//             .send({
//                 username: "test user update",
//                 password: 'testuser_update',
//                 email: "ms_update@mail.com"
//             })
//             .end((err, res)=>{
//                 const body = res.body;
//                 console.log('(test.UPDATE) result', body)
//                 res.should.have.status(200)
//                 body.should.have.property('success').eql(true)
//                 body.should.have.property('result')
//                 done();
//             })
//     })
// })
//
// describe('DELETE user', ()=>{
//     it('it should return object user delete', (done)=>{
//         chai.request(ipServer)
//             .delete('/api/users/'+profile.data._id)
//             .set('authorization', profile.token)
//             .end((err, res)=>{
//                 should.not.exist(err);
//                 res.should.have.status(200)
//                 const body = res.body;
//                 body.should.have.property('success').eql(true)
//                 body.should.have.property('result')
//                 console.log('body create bucket ',body)
//                 done();
//             })
//     })
// })
