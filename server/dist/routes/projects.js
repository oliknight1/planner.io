"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.project_router = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const ProjectController_1 = require("../controllers/ProjectController");
exports.project_router = express_1.default.Router();
exports.project_router.get('/id/:id', ProjectController_1.ProjectController.get_project);
exports.project_router.get('/', ProjectController_1.ProjectController.get_all_projects);
exports.project_router.post('/', ProjectController_1.ProjectController.create);
exports.project_router.patch('/id/:id', (0, express_validator_1.body)('project').notEmpty().withMessage('Must provide project data'), ProjectController_1.ProjectController.update);
exports.project_router.patch('/add_task/:id', ProjectController_1.ProjectController.add_task);
exports.project_router.patch('/remove_task/:id', ProjectController_1.ProjectController.remove_task);
exports.project_router.delete('/id/:id', ProjectController_1.ProjectController.remove_project);
//# sourceMappingURL=projects.js.map