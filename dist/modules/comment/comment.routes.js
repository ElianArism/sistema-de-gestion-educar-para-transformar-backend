"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = require("express");
const comment_validation_1 = require("../../middlewares/validations/comment.validation");
const comment_controller_1 = require("./comment.controller");
exports.commentRoutes = (0, express_1.Router)();
exports.commentRoutes.get("/", [], comment_controller_1.getComments);
exports.commentRoutes.get("/:id", [], comment_controller_1.getCommentById);
exports.commentRoutes.get("/:id", [], comment_controller_1.deleteComment);
exports.commentRoutes.post("/", comment_validation_1.createCommentValidations, comment_controller_1.createComment);
exports.default = exports.commentRoutes;
//# sourceMappingURL=comment.routes.js.map