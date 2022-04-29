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
const project_1 = require("../models/project");
const helpers = __importStar(require("./helpers/test_helper"));
const db = __importStar(require("./helpers/test_db_helper"));
const api = (0, supertest_1.default)(app_1.app);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.connect();
    yield project_1.Project.deleteMany({});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.close();
}));
describe('Testing project GET routes', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Create project for GET route to test
        const project_data = {
            title: 'Test Project',
            tasks: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
            users: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
            columns: [],
        };
        const project = yield new project_1.Project(project_data);
        yield project.save();
    }));
    test('Project is successfully retrieved', () => __awaiter(void 0, void 0, void 0, function* () {
        const project_to_find = yield helpers.get_target_project();
        const response = yield api
            .get(`/api/projects/id/${project_to_find.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.body.title).toEqual('Test Project');
        const processed_project_to_find = JSON.parse(JSON.stringify(project_to_find));
        expect(response.body).toEqual(processed_project_to_find);
    }));
    test('Returns 404 when no project is found', () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield helpers.get_target_project();
        const real_id = project.id;
        const fake_id = helpers.generate_fake_id(real_id);
        const response = yield api
            .get(`/api/projects/id/${fake_id}`)
            .expect(404)
            .expect('Content-type', /application\/json/);
        expect(response.body.error).toContain('Project not found');
    }));
});
describe('Testing project POST routes', () => {
    test('Project is successfully created', () => __awaiter(void 0, void 0, void 0, function* () {
        const projects_pre_test = yield helpers.projects_in_db();
        const new_project = {
            title: 'Test project',
            users: [],
            tasks: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
            columns: [],
        };
        yield api
            .post('/api/projects')
            .send(new_project)
            .expect(201)
            .set('Authorization', `Bearer ${helpers.token}`)
            .expect('Content-type', /application\/json/);
        const projects_post_test = yield helpers.projects_in_db();
        expect(projects_post_test.length).toEqual(projects_pre_test.length + 1);
        const titles = projects_post_test.map((project) => project.title);
        expect(titles).toContain(new_project.title);
        expect(projects_post_test[projects_post_test.length - 1].users)
            .toEqual([helpers.token_id]);
    }));
    test('Project creation fails if not authorized', () => __awaiter(void 0, void 0, void 0, function* () {
        const projects_pre_test = yield helpers.projects_in_db();
        const new_project = {
            title: 'Test project',
            users: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
            tasks: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
            columns: [],
        };
        const response = yield api
            .post('/api/projects')
            .send(new_project)
            .expect(401)
            .expect('Content-type', /application\/json/);
        expect(response.body.error).toContain('Auth token missing or invalid');
        const projects_post_test = yield helpers.projects_in_db();
        expect(projects_post_test.length).toEqual(projects_pre_test.length);
    }));
    test('Project creation fails with empty name', () => __awaiter(void 0, void 0, void 0, function* () {
        const projects_pre_test = yield helpers.projects_in_db();
        const new_project = {
            title: '',
            users: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
            tasks: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
            columns: [],
        };
        const response = yield api
            .post('/api/projects')
            .send(new_project)
            .expect(400)
            .set('Authorization', `Bearer ${helpers.token}`)
            .expect('Content-type', /application\/json/);
        const projects_post_test = yield helpers.projects_in_db();
        expect(projects_post_test.length).toEqual(projects_pre_test.length);
        expect(response.body.error).toContain('Name cannot be empty');
    }));
});
describe('Testing project PATCH routes', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const project_data = {
            title: 'Test Project',
            tasks: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
            users: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
            columns: [],
        };
        const project = yield new project_1.Project(project_data);
        yield project.save();
    }));
    test('Project is successfully patched', () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield helpers.get_target_project();
        const { id } = project;
        yield api.patch(`/api/projects/id/${id}`)
            .send({ title: 'new name' })
            .set('Authorization', `Bearer ${helpers.token}`)
            .expect(200);
        const project_post_patch = yield helpers.get_target_project();
        expect(project_post_patch.title).toEqual('new name');
    }));
    test('404 error is sent if project not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield helpers.get_target_project();
        const real_id = project.id;
        const fake_id = helpers.generate_fake_id(real_id);
        const response = yield api
            .patch(`/api/projects/id/${fake_id}`)
            .send({ title: 'New name' })
            .expect(404)
            .set('Authorization', `Bearer ${helpers.token}`)
            .expect('Content-type', /application\/json/);
        const project_post_patch = yield helpers.get_target_project();
        expect(project_post_patch).toEqual(project);
        expect(response.body.error).toContain('Project not found');
    }));
    test('PATCH fails if no data is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield helpers.get_target_project();
        const { id } = project;
        const response = yield api
            .patch(`/api/projects/id/${id}`)
            .send({ title: '' })
            .expect(400)
            .set('Authorization', `Bearer ${helpers.token}`)
            .expect('Content-type', /application\/json/);
        const project_post_patch = yield helpers.get_target_project();
        expect(project_post_patch).toEqual(project);
        expect(response.body.error).toContain('No data provided');
    }));
    test('PATCH fails if not authorized', () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield helpers.get_target_project();
        const { id } = project;
        yield api.patch(`/api/projects/id/${id}`)
            .send({ title: 'new name' })
            .expect(401);
        const project_post_patch = yield helpers.get_target_project();
        expect(project_post_patch).toEqual(project);
    }));
});
describe('Testing project DELETE routes', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const project_data = {
            title: 'Test Project',
            tasks: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
            users: [new mongoose_1.default.Types.ObjectId(), new mongoose_1.default.Types.ObjectId()],
            columns: [],
        };
        const project = yield new project_1.Project(project_data);
        yield project.save();
    }));
    test('Successfull deletion', () => __awaiter(void 0, void 0, void 0, function* () {
        const projects_pre_test = yield helpers.projects_in_db();
        const project_to_delete = yield helpers.get_target_project();
        const { id } = project_to_delete;
        yield api
            .delete(`/api/projects/id/${id}`)
            .set('Authorization', `Bearer ${helpers.token}`)
            .expect(204);
        const projects_post_test = yield helpers.projects_in_db();
        expect(projects_post_test.length).toEqual(projects_pre_test.length - 1);
    }));
});
//# sourceMappingURL=project-api.test.js.map