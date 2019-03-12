
const sentMessage = {
    subject: "Testing sender subject",
    message: "Testing sender message",
    senderId: 1,
    receiverId: 2,
    parentMessageId: 4,
    status: "sent",
};

const readMessage = {
    subject: "Testing sender subject",
    message: "Testing sender message",
    senderId: 2,
    receiverId: 1,
    parentMessageId: 5,
    status: "read",
};

const draftMessage = {
    subject: "Testing sender subject",
    message: "Testing sender message",
    senderId: 3,
    receiverId: 1,
    parentMessageId: 6,
    status: "draft",
};

const falseReadMessage = {
    subject: "Testing sender subject",
    message: "Testing sender message",
    senderId: 1,
    receiverId: 1,
    parentMessageId: 4,
    status: "read",
};

const unregisteredReceiver = {
    subject: "Testing sender subject",
    message: "Testing sender message",
    senderId: 1,
    receiverId: 11,
    parentMessageId: 4,
    status: "draft",
};

const unregisteredSender = {
    subject: "Testing sender subject",
    message: "Testing sender message",
    senderId: 20,
    receiverId: 1,
    parentMessageId: 4,
    status: "draft",
};

const emptyMessage = {
    subject: "Testing sender subject",
    message: "",
    senderId: 1,
    receiverId: 3,
    parentMessageId: 4,
    status: "draft",
};

export {
    sentMessage, readMessage, draftMessage, falseReadMessage,
    unregisteredReceiver, unregisteredSender, emptyMessage,
};
