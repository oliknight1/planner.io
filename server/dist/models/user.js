"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.user_schema = void 0;
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.user_schema = new Schema({
    display_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});
exports.user_schema.set('toJSON', {
    transform: (_document, returned_object) => {
        returned_object.id = returned_object._id.toString();
        delete returned_object._id;
        delete returned_object.__v;
        // the passwordHash should not be revealed
        delete returned_object.passwordHash;
    },
});
exports.User = mongoose_1.default.model('User', exports.user_schema);
//# sourceMappingURL=user.js.map