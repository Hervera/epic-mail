import express from 'express';
import auth from '../middleware/auth';
import groupController from '../controllers/groupController';

const router = express.Router();

router.get("/", auth.verifyToken, groupController.index);
router.post("/", auth.verifyToken, groupController.store);
router.get("/:id", auth.verifyToken, groupController.show);
router.put("/:id", auth.verifyToken, groupController.update);
router.delete("/:id", auth.verifyToken, groupController.delete);

export default router;
