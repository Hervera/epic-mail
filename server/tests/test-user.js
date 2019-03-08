import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.should();
chai.use(chaiHttp);

// eslint-disable-next-line no-undef
describe('User authentication Endpoints', () => {
    // eslint-disable-next-line no-undef
    it('Should create an account', (done) => {
        const user = {
            firstName: 'Herve',
            lastName: 'Nkuri',
            email: 'herveralive@gmail.com',
            password: 'secret',
            isAdmin: true,
        };
        chai.request(server)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                res.body.should.be.an('Object');
                res.body.should.have.property('status').equal(201);
                res.body.should.have.property('data');
                res.body.data.should.be.an('Array');
                res.body.data.should.all.have.property('token');
                res.body.data.should.all.have.property('user');
                res.body.data[0].user.should.have.property('firstName', user.firstName);
                res.body.data[0].user.should.have.property('lastName', user.lastName);
                res.body.data[0].user.should.have.property('email', user.email);
                res.body.data[0].user.should.have.property('isadmin', user.isAdmin);
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it('Should be able to login', (done) => {
        const login = {
            email: 'herveralive@gmail.com',
            password: 'secret',
        };
        chai.request(server)
            .post('/api/v1/auth/login')
            .send(login)
            .end((err, res) => {
                res.body.should.be.an('Object');
                res.body.should.have.property('status').equal(200);
                res.body.should.have.property('data');
                res.body.data.should.be.an('Array');
                res.body.data.should.all.have.property('token');
                res.body.data.should.all.have.property('user');
                res.body.data[0].user.should.have.property('firstName');
                res.body.data[0].user.should.have.property('lastName');
                res.body.data[0].user.should.have.property('email');
                res.body.data[0].user.should.have.property('isadmin');
                done();
            });
    });
});  
