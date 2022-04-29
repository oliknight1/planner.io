"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./utils/config");
const users_1 = require("./routes/users");
const projects_1 = require("./routes/projects");
const tasks_1 = require("./routes/tasks");
const auth_1 = require("./routes/auth");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use('/api/users', users_1.user_router);
exports.app.use('/api/projects', projects_1.project_router);
exports.app.use('/api/tasks', tasks_1.task_router);
exports.app.use('/api/auth', auth_1.auth_router);
exports.app.use(express_1.default.static('build'));
mongoose_1.default.connect(config_1.MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB database');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB', error);
});
//# sourceMappingURL=app.js.map