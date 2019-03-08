import chai from "chai";
import chaiHTTP from "chai-http";
import server from "../app";

chai.use(chaiHTTP);
chai.should();

const sentMessage = {
    subject: "Hello",
    message: "How are you?",
    senderId: 1,
    receiverId: 2,
    parentMessageId: 4,
    status: "sent",
};

const readMessage = {
    subject: "Hello",
    message: "How are you?",
    senderId: 2,
    receiverId: 1,
    parentMessageId: 5,
    status: "read",
};

const draftMessage = {
    subject: "Hello",
    message: "How are you?",
    senderId: 3,
    receiverId: 1,
    parentMessageId: 6,
    status: "draft",
};

const falseReadMessage = {
    subject: "Hello",
    message: "How are you?",
    senderId: 1,
    receiverId: 1,
    parentMessageId: 4,
    status: "read",
};

const unregisteredReceiver = {
    subject: "Hello",
    message: "How are you?",
    senderId: 1,
    receiverId: 11,
    parentMessageId: 4,
    status: "draft",
};

const unregisteredSender = {
    subject: "Hello",
    message: "How are you?",
    senderId: 20,
    receiverId: 1,
    parentMessageId: 4,
    status: "draft",
};

const emptyMessage = {
    subject: "Hello",
    message: "",
    senderId: 1,
    receiverId: 3,
    parentMessageId: 4,
    status: "draft",
};

// eslint-disable-next-line no-undef
describe("EMAIL ENDPOINT TESTS", () => {
    // eslint-disable-next-line no-undef
    it("Should send an email with sent status", (done) => {
        chai.request(server)
            .post("/api/v1/messages")
            .send(sentMessage)
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(201);
                res.body.should.have.property("status").eql(201);
                res.body.should.have.property("success").eql("email sent");
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
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(201);
                res.body.should.have.property("status").eql(201);
                res.body.should.have.property("success").eql("email read");
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
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(201);
                res.body.should.have.property("status").eql(201);
                res.body.should.have.property("success").eql("email drafted");
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not send an email when the sender id and receiver id are the same", (done) => {
        chai.request(server)
            .post("/api/v1/messages")
            .send(falseReadMessage)
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(400);
                res.body.should.have.property("status").eql(400);
                res.body.should.have.property("error").eql("the sender id and receiver id must not be the same");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not send an email when the receiver is not registerd", (done) => {
        chai.request(server)
            .post("/api/v1/messages")
            .send(unregisteredReceiver)
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(404);
                res.body.should.have.property("status").eql(404);
                res.body.should.have.property("error").eql("the receiver is not registered");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not send an email when the sender is not registerd", (done) => {
        chai.request(server)
            .post("/api/v1/messages")
            .send(unregisteredSender)
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(404);
                res.body.should.have.property("status").eql(404);
                res.body.should.have.property("error").eql("the sender is not registered");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not send an email when the message is empty", (done) => {
        chai.request(server)
            .post("/api/v1/messages")
            .send(emptyMessage)
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.property("error").eql("\"message\" is not allowed to be empty");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should retrieve all received emails", (done) => {
        chai.request(server)
            .get("/api/v1/messages")
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property("status").eql(200);
                res.body.should.have.property("success").eql("received emails retrieved");
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should retrieve read emails", (done) => {
        chai.request(server)
            .get("/api/v1/messages/read")
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property("status").eql(200);
                res.body.should.have.property("success").eql("read emails retrieved");
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should retrieve sent emails", (done) => {
        chai.request(server)
            .get("/api/v1/messages/sent")
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property("status").eql(200);
                res.body.should.have.property("success").eql("sent emails retrieved");
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should retrieve a specific email", (done) => {
        chai.request(server)
            .get("/api/v1/messages/1")
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property("status").eql(200);
                res.body.should.have.property("success").eql("email retrieved");
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not retrieve a specific email if the email id is not integer", (done) => {
        chai.request(server)
            .get("/api/v1/messages/test")
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.property("error").eql("\"emailId\" must be a number");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not delete a specific email if the email id is not integer", (done) => {
        chai.request(server)
            .delete("/api/v1/messages/test")
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.property("error").eql("\"emailId\" must be a number");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should delete a specific email 1", (done) => {
        chai.request(server)
            .delete("/api/v1/messages/1")
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property("status").eql(200);
                res.body.should.have.property("success").eql("email deleted");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should delete a specific email 2", (done) => {
        chai.request(server)
            .delete("/api/v1/messages/2")
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property("status").eql(200);
                res.body.should.have.property("success").eql("email deleted");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should delete a specific email 3", (done) => {
        chai.request(server)
            .delete("/api/v1/messages/3")
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property("status").eql(200);
                res.body.should.have.property("success").eql("email deleted");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not retrieve the email 1 because it will have been deleted", (done) => {
        chai.request(server)
            .get("/api/v1/messages/1")
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(404);
                res.body.should.have.property("status").eql(404);
                res.body.should.have.property("error").eql("email not found");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not retrieve the email 2 because it will have been deleted", (done) => {
        chai.request(server)
            .get("/api/v1/messages/2")
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(404);
                res.body.should.have.property("status").eql(404);
                res.body.should.have.property("error").eql("email not found");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not retrieve the email 3 because it will have been deleted", (done) => {
        chai.request(server)
            .get("/api/v1/messages/3")
            .set("Accept", "Application/JSON")
            .end((err, res) => {
                res.body.should.have.status(404);
                res.body.should.have.property("status").eql(404);
                res.body.should.have.property("error").eql("email not found");
                res.body.should.be.a("object");
                done();
            });
    });
});
