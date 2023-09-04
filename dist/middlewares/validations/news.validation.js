"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsValidation = void 0;
const express_validator_1 = require("express-validator");
exports.newsValidation = [
    (0, express_validator_1.check)("title").isString(),
    (0, express_validator_1.check)("description").isString(),
    (0, express_validator_1.check)("imgUrl").optional().isString(),
    (0, express_validator_1.check)("date").optional().isString(),
];
//# sourceMappingURL=news.validation.js.map