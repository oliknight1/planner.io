"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.project_schema = void 0;
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const column_schema = new Schema({
    title: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});
column_schema.set('toJSON', {
    transform: (_document, returned_object) => {
        returned_object.id = returned_object._id.toString();
        delete returned_object._id;
        delete returned_object.__v;
    },
});
exports.project_schema = new Schema({
    title: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    columns: [column_schema],
});
exports.project_schema.set('toJSON', {
    transform: (_document, returned_object) => {
        returned_object.id = returned_object._id.toString();
        delete returned_object._id;
        delete returned_object.__v;
    },
});
exports.Project = mongoose_1.default.model('Project', exports.project_schema);
//# sourceMappingURL=project.js.map