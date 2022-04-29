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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const project_1 = require("../models/project");
const BaseController_1 = require("./BaseController");
class ProjectController extends BaseController_1.BaseController {
}
exports.ProjectController = ProjectController;
_a = ProjectController;
ProjectController.get_project = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        response.status(400).json({ error: 'Invalid ID supplied' });
        return;
    }
    const query = [
        {
            path: 'columns',
            populate: {
                path: 'tasks',
                populate: {
                    path: 'users',
                    select: 'display_name',
                },
            },
        },
        {
            path: 'users',
            select: ['display_name'],
        },
    ];
    const doc = yield project_1.Project.findById(id).populate(query);
    if (doc) {
        response.status(200).send(doc.toJSON());
    }
    else {
        response.status(404).json({ error: 'Project not found' });
    }
});
ProjectController.get_all_projects = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const query = [
        {
            path: 'users',
            select: ['display_name'],
        },
    ];
    _a.get_all(request, response, project_1.Project, query);
});
ProjectController.create = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, users, columns } = request.body;
    const user_ids = users.map((user) => user.id);
    const token = _a.verify_token(request, response);
    if (!token) {
        response.status(401).json({ error: 'Auth token missing or invalid' });
        return;
    }
    if (!title || title.length === 0) {
        response.status(400).json({ error: 'title cannot be empty' });
        return;
    }
    const project = new project_1.Project({
        title,
        users: user_ids,
        columns,
    });
    try {
        const saved_project = yield project.save();
        response.status(201).json(saved_project);
    }
    catch (error) {
        if (error instanceof Error) {
            const { message } = error;
            response.status(400).json({ error: message });
        }
    }
});
ProjectController.add_task = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { task_id } = request.body[0];
    if (!mongoose_1.default.isValidObjectId(id)) {
        response.status(400).json({ error: 'Invalid ID supplied' });
        return;
    }
    const token = _a.verify_token(request, response);
    if (!token) {
        response.status(401).json({ error: 'Auth token missing or invalid' });
        return;
    }
    const project = yield project_1.Project.findById(id);
    if (!project) {
        response.status(404).json({ error: 'Project not found' });
        return;
    }
    const backlog_tasks = [
        ...project.columns[0].tasks, new mongoose_1.default.Types.ObjectId(task_id)
    ];
    project.columns[0].tasks = backlog_tasks;
    try {
        yield project.save();
        response.status(200).json(project);
    }
    catch (error) {
        if (error instanceof Error) {
            const { message } = error;
            response.status(400).json({ error: message });
        }
    }
});
ProjectController.update = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        response.status(400).json({ error: 'Invalid ID supplied' });
        return;
    }
    const token = _a.verify_token(request, response);
    if (!token) {
        response.status(401).json({ error: 'Auth token missing or invalid' });
        return;
    }
    const project = yield project_1.Project.findById(id);
    if (!project) {
        response.status(404).json({ error: 'Project not found' });
        return;
    }
    project.columns = request.body;
    try {
        yield project.save();
        response.status(200).json(project);
    }
    catch (error) {
        if (error instanceof Error) {
            const { message } = error;
            response.status(400).json({ error: message });
        }
    }
});
ProjectController.remove_project = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    _a.remove(request, response, project_1.Project);
});
ProjectController.remove_task = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const project_id = request.params.id;
    if (!mongoose_1.default.isValidObjectId(project_id)) {
        response.status(400).json({ error: 'Invalid ID supplied' });
        return;
    }
    const token = _a.verify_token(request, response);
    if (!token) {
        response.status(401).json({ error: 'Auth token missing or invalid' });
        return;
    }
    const project = yield project_1.Project.findById(project_id);
    if (!project) {
        response.status(404).json({ error: 'Project not found' });
        return;
    }
    const { column_id, task_id } = request.body;
    const task_obj_id = new mongoose_1.default.Types.ObjectId(task_id);
    try {
        yield project_1.Project.findOneAndUpdate({ _id: project_id, 'columns._id': column_id }, {
            $pull: {
                'columns.$.tasks': task_obj_id,
            },
        });
        response.status(200).json(project_1.Project.findById(project_id));
    }
    catch (error) {
        if (error instanceof Error) {
            const { message } = error;
            response.status(400).json({ error: message });
        }
    }
});
//# sourceMappingURL=ProjectController.js.map