"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentValidations = void 0;
const express_validator_1 = require("express-validator");
exports.createCommentValidations = [
    (0, express_validator_1.check)("description").not().isEmpty().isString(),
    (0, express_validator_1.check)("name").optional().isString(),
    (0, express_validator_1.check)("date").not().isEmpty().isString(),
    (0, express_validator_1.check)("rating").optional().isNumeric(),
];
//# sourceMappingURL=comment.validation.js.map