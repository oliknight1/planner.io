"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.task_router = void 0;
const express_1 = __importDefault(require("express"));
const TaskController_1 = require("../controllers/TaskController");
exports.task_router = express_1.default.Router();
exports.task_router.get('/id/:id', TaskController_1.TaskController.get_task);
exports.task_router.delete('/id/:id', TaskController_1.TaskController.remove_task);
exports.task_router.post('/', TaskController_1.TaskController.create);
exports.task_router.patch('/id/:id', TaskController_1.TaskController.update);
//# sourceMappingURL=tasks.js.map