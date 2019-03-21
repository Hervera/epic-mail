import express from 'express';
import auth from '../middleware/auth';
import messageController from '../controllers/messageController';

const router = express.Router();

router.post("/", auth.verifyToken, messageController.sendMail);
router.get("/", auth.verifyToken, messageController.receivedEmails);
router.get("/sent", auth.verifyToken, messageController.sentEmails);
router.get("/read", auth.verifyToken, messageController.receivedReadEmails);
router.get("/unread", auth.verifyToken, messageController.receivedUnreadEmails);
router.get("/draft", auth.verifyToken, messageController.draftEmails);
router.get("/:id", auth.verifyToken, messageController.showSpecificEmail);
router.delete("/:id", auth.verifyToken, messageController.deleteSpecificEmail);


export default router;
