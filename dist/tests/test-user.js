"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.should();

_chai.default.use(_chaiHttp.default); // eslint-disable-next-line no-undef


describe('User authentication Endpoints', function () {
  // eslint-disable-next-line no-undef
  it('Should create an account', function (done) {
    var user = {
      firstName: 'Herve',
      lastName: 'Nkuri',
      email: 'herveralive7@gmail.com',
      password: 'secret',
      isAdmin: true
    };

    _chai.default.request(_app.default).post('/api/v1/auth/signup').send(user).set("Accept", "Application/JSON").end(function (err, res) {
      res.body.should.be.an('Object');
      res.body.should.have.property('status').equal(201);
      res.body.should.have.property('data');
      res.body.data.should.be.an('Array');
      done();
    });
  }); // eslint-disable-next-line no-undef

  it('Should be able to login', function (done) {
    var login = {
      email: 'herveralive@gmail.com',
      password: 'secret'
    };

    _chai.default.request(_app.default).post('/api/v1/auth/login').send(login).end(function (err, res) {
      res.body.should.be.an('Object');
      res.body.should.have.property('status').equal(200);
      res.body.data.should.be.an('Array');
      res.body.should.have.property('data');
      done();
    });
  });
});