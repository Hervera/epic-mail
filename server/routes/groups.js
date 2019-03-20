import express from 'express';
import groupController from '../controllers/groupController';

const router = express.Router();

router.get("/", groupController.index);
router.post("/", groupController.store);
router.get("/:id", groupController.show);
router.put("/:id", groupController.update);
router.delete("/:id", groupController.delete);

export default router;
