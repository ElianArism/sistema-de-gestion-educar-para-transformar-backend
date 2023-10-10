"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const comment_routes_1 = __importDefault(require("./modules/comment/comment.routes"));
const courses_routes_1 = __importDefault(require("./modules/courses/courses.routes"));
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const AppRouter = (0, express_1.Router)();
AppRouter.use("/auth", auth_routes_1.default);
AppRouter.use("/users", user_routes_1.default);
AppRouter.use("/comment", comment_routes_1.default);
AppRouter.use("/courses", courses_routes_1.default);
exports.default = AppRouter;
//# sourceMappingURL=router.js.map