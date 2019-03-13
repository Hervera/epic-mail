"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _messageController = _interopRequireDefault(require("../controllers/messageController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post("/", _auth.default.verifyToken, _messageController.default.sendMail);
router.get("/", _auth.default.verifyToken, _messageController.default.receivedEmails);
router.get("/sent", _auth.default.verifyToken, _messageController.default.sentEmails);
router.get("/read", _auth.default.verifyToken, _messageController.default.receivedReadEmails);
router.get("/unread", _auth.default.verifyToken, _messageController.default.receivedUnreadEmails);
router.get("/draft", _auth.default.verifyToken, _messageController.default.draftEmails);
router.get("/:id", _auth.default.verifyToken, _messageController.default.showSpecificEmail);
router.delete("/:id", _auth.default.verifyToken, _messageController.default.deleteSpecificEmail);
var _default = router;
exports.default = _default;