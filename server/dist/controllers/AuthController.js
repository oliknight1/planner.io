"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = require("../models/user");
const BaseController_1 = require("./BaseController");
const config_1 = require("../utils/config");
class AuthController extends BaseController_1.BaseController {
}
exports.AuthController = AuthController;
_a = AuthController;
AuthController.login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    const user = yield user_1.User.findOne({ email });
    // If user doesnt exist, value will be false and will not check password
    const correct_password = user === null
        ? false : yield bcrypt_1.default.compare(password, user.password);
    if (!user || !correct_password) {
        response.status(401).json({ error: 'Incorrect email or password' });
        return;
    }
    const token_data = {
        display_name: user.display_name,
        email: user.email,
        id: user.id,
    };
    const token = jwt.sign(token_data, config_1.JWT_SECRET, {
        expiresIn: config_1.JWT_EXPIRES_IN,
    });
    response.status(200).send({
        token,
        display_name: user.display_name,
        email: user.email,
        id: user.id,
    });
});
AuthController.create = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { display_name, email, password, password_confirm, } = request.body;
    const user_exists = yield user_1.User.findOne({ email });
    if (user_exists) {
        response.status(400).json({
            error: 'Account with that email already exists',
        });
        return;
    }
    if (password !== password_confirm) {
        response.status(400).json({ error: 'Passwords do not match' });
        return;
    }
    const salt_rounds = 10;
    const password_hash = yield bcrypt_1.default.hash(password, salt_rounds);
    const user = new user_1.User({
        display_name,
        email,
        password: password_hash,
        tasks: [],
        projects: [],
    });
    try {
        const saved_user = yield user.save();
        const token_data = {
            display_name: saved_user.display_name,
            email: user.email,
            id: saved_user.id,
        };
        const token = jwt.sign(token_data, process.env.JWT_SECRET, {
            expiresIn: config_1.JWT_EXPIRES_IN,
        });
        response.status(201).send({
            token,
            display_name: user.display_name,
            email: user.email,
            id: user.id,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            const { message } = error;
            response.status(400).json({ error: message });
        }
    }
});
AuthController.verify_user = (request, response) => {
    const verified = _a.verify_token(request, response);
    if (verified) {
        response.status(200).send();
    }
};
//# sourceMappingURL=AuthController.js.map