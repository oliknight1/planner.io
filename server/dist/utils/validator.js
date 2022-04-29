"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.user_validation_rules = void 0;
const express_validator_1 = require("express-validator");
const user_validation_rules = () => [
    (0, express_validator_1.body)('email').not().isEmpty().withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Invalid email'),
    (0, express_validator_1.body)('display_name').not().isEmpty().withMessage('Display name cannot be empty')
        .trim()
        .escape(),
];
exports.user_validation_rules = user_validation_rules;
const validate = (request, response, next) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (errors.isEmpty()) {
        // Continue with the middleware stack
        return next();
    }
    const initial = {};
    // Create an object using previous iteratons object ( acc )
    // Then create new key value pair
    // if the key already has data attached to it, use spread to add that data in
    // attach current errors msg
    const processed_errors = errors.array().reduce((acc, error) => {
        const { param, msg } = error;
        return Object.assign(Object.assign({}, acc), { [param]: [...(acc[param] || []), msg] });
    }, initial);
    return response.status(400).json({ error: processed_errors });
};
exports.validate = validate;
//# sourceMappingURL=validator.js.map