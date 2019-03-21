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
            email: 'hervera12@gmail.com',
            password: 'secret'
        };
        chai.request(server)
            .post('/api/v2/auth/signup')
            .send(user)
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.be.an('Object');
                // res.body.should.have.property('status').equal(201);
                // res.body.should.have.property('data');
                // res.body.data.should.be.an('Array');
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it('Should be able to login', (done) => {
        const login = {
            email: 'herve@gmail.com',
            password: 'secret',
        };
        chai.request(server)
            .post('/api/v2/auth/login')
            .send(login)
            .end((err, res) => {
                res.body.should.be.an('Object');
                // res.body.should.have.property('status').equal(200);
                // res.body.data.should.be.an('Array');
                // res.body.should.have.property('data');
                done();
            });
    });
});  
