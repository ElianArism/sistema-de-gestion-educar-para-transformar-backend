"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_jwt_middleware_1 = require("../../middlewares/validate-jwt.middleware");
const user_validation_1 = require("../../middlewares/validations/user.validation");
const user_controller_1 = require("./user.controller");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/all/:role", [], user_controller_1.getAllUsers);
userRoutes.get("/:role/:id", [], user_controller_1.getUserById);
userRoutes.delete("/:role/:id", [], user_controller_1.deleteUser);
userRoutes.put("/update-password", [validate_jwt_middleware_1.validateJWT], user_controller_1.updatePassword);
userRoutes.put("/professor/:id", user_validation_1.updateProfessorValidations, user_controller_1.updateProfessor);
userRoutes.put("/student/:id", user_validation_1.updateStudentValidations, user_controller_1.updateStudent);
userRoutes.put("/parent/:id", user_validation_1.updateParentValidations, user_controller_1.updateParent);
userRoutes.post("/professor", user_validation_1.createProfessorValidations, user_controller_1.createProfessor);
userRoutes.post("/student", user_validation_1.createStudentValidations, user_controller_1.createStudent);
userRoutes.post("/parent", user_validation_1.createParentValidations, user_controller_1.createParent);
exports.default = userRoutes;
//# sourceMappingURL=user.routes.js.map