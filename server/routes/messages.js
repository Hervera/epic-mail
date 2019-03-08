import express from 'express';
import messageController from '../controllers/messageController';

const router = express.Router();

router.post("/", messageController.sendMail);
router.get("/", messageController.receivedEmails);
router.get("/sent", messageController.sentEmails);
router.get("/read", messageController.receivedReadEmails);
router.get("/unread", messageController.receivedUnreadEmails);
router.get("/:id", messageController.showSpecificEmail);
router.delete("/:id", messageController.deleteSpecificEmail);

export default router;
