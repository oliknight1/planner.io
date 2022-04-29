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
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = require("../app");
const user_1 = require("../models/user");
const db = __importStar(require("./helpers/test_db_helper"));
const helpers = __importStar(require("./helpers/test_helper"));
const api = (0, supertest_1.default)(app_1.app);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.connect();
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
describe('Test logging in', () => {
    test('Successfull login', () => __awaiter(void 0, void 0, void 0, function* () {
        const login_details = {
            email: 'root@email.com',
            password: 'password',
        };
        const response = yield api
            .post('/api/auth/login')
            .send(login_details)
            .expect(200);
        expect(response.body).toEqual(expect.objectContaining({
            token: expect.any(String),
            display_name: 'root',
            id: (yield helpers.get_target_user()).id,
        }));
    }));
    test('Login fails with wrong email', () => __awaiter(void 0, void 0, void 0, function* () {
        const login_details = {
            email: 'notroot@email.com',
            password: 'password',
        };
        const response = yield api
            .post('/api/auth/login')
            .expect(401)
            .send(login_details)
            .expect('Content-type', /application\/json/);
        expect(response.body.error).toContain('Incorrect email or password');
    }));
    test('Login fails with wrong password', () => __awaiter(void 0, void 0, void 0, function* () {
        const login_details = {
            email: 'root@email.com',
            password: 'wrongpassword',
        };
        const response = yield api
            .post('/api/auth/login')
            .expect(401)
            .send(login_details)
            .expect('Content-type', /application\/json/);
        expect(response.body.error).toContain('Incorrect email or password');
    }));
});
describe('Test user registration', () => {
    test('User creation succeeds and adds user to database', () => __awaiter(void 0, void 0, void 0, function* () {
        const users_pre_test = yield helpers.users_in_db();
        const new_user = {
            display_name: 'oliknight',
            email: 'oli@email.com',
            password: 'password1',
            password_confirm: 'password1',
        };
        const response = yield api
            .post('/api/auth/register')
            .send(new_user)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const users_post_test = yield helpers.users_in_db();
        expect(users_post_test).toHaveLength(users_pre_test.length + 1);
        const emails = users_post_test.map((user) => user.email);
        expect(emails).toContain(new_user.email);
        expect(response.body).toEqual(expect.objectContaining({
            token: expect.any(String),
            display_name: 'oliknight',
            id: users_post_test[users_post_test.length - 1].id,
        }));
    }));
    test('User creation fails with correct status code when non-unique email', () => __awaiter(void 0, void 0, void 0, function* () {
        const users_pre_test = yield helpers.users_in_db();
        const new_user = {
            display_name: 'oliknight',
            email: 'root@email.com',
            password: 'password1',
            password_confirm: 'password1',
        };
        const result = yield api
            .post('/api/auth/register')
            .send(new_user)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(result.body.error).toContain('Account with that email already exists');
        const users_post_test = yield helpers.users_in_db();
        expect(users_post_test.length).toEqual(users_pre_test.length);
    }));
    test('User creation fails with empty email/display_name', () => __awaiter(void 0, void 0, void 0, function* () {
        const users_pre_test = yield helpers.users_in_db();
        const new_user = {
            display_name: '',
            email: '',
            password: 'password1',
            password_confirm: 'password1',
        };
        const result = yield api
            .post('/api/auth/register')
            .send(new_user)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(result.body.error.display_name).toContain('Display name cannot be empty');
        expect(result.body.error.email).toContain('Email cannot be empty');
        const users_post_test = yield helpers.users_in_db();
        expect(users_pre_test.length).toEqual(users_post_test.length);
    }));
    test('User creation fails if passwords do not match', () => __awaiter(void 0, void 0, void 0, function* () {
        const users_pre_test = yield helpers.users_in_db();
        const new_user = {
            display_name: 'new users',
            email: 'newuser@email.com',
            password: 'password1',
            password_confirm: 'password2',
        };
        const result = yield api
            .post('/api/auth/register')
            .send(new_user)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(result.body.error).toContain('Passwords do not match');
        const users_post_test = yield helpers.users_in_db();
        expect(users_pre_test.length).toEqual(users_post_test.length);
    }));
});
//# sourceMappingURL=auth-api.test.js.map