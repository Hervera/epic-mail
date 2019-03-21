import chai from "chai";
import chaiHTTP from "chai-http";
import server from "../app";

import {
    sentMessage, readMessage, draftMessage, falseReadMessage, unregisteredReceiver,
    unregisteredSender, emptyMessage,
} from "./mock.test";

chai.should();
chai.use(chaiHTTP);

// eslint-disable-next-line no-undef
describe("Messsaging endpoints", () => {

    let authToken;
    // eslint-disable-next-line no-undef
    before((done) => {
        const user = {
            email: 'herveralive@gmail.com',
            password: 'secret'
        };

        chai.request(server).post('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                authToken = res.body.data[0].token; // save the token
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should send an email with sent status", (done) => {
        chai.request(server)
            .post("/api/v1/messages")
            .send(sentMessage)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.status(201);
                res.body.should.have.property("status").eql(201);
                res.body.should.have.property("successMessage").eql("Your message is sent");
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should send an email with read status", (done) => {
        chai.request(server)
            .post("/api/v1/messages")
            .send(readMessage)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.status(201);
                res.body.should.have.property("status").eql(201);
                res.body.should.have.property("successMessage").eql("Your message is read");
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should send an email with draft status", (done) => {
        chai.request(server)
            .post("/api/v1/messages")
            .send(draftMessage)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.status(201);
                res.body.should.have.property("status").eql(201);
                res.body.should.have.property("successMessage").eql("Your message is drafted");
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not send an email when the senderId and receiverId are the same", (done) => {
        chai.request(server)
            .post("/api/v1/messages")
            .send(falseReadMessage)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.status(400);
                res.body.should.have.property("status").eql(400);
                res.body.should.have.property("error").eql("The senderId and receiverId must not be the same");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not send an email when the receiverId is not registered", (done) => {
        chai.request(server)
            .post("/api/v1/messages")
            .send(unregisteredReceiver)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.status(404);
                res.body.should.have.property("status").eql(404);
                res.body.should.have.property("error").eql("The receiverId is not registered");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not send an email when The senderId is not registered", (done) => {
        chai.request(server)
            .post("/api/v1/messages")
            .send(unregisteredSender)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.status(404);
                res.body.should.have.property("status").eql(404);
                res.body.should.have.property("error").eql("The senderId is not registered");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not send an email when the message is empty or less 3 than characters", (done) => {
        chai.request(server)
            .post("/api/v1/messages")
            .send(emptyMessage)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.be.a("object");
                res.body.should.have.property('error');
                res.body.should.have.status(400);
                res.body.error.should.be.a("array");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should retrieve all received emails", (done) => {
        chai.request(server)
            .get("/api/v1/messages")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property("status").eql(200);
                res.body.should.have.property("successMessage").eql("Received emails");
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should received read emails", (done) => {
        chai.request(server)
            .get("/api/v1/messages/read")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property("status").eql(200);
                res.body.should.have.property("successMessage").eql("Received read emails");
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should received all unread emails", (done) => {
        chai.request(server)
            .get("/api/v1/messages/unread")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property("status").eql(200);
                res.body.should.have.property("successMessage").eql("Received unread emails");
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                done();
            });
    });


    // eslint-disable-next-line no-undef
    it("Should retrieve all sent emails", (done) => {
        chai.request(server)
            .get("/api/v1/messages/sent")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property("status").eql(200);
                res.body.should.have.property("successMessage").eql("Sent emails");
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should retrieve a specific email", (done) => {
        chai.request(server)
            .get("/api/v1/messages/1")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property("status").eql(200);
                res.body.should.have.property("successMessage").eql("Specific Email received");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not retrieve a specific email if the emailId is not an integer", (done) => {
        chai.request(server)
            .get("/api/v1/messages/test")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.property("error").eql("\"emailId\" must be a number");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should delete a specific email", (done) => {
        chai.request(server)
            .delete("/api/v1/messages/1")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property("status").eql(200);
                res.body.should.have.property("successMessage").eql("Email is deleted");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not retrieve the email if it is already deleted", (done) => {
        chai.request(server)
            .get("/api/v1/messages/1")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.have.status(404);
                res.body.should.have.property("status").eql(404);
                res.body.should.have.property("error").eql("Email is not found");
                res.body.should.be.a("object");
                done();
            });
    });

});
