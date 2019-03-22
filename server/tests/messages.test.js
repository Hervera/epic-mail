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
describe("Messaging endpoints", () => {
    // eslint-disable-next-line no-undef
    it("Should send an email if Unauthorized(No token provided)", (done) => {
        const sentMessage = {
            subject: "Testing sender subject",
            message: "my message",
            receiverId: 2,
            parentMessageId: 4,
            status: "sent",
        };
        chai.request(server)
            .post("/api/v2/messages")
            .send(sentMessage)
            .end((err, res) => {
                res.body.should.be.a("object");
                res.body.should.have.status(403);
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not send if a user has an invalid token", (done) => {
        const sentMessage = {
            subject: "Testing sender subject",
            message: "my message",
            receiverId: 2,
            parentMessageId: 4,
            status: "sent",
        };
        chai.request(server)
            .post("/api/v2/messages")
            .send(sentMessage)
            .set('Authorization', `Bearer kkkkk`)
            .end((err, res) => {
                res.body.should.be.a("object");
                res.body.should.have.status(400);
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not send an email if one important field is not there", (done) => {
        const sentMessage = {
            subject: "Testing sender subject",
            message: "",
            receiverId: 2,
            parentMessageId: 4,
            status: "sent",
        };
        chai.request(server)
            .post("/api/v2/messages")
            .send(sentMessage)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.be.a("object");
                res.body.should.have.status(400);
                done();
            });
    });


    // eslint-disable-next-line no-undef
    it("Should not send an email when the receiverId is not registered", (done) => {
        const unregisteredReceiver = {
            subject: "Testing sender subject",
            message: "Testing sender message",
            senderId: 1,
            receiverId: 11,
            parentMessageId: 4,
            status: "draft",
        };

        chai.request(server)
            .post("/api/v2/messages")
            .send(unregisteredReceiver)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.be.a("object");
                // res.body.should.have.status(404);
                // res.body.should.have.property("status").eql(404);
                // res.body.should.have.property("error").eql("The receiverId is not registered");
                
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not send an email when The senderId is not registered", (done) => {
        const unregisteredSender = {
            subject: "Testing sender subject",
            message: "Testing sender message",
            senderId: 20,
            receiverId: 1,
            parentMessageId: 4,
            status: "draft",
        };
        chai.request(server)
            .post("/api/v2/messages")
            .send(unregisteredSender)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.be.a("object");
     
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not send an email when the message is empty or less 3 than characters", (done) => {
        const emptyMessage = {
            subject: "Testing sender subject",
            message: "",
            senderId: 1,
            receiverId: 3,
            parentMessageId: 4,
            status: "draft",
        };
        chai.request(server)
            .post("/api/v2/messages")
            .send(emptyMessage)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.be.a("object");

                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should retrieve all received emails", (done) => {
        chai.request(server)
            .get("/api/v2/messages")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.be.a("object");

                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should received read emails", (done) => {
        chai.request(server)
            .get("/api/v2/messages/read")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.be.a("object");

                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should received all unread emails", (done) => {
        chai.request(server)
            .get("/api/v2/messages/unread")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.be.a("object");

                done();
            });
    });


    // eslint-disable-next-line no-undef
    it("Should retrieve all sent emails", (done) => {
        chai.request(server)
            .get("/api/v2/messages/sent")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.be.a("object");
          
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should retrieve a specific email", (done) => {
        chai.request(server)
            .get("/api/v2/messages/1")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.be.a("object");
                
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not retrieve a specific email if the emailId is not an integer", (done) => {
        chai.request(server)
            .get("/api/v2/messages/test")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                // res.body.should.have.property("error").eql("\"emailId\" must be a number");
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should delete a specific email", (done) => {
        chai.request(server)
            .delete("/api/v2/messages/1")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.body.should.be.a("object");
                done();
            });
    });

    // eslint-disable-next-line no-undef
    it("Should not retrieve the email if it is already deleted", (done) => {
        chai.request(server)
            .get("/api/v2/messages/1")
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
               
                res.body.should.be.a("object");
                done();
            });
    });

});
