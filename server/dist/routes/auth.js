"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_router = void 0;
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const validator_1 = require("../utils/validator");
exports.auth_router = express_1.default.Router();
exports.auth_router.post('/login', AuthController_1.AuthController.login);
exports.auth_router.post('/register', (0, validator_1.user_validation_rules)(), validator_1.validate, AuthController_1.AuthController.create);
exports.auth_router.post('/verify-token', AuthController_1.AuthController.verify_user);
//# sourceMappingURL=auth.js.map