"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkErrors = void 0;
const express_validator_1 = require("express-validator");
const checkErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.array().length) {
        return res.status(400).json({
            ok: false,
            msg: "Bad request",
            errors: errors.array(),
        });
    }
    next();
};
exports.checkErrors = checkErrors;
//# sourceMappingURL=check-errors.js.map