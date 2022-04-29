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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const mongoose_1 = require("mongoose");
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../utils/config");
class BaseController {
}
exports.BaseController = BaseController;
_a = BaseController;
BaseController.get_all = (request, response, model, populate_query) => __awaiter(void 0, void 0, void 0, function* () {
    const docs = populate_query
        ? yield model.find().populate(populate_query)
        : model.find();
    if (docs) {
        response.status(200).json(docs);
    }
    else {
        response.status(404).json({ error: `${model.modelName} not found` });
    }
});
BaseController.get_by_id = (request, response, model) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        response.status(400).json({ error: 'Invalid ID supplied' });
        return;
    }
    const doc = yield model.findById(id);
    if (doc) {
        response.status(200).send(doc.toJSON());
    }
    else {
        response.status(404).json({ error: `${model.modelName} not found` });
    }
});
BaseController.remove = (request, response, model) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const token = _a.verify_token(request, response);
    if (!token) {
        response.status(401).json({ error: 'Auth token missing or invalid' });
        return;
    }
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        response.status(400).json({ error: 'Invalid ID supplied' });
        return;
    }
    try {
        yield model.findByIdAndRemove(id);
        response.status(204).end();
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(400).json({ error: error.message });
        }
    }
});
BaseController.verify_token = (request, response) => {
    const auth = request.get('authorization');
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const token = auth.substring(7);
        // Check if token & env variable exist before verify
        const decoded_token = jwt.verify(token, config_1.JWT_SECRET);
        if (!decoded_token) {
            response.status(401).json({ error: 'Token expired' });
            return null;
        }
        return decoded_token;
    }
    return null;
};
//# sourceMappingURL=BaseController.js.map