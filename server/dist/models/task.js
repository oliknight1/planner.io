"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.task_schema = void 0;
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.task_schema = new Schema({
    title: { type: String, required: true },
    body_text: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    tags: [{ type: String }],
    due_date: Date,
    column: [{ type: Schema.Types.ObjectId, ref: 'Column' }],
    dependant_tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});
exports.task_schema.set('toJSON', {
    transform: (_document, returned_object) => {
        returned_object.id = returned_object._id.toString();
        delete returned_object._id;
        delete returned_object.__v;
    },
});
exports.Task = mongoose_1.default.model('Task', exports.task_schema);
//# sourceMappingURL=task.js.map