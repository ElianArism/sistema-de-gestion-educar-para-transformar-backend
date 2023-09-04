"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubjectValidations = exports.createSubjectValidations = void 0;
const express_validator_1 = require("express-validator");
exports.createSubjectValidations = [
    (0, express_validator_1.check)("name").isString(),
    (0, express_validator_1.check)("schedules").isArray(),
];
exports.updateSubjectValidations = [
    (0, express_validator_1.check)("name").isString(),
    (0, express_validator_1.check)("students").isArray(),
    (0, express_validator_1.check)("schedules").isArray(),
];
//# sourceMappingURL=subject.validation.js.map