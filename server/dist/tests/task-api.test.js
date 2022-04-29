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
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
const db = __importStar(require("./helpers/test_db_helper"));
const helpers = __importStar(require("./helpers/test_helper"));
const task_1 = require("../models/task");
const api = (0, supertest_1.default)(app_1.app);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.connect();
    yield task_1.Task.deleteMany({});
    const task_data = {
        title: 'Test Task',
        body_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel gravida tellus. Aenean eu cursus lacus. Sed fermentum augue at pulvinar semper. Phasellus vel justo magna. Phasellus vitae vulputate dolor, nec pellentesque risus. Nunc placerat metus quis hendrerit tristique.',
        users: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
        project: new mongoose_1.default.Types.ObjectId(),
        tags: ['Test tag 1', 'Test tag 2'],
        column: new mongoose_1.default.Types.ObjectId(),
        due_date: new Date(),
        dependant_tasks: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
    };
    const task = yield new task_1.Task(task_data);
    yield task.save();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.close();
}));
describe('Testing task GET routes', () => {
    test('Task is successfully retrieved', () => __awaiter(void 0, void 0, void 0, function* () {
        const task_to_find = yield helpers.get_target_task();
        const response = yield api
            .get(`/api/tasks/id/${task_to_find.id}`)
            .expect(200)
            .expect('Content-type', /application\/json/);
        expect(response.body).toEqual(JSON.parse(JSON.stringify(task_to_find)));
    }));
    test('Return 404 when no task found', () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield helpers.get_target_task();
        const real_id = project.id;
        const fake_id = helpers.generate_fake_id(real_id);
        const response = yield api
            .get(`/api/tasks/id/${fake_id}`)
            .expect(404)
            .expect('Content-type', /application\/json/);
        expect(response.body.error).toEqual('Task not found');
    }));
});
describe('Testing task DELETE routes', () => {
    test('Successfull deletion', () => __awaiter(void 0, void 0, void 0, function* () {
        const tasks_pre_test = yield helpers.tasks_in_db();
        const task_to_delete = yield helpers.get_target_task();
        const { id } = task_to_delete;
        yield api
            .delete(`/api/tasks/id/${id}`)
            .set('Authorization', `Bearer ${helpers.token}`)
            .expect(204);
        const tasks_post_test = yield helpers.tasks_in_db;
        expect(tasks_post_test.length).toEqual(tasks_pre_test.length - 1);
    }));
});
describe('Testing task POST routes', () => {
    test('Task is successfully created', () => __awaiter(void 0, void 0, void 0, function* () {
        const tasks_pre_test = yield helpers.tasks_in_db();
        const new_task = {
            title: 'new task',
            body_text: 'task body',
            users: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
            project: new mongoose_1.default.Types.ObjectId(),
            tags: ['tag1', 'tag2'],
            column: new mongoose_1.default.Types.ObjectId(),
            due_date: new Date(),
            dependant_tasks: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
        };
        yield api
            .post('/api/tasks')
            .send(new_task)
            .expect(201)
            .set('Authorization', `Bearer ${helpers.token}`)
            .expect('Content-type', /application\/json/);
        const tasks_post_test = yield helpers.tasks_in_db();
        expect(tasks_post_test.length).toEqual(tasks_pre_test.length + 1);
        const titles = tasks_post_test.map((task) => task.title);
        expect(titles).toContain(new_task.title);
    }));
    test('Task is automatically assigned authed user', () => __awaiter(void 0, void 0, void 0, function* () {
        const tasks_pre_test = yield helpers.tasks_in_db();
        const new_task = {
            title: 'new task',
            body_text: 'task body',
            users: [],
            project: new mongoose_1.default.Types.ObjectId(),
            tags: ['tag1', 'tag2'],
            column: new mongoose_1.default.Types.ObjectId(),
            due_date: new Date(),
            dependant_tasks: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
        };
        yield api
            .post('/api/tasks')
            .send(new_task)
            .expect(201)
            .set('Authorization', `Bearer ${helpers.token}`)
            .expect('Content-type', /application\/json/);
        const tasks_post_test = yield helpers.tasks_in_db();
        expect(tasks_post_test.length).toEqual(tasks_pre_test.length + 1);
        expect(tasks_post_test[tasks_post_test.length - 1].users).toEqual([helpers.token_id]);
    }));
    test('Task creations fails with empty title', () => __awaiter(void 0, void 0, void 0, function* () {
        const tasks_pre_test = yield helpers.tasks_in_db();
        const new_task = {
            title: '',
            body_text: 'task body',
            users: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
            project: new mongoose_1.default.Types.ObjectId(),
            tags: ['tag1', 'tag2'],
            column: new mongoose_1.default.Types.ObjectId(),
            due_date: new Date(),
            dependant_tasks: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
        };
        const response = yield api
            .post('/api/tasks')
            .send(new_task)
            .expect(400)
            .expect('Content-type', /application\/json/);
        const tasks_post_test = yield helpers.tasks_in_db();
        expect(tasks_post_test.length).toEqual(tasks_pre_test.length);
        expect(response.body.error).toContain('Title cannot be empty');
    }));
});
describe('Testing task PATCH routes', () => {
    test('Task is successfully patched', () => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield helpers.get_target_task();
        const { id } = task;
        yield api
            .patch(`/api/tasks/id/${id}`)
            .set('Authorization', `Bearer ${helpers.token}`)
            .send({ title: 'new title' })
            .expect(200);
        const tasks_post_test = yield helpers.get_target_task();
        expect(tasks_post_test.title).toEqual('new title');
    }));
    test('404 error if task not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield helpers.get_target_task();
        const real_id = task.id;
        const id = helpers.generate_fake_id(real_id);
        yield api
            .patch(`/api/tasks/id/${id}`)
            .send({ title: 'new title' })
            .set('Authorization', `Bearer ${helpers.token}`)
            .expect(404)
            .expect('Content-type', /application\/json/);
        const tasks_post_test = yield helpers.get_target_task();
        expect(tasks_post_test.title).toEqual(task.title);
    }));
});
//# sourceMappingURL=task-api.test.js.map