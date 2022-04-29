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
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = require("../app");
const user_1 = require("../models/user");
const helpers = __importStar(require("./helpers/test_helper"));
const db = __importStar(require("./helpers/test_db_helper"));
const api = (0, supertest_1.default)(app_1.app);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.connect();
    // Delete all users before test
    yield user_1.User.deleteMany({});
    const password_hash = yield bcrypt_1.default.hash('password', 10);
    const user_data = {
        display_name: 'root',
        email: 'root@email.com',
        password: password_hash,
        projects: [],
        tasks: [],
    };
    const user = new user_1.User(user_data);
    yield user.save();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.close();
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // Delete all users before test
    yield user_1.User.deleteMany({});
    const password_hash = yield bcrypt_1.default.hash('password', 10);
    const user_data = {
        display_name: 'root',
        email: 'root@email.com',
        password: password_hash,
        projects: [],
        tasks: [],
    };
    const user = new user_1.User(user_data);
    yield user.save();
}));
describe('Testing GET routes', () => {
    test('Correct user is returned when getting user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const user_to_find = yield helpers.get_target_user();
        const result_user = yield api
            .get(`/api/users/id/${user_to_find.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const processed_user_to_view = JSON.parse(JSON.stringify(user_to_find));
        expect(result_user.body).toEqual(processed_user_to_view);
    }));
    test('Correct user is returned when getting user by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const user_to_find = yield helpers.get_target_user();
        const result_user = yield api
            .get(`/api/users/email/${user_to_find.email}`)
            .expect(200)
            .expect('Content-type', /application\/json/);
        const processed_user_to_view = JSON.parse(JSON.stringify(user_to_find));
        expect(result_user.body).toEqual(processed_user_to_view);
    }));
    test('400 error is thrown when invalid email is supplied', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalid_email = 'invalid email';
        const result = yield api
            .get(`/api/users/email/${invalid_email}`)
            .expect(400)
            .expect('Content-type', /application\/json/);
        expect(result.body.error).toContain('Invalid email supplied');
    }));
    test('404 error is thrown when user is not found by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield helpers.get_target_user();
        const real_id = user.id;
        const fake_id = helpers.generate_fake_id(real_id);
        const result = yield api
            .get(`/api/users/id/${fake_id}`)
            .expect(404)
            .expect('Content-type', /application\/json/);
        expect(result.body.error).toContain('User not found');
    }));
    test('404 error is thrown when user is not found by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const fake_email = 'notreal@email.com';
        const result = yield api
            .get(`/api/users/email/${fake_email}`)
            .expect(404)
            .expect('Content-type', /application\/json/);
        expect(result.body.error).toContain('User not found');
    }));
});
afterAll(() => {
    mongoose_1.default.connection.close();
});
//# sourceMappingURL=user-api.test.js.map