"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_router = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const UserController_1 = require("../controllers/UserController");
exports.user_router = express_1.default.Router();
exports.user_router.get('/id/:id', UserController_1.UserController.get_user);
exports.user_router.get('/email/:email', (0, express_validator_1.param)('email').isEmail().normalizeEmail(), UserController_1.UserController.get_by_email);
//# sourceMappingURL=users.js.map