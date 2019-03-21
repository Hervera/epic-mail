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
            authToken = res.body.data.token; // save the token
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

});
