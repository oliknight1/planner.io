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
exports.TaskController = void 0;
const mongoose_1 = require("mongoose");
const task_1 = require("../models/task");
const BaseController_1 = require("./BaseController");
class TaskController extends BaseController_1.BaseController {
}
exports.TaskController = TaskController;
_a = TaskController;
TaskController.get_task = (request, response) => __awaiter(void 0, void 0, void 0, function* () { return _a.get_by_id(request, response, task_1.Task); });
TaskController.remove_task = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    _a.remove(request, response, task_1.Task);
});
TaskController.create = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    if (!data.title || data.title.length === 0) {
        response.status(400).json({ error: 'Title cannot be empty' });
        return;
    }
    const token = _a.verify_token(request, response);
    if (!token) {
        response.status(401).json({ error: 'Auth token missing or invalid' });
        return;
    }
    const task = new task_1.Task(Object.assign({}, data));
    try {
        const saved_task = yield task.save();
        response.status(201).json(saved_task);
    }
    catch (error) {
        if (error instanceof Error) {
            const { message } = error;
            response.status(400).json({ error: message });
        }
    }
});
TaskController.update = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        response.status(400).json({ error: 'Invalid ID supplied' });
        return;
    }
    const token = _a.verify_token(request, response);
    if (!token) {
        response.status(401).json({ error: 'Auth token missing or invalid' });
        return;
    }
    const task = yield task_1.Task.findById(id);
    if (!task) {
        response.status(404).json({ error: 'Task not found' });
        return;
    }
    if (request.body.column) {
        const col_id = new mongoose_1.Types.ObjectId(request.body.column);
        task.column = col_id;
    }
    Object.keys(request.body).reduce((request_task, key) => {
        const updated_task = request_task;
        updated_task[key] = request.body[key];
        return updated_task;
    }, task);
    if (task) {
        try {
            yield task.save();
            response.status(200).json(task);
            return;
        }
        catch (error) {
            if (error instanceof Error) {
                const { message } = error;
                response.status(400).json({ error: message });
                return;
            }
        }
    }
    response.status(404).end();
});
//# sourceMappingURL=TaskController.js.map