import express from 'express';
import auth from '../middleware/auth';
import groupController from '../controllers/groupController';
import groupMemberController from '../controllers/groupMemberController';


const router = express.Router();

// CRUD Operations for groups
router.get("/", auth.verifyToken, groupController.index);
router.post("/", auth.verifyToken, groupController.store);
router.get("/:id", auth.verifyToken, groupController.show);
router.put("/:id", auth.verifyToken, groupController.update);
router.delete("/:id", auth.verifyToken, groupController.delete);

// CRUD operations for group members 
router.post("/:id/users", auth.verifyToken, groupMemberController.addMember);
router.get("/:id/users", auth.verifyToken, groupMemberController.getMembers);
router.delete("/:groupId/:users/:memberId", auth.verifyToken, groupMemberController.deleteMember);

export default router;
