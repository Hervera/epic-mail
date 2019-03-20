class Message {
    constructor(id, createdOn, subject, message, senderId, receiverId, parentMessageId, status) {
        this.id = id;
        this.subject = subject;
        this.message = message;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.parentMessageId = parentMessageId;
        this.status = status;
        this.createdOn = createdOn;
    }
}

export default Message;
