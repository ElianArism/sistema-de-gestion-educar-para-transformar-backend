"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_jwt_middleware_1 = require("../../middlewares/validate-jwt.middleware");
const auth_controller_1 = require("./auth.controller");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/login", [], auth_controller_1.login);
authRoutes.get("/renew-session", []);
authRoutes.get("/profile", [validate_jwt_middleware_1.validateJWT], auth_controller_1.profile);
authRoutes.post("/logout", []);
exports.default = authRoutes;
//# sourceMappingURL=auth.routes.js.map