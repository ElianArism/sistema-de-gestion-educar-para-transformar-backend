"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParentValidations = exports.updateStudentValidations = exports.updateProfessorValidations = exports.updateUserValidations = exports.createParentValidations = exports.createStudentValidations = exports.createProfessorValidations = exports.userValidations = void 0;
const express_validator_1 = require("express-validator");
const check_errors_1 = require("./check-errors");
exports.userValidations = [
    (0, express_validator_1.check)("id", "id is required").isString().not().isEmpty(),
    (0, express_validator_1.check)("name", "name is required").isString().not().isEmpty(),
    (0, express_validator_1.check)("lastName", "lastName is required").isString().not().isEmpty(),
    (0, express_validator_1.check)("password", "password is required").isString().not().isEmpty(),
    (0, express_validator_1.check)("birthDate", "birthDate is required").isString().not().isEmpty(),
];
exports.createProfessorValidations = [
    ...exports.userValidations,
    (0, express_validator_1.check)("email").not().isEmpty().isEmail(),
    (0, express_validator_1.check)("subjects").optional().isArray(),
    check_errors_1.checkErrors,
];
exports.createStudentValidations = [
    ...exports.userValidations,
    (0, express_validator_1.check)("subjects").optional().isArray(),
    check_errors_1.checkErrors,
];
exports.createParentValidations = [
    ...exports.userValidations,
    (0, express_validator_1.check)("son").not().isEmpty().isString(),
    check_errors_1.checkErrors,
];
exports.updateUserValidations = [
    (0, express_validator_1.check)("name", "name is required").optional().isString(),
    (0, express_validator_1.check)("lastName", "lastName is required").optional().isString(),
    (0, express_validator_1.check)("birthDate", "birthDate is required").optional().isString(),
];
exports.updateProfessorValidations = [
    ...exports.updateUserValidations,
    (0, express_validator_1.check)("email").optional().isEmail(),
    check_errors_1.checkErrors,
];
exports.updateStudentValidations = [
    ...exports.updateUserValidations,
    (0, express_validator_1.check)("subjects").optional().isArray(),
    check_errors_1.checkErrors,
];
exports.updateParentValidations = [
    ...exports.updateUserValidations,
    (0, express_validator_1.check)("subjects").optional().isArray(),
    check_errors_1.checkErrors,
];
//# sourceMappingURL=user.validation.js.map