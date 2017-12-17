
process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should()

chai.use(chaiHttp);

const ipServer = 'http://localhost:3001'
// const ipServer = 'https://bok.cybermantra.net'
let profile;
let ip;

describe('POST login users', ()=>{
    it('it should RETURN user', (done)=>{
        chai.request(ipServer)
            .post('/api/login')
            .send({
                username: "test user update",
                password: "testuser"
            })
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.have.property('success').eql(true)
                profile = res.body
                console.log('profile login ', profile)
                done();
            })
    })
})

// describe('POST create ip', ()=>{
//     it('it should return object ip success create', (done)=>{
//         chai.request(ipServer)
//             .post('/api/ip')
//             .set('authorization', profile.token)
//             .send({
//                 exsi: "exsi_example",
//                 os: "os_example",
//                 runningProgram: "runningProgram_example",
//                 userName: "username_example",
//                 vLan: "vlan_example",
//                 vmName: "vmname_example"
//             })
//             .end((err, res)=>{
//                 should.not.exist(err);
//                 res.should.have.status(200)
//                 const body = res.body;
//                 body.should.have.property('success').eql(true)
//                 body.should.have.property('result')
//                 console.log('body create ip ',body)
//                 ip = body.result;
//                 done();
//             })
//     })
// })
//
// describe('PUT rename ip', ()=>{
//     it('it should return object ip success rename', (done)=>{
//         chai.request(ipServer)
//             .put('/api/ip/'+ip._id)
//             .set('authorization', profile.token)
//             .send({
//                 exsi: "exsi_example_update",
//                 os: "os_example_update",
//                 runningProgram: "runningProgram_example_update",
//                 userName: "username_example_update",
//                 vLan: "vlan_example_update",
//                 vmName: "vmname_example_update"
//             })
//             .end((err, res)=>{
//                 should.not.exist(err);
//                 res.should.have.status(200)
//                 const body = res.body;
//                 body.should.have.property('success').eql(true)
//                 body.should.have.property('result')
//                 console.log('body rename ip ',body)
//                 done();
//             })
//     })
// })

// describe('DELETE remove ip', ()=>{
//     it('it should return object ip success create', (done)=>{
//         chai.request(ipServer)
//             .delete('/api/ip/'+ip._id)
//             .set('authorization', profile.token)
//             .end((err, res)=>{
//                 should.not.exist(err);
//                 res.should.have.status(200)
//                 const body = res.body;
//                 body.should.have.property('success').eql(true)
//                 body.should.have.property('result')
//                 console.log('body delete ip ',body)
//                 done();
//             })
//     })
// })
//

for(i=0; i<50; i++){
    describe('POST dummy data ip '+i, ()=>{
            it('it should return object ip success create '+i, (done)=>{
                chai.request(ipServer)
                    .post('/api/ip')
                    .set('authorization', profile.token)
                    .send({
                        exsi: "exsi_example "+i,
                        os: "os_example "+i,
                        runningProgram: "runningProgram_example "+i,
                        userName: "username_example "+i,
                        vLan: "vlan_example "+i,
                        vmName: "vmname_example "+i
                    })
                    .end((err, res)=>{
                        should.not.exist(err);
                        res.should.have.status(200)
                        const body = res.body;
                        body.should.have.property('success').eql(true)
                        body.should.have.property('result')
                        console.log('body create ip ',body)
                        ip = body.result;
                        done();
                    })
            })
    })
}

// describe('GET ip by query ', ()=>{
//     it('it should RETURN list ip ', (done)=>{
//         chai.request(ipServer)
//             .get('/api/ip/?page=1&size=10&sort=createdBy,asc')
//             .set('authorization', profile.token)
//             .end((err, res)=>{
//                 res.should.have.status(200)
//                 const body = res.body;
//                 body.should.have.property('success').eql(true)
//                 body.should.have.property('result')
//                 console.log(body)
//                 done();
//             })
//     })
// })
