"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _mock = require("./mock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.should();

_chai.default.use(_chaiHttp.default); // eslint-disable-next-line no-undef


describe("Messsaging endpoints", function () {
  var authToken; // eslint-disable-next-line no-undef

  before(function (done) {
    var user = {
      email: 'herveralive@gmail.com',
      password: 'secret'
    };

    _chai.default.request(_app.default).post('/api/v1/auth/login').send(user).end(function (err, res) {
      authToken = res.body.data[0].token; // save the token

      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should send an email with sent status", function (done) {
    _chai.default.request(_app.default).post("/api/v1/messages").send(_mock.sentMessage).set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.status(201);
      res.body.should.have.property("status").eql(201);
      res.body.should.have.property("successMessage").eql("Your message is sent");
      res.body.should.be.a("object");
      res.body.data.should.be.a("array");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should send an email with read status", function (done) {
    _chai.default.request(_app.default).post("/api/v1/messages").send(_mock.readMessage).set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.status(201);
      res.body.should.have.property("status").eql(201);
      res.body.should.have.property("successMessage").eql("Your message is read");
      res.body.should.be.a("object");
      res.body.data.should.be.a("array");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should send an email with draft status", function (done) {
    _chai.default.request(_app.default).post("/api/v1/messages").send(_mock.draftMessage).set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.status(201);
      res.body.should.have.property("status").eql(201);
      res.body.should.have.property("successMessage").eql("Your message is drafted");
      res.body.should.be.a("object");
      res.body.data.should.be.a("array");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should not send an email when the senderId and receiverId are the same", function (done) {
    _chai.default.request(_app.default).post("/api/v1/messages").send(_mock.falseReadMessage).set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.status(400);
      res.body.should.have.property("status").eql(400);
      res.body.should.have.property("error").eql("The senderId and receiverId must not be the same");
      res.body.should.be.a("object");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should not send an email when the receiverId is not registered", function (done) {
    _chai.default.request(_app.default).post("/api/v1/messages").send(_mock.unregisteredReceiver).set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.status(404);
      res.body.should.have.property("status").eql(404);
      res.body.should.have.property("error").eql("The receiverId is not registered");
      res.body.should.be.a("object");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should not send an email when The senderId is not registered", function (done) {
    _chai.default.request(_app.default).post("/api/v1/messages").send(_mock.unregisteredSender).set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.status(404);
      res.body.should.have.property("status").eql(404);
      res.body.should.have.property("error").eql("The senderId is not registered");
      res.body.should.be.a("object");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should not send an email when the message is empty or less 3 than characters", function (done) {
    _chai.default.request(_app.default).post("/api/v1/messages").send(_mock.emptyMessage).set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.be.a("object");
      res.body.should.have.property('error');
      res.body.should.have.status(400);
      res.body.error.should.be.a("array");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should retrieve all received emails", function (done) {
    _chai.default.request(_app.default).get("/api/v1/messages").set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.status(200);
      res.body.should.have.property("status").eql(200);
      res.body.should.have.property("successMessage").eql("Received emails");
      res.body.should.be.a("object");
      res.body.data.should.be.a("array");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should received read emails", function (done) {
    _chai.default.request(_app.default).get("/api/v1/messages/read").set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.status(200);
      res.body.should.have.property("status").eql(200);
      res.body.should.have.property("successMessage").eql("Received read emails");
      res.body.should.be.a("object");
      res.body.data.should.be.a("array");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should received all unread emails", function (done) {
    _chai.default.request(_app.default).get("/api/v1/messages/unread").set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.status(200);
      res.body.should.have.property("status").eql(200);
      res.body.should.have.property("successMessage").eql("Received unread emails");
      res.body.should.be.a("object");
      res.body.data.should.be.a("array");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should retrieve all sent emails", function (done) {
    _chai.default.request(_app.default).get("/api/v1/messages/sent").set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.status(200);
      res.body.should.have.property("status").eql(200);
      res.body.should.have.property("successMessage").eql("Sent emails");
      res.body.should.be.a("object");
      res.body.data.should.be.a("array");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should retrieve a specific email", function (done) {
    _chai.default.request(_app.default).get("/api/v1/messages/1").set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.status(200);
      res.body.should.have.property("status").eql(200);
      res.body.should.have.property("successMessage").eql("Specific Email received");
      res.body.should.be.a("object");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should not retrieve a specific email if the emailId is not an integer", function (done) {
    _chai.default.request(_app.default).get("/api/v1/messages/test").set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.property("error").eql("\"emailId\" must be a number");
      res.body.should.be.a("object");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should delete a specific email", function (done) {
    _chai.default.request(_app.default).delete("/api/v1/messages/1").set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.status(200);
      res.body.should.have.property("status").eql(200);
      res.body.should.have.property("successMessage").eql("Email is deleted");
      res.body.should.be.a("object");
      done();
    });
  }); // eslint-disable-next-line no-undef

  it("Should not retrieve the email if it is already deleted", function (done) {
    _chai.default.request(_app.default).get("/api/v1/messages/1").set('Authorization', "Bearer ".concat(authToken)).end(function (err, res) {
      res.body.should.have.status(404);
      res.body.should.have.property("status").eql(404);
      res.body.should.have.property("error").eql("Email is not found");
      res.body.should.be.a("object");
      done();
    });
  });
});