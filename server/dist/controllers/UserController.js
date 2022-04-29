"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_validator_1 = require("express-validator");
const user_1 = require("../models/user");
const BaseController_1 = require("./BaseController");
class UserController extends BaseController_1.BaseController {
}
exports.UserController = UserController;
_a = UserController;
UserController.get_user = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    _a.get_by_id(request, response, user_1.User);
});
UserController.get_by_email = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.params;
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        response.status(400).json({ error: 'Invalid email supplied' });
        return;
    }
    const user = yield user_1.User.findOne({ email });
    if (user) {
        response.status(200).send(user.toJSON());
    }
    else {
        response.status(404).json({ error: 'User not found' });
    }
});
//# sourceMappingURL=UserController.js.map