"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const validateJWT = async (req, res, next) => {
    const token = req.header("authorization");
    if (!token) {
        return res.status(401).json({
            ok: false,
            error: {
                message: "Unauthorized Request",
            },
        });
    }
    try {
        const { valid, data } = await (0, jwt_utils_1.verifyJWT)(token);
        if (!valid || !data) {
            return res.status(401).json({
                ok: false,
                error: {
                    message: "Invalid JWT",
                },
            });
        }
        req.id = data.id;
        req.role = data.role;
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            error: {
                message: error?.message || "Internal Server Error",
                logs: error,
            },
        });
    }
    next();
};
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.middleware.js.map