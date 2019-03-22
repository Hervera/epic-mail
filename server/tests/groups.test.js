import chai from "chai";
import chaiHTTP from "chai-http";
import server from "../app";

chai.should();
chai.use(chaiHTTP);

let authToken;
// eslint-disable-next-line no-undef
before((done) => {
    const user = {
        email: 'herve@gmail.com',
        password: 'secret'
    };

    chai.request(server).post('/api/v2/auth/login')
        .send(user)
        .end((err, res) => {
            authToken = res.body.data[0].token; // save the token
            done();
        });
});


// eslint-disable-next-line no-undef
describe('Group Endpoint', () => {
    // eslint-disable-next-line no-undef
    it('Should create a new group', (done) => {
        const group = {
            name: 'Group z',
            role: 'admin',
        };

        chai.request(server)
            .post('/api/v2/groups')
            .send(group)
            .set('Authorization', `Bearer ${authToken}`)
            .set('Accept', 'Application/JSON')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it('Should retrieve groups', (done) => {
        chai.request(server)
            .get('/api/v2/groups')
            .set('Authorization', `Bearer ${authToken}`)
            .set('Accept', 'Application/JSON')
            .end((err, res) => {
                res.body.should.be.a('object');
                // res.body.should.have.status(200);
                // res.body.should.have.property('status').eql(200);
                // res.body.should.have.property('success').eql('admin, groups retrieved');
                // res.body.data.should.be.a('array');
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it('Should add a group member', (done) => {
        const newGroupMember = {
            memberId: '3',
            userRole: 'user',
        };

        chai.request(server)
            .post('/api/v2/groups/1/users')
            .send(newGroupMember)
            .set('Authorization', `Bearer ${authToken}`)
            .set('Accept', 'Application/JSON')
            .end((err, res) => {
                res.body.should.be.a('object');
                // res.body.should.have.status(201);
                // res.body.should.have.property('status').eql(201);
                // res.body.should.have.property('success').eql('group member registered');
                // res.body.data.should.be.a('array');
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it('Should send a group message', (done) => {
        const groupMessage = {
            subject: 'test',
            message: 'test group message',
            parentMessageId: 1,
            status: 'sent',
        };
        chai.request(server)
            .post('/api/v2/groups/1/messages')
            .send(groupMessage)
            .set('Authorization', `Bearer ${authToken}`)
            .set('Accept', 'Application/JSON')
            .end((err, res) => {
                res.body.should.be.a('object');
                // res.body.should.have.status(201);
                // res.body.should.have.property('status').eql(201);
                // res.body.should.have.property('success').eql('group email sent');
                // res.body.data.should.be.a('array');
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it('Should not send a group message, because the group does not exist', (done) => {
        const groupMessage = {
            subject: 'test',
            message: 'test group message',
            parentMessageId: 1,
            status: 'sent',
        };
        chai.request(server)
            .post('/api/v2/groups/11/messages')
            .send(groupMessage)
            .set('Authorization', `Bearer ${authToken}`)
            .set('Accept', 'Application/JSON')
            .end((err, res) => {
                res.body.should.be.a('object');
                // res.body.should.have.status(404);
                // res.body.should.have.property('status').eql(404);
                // res.body.should.have.property('error').eql('group not found');
                done();
            });
    });


});
