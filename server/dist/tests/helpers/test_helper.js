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
exports.get_target_task = exports.tasks_in_db = exports.get_target_project = exports.projects_in_db = exports.generate_fake_id = exports.token = exports.token_id = exports.get_target_user = exports.users_in_db = exports.initial_users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = require("../../models/user");
const project_1 = require("../../models/project");
const task_1 = require("../../models/task");
exports.initial_users = [{
        id: new mongoose_1.default.Types.ObjectId(),
        display_name: 'user1',
        email: 'email1@email.com',
        password: 'password1',
        tasks: [],
        projects: [],
    }];
// TODO: Generalize functions
// Returns a list of all users in test database
const users_in_db = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.User.find();
    return users.map((user) => user.toJSON());
});
exports.users_in_db = users_in_db;
// Returns the first user from the list to be used to target in tests
const get_target_user = () => __awaiter(void 0, void 0, void 0, function* () {
    const users_pre_test = yield (0, exports.users_in_db)();
    return users_pre_test[0];
});
exports.get_target_user = get_target_user;
exports.token_id = new mongoose_1.default.Types.ObjectId();
exports.token = jwt.sign({ id: exports.token_id }, process.env.JWT_SECRET);
const generate_fake_id = (real_id) => {
    if (real_id === undefined) {
        return null;
    }
    const id = new mongoose_1.default.Types.ObjectId();
    if (id === real_id) {
        (0, exports.generate_fake_id)(real_id);
    }
    return id;
};
exports.generate_fake_id = generate_fake_id;
const projects_in_db = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_1.Project.find();
    return projects.map((project) => project.toJSON());
});
exports.projects_in_db = projects_in_db;
const get_target_project = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield (0, exports.projects_in_db)();
    return projects[0];
});
exports.get_target_project = get_target_project;
const tasks_in_db = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_1.Task.find();
    return tasks.map((task) => task.toJSON());
});
exports.tasks_in_db = tasks_in_db;
const get_target_task = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield (0, exports.tasks_in_db)();
    return tasks[0];
});
exports.get_target_task = get_target_task;
//# sourceMappingURL=test_helper.js.map