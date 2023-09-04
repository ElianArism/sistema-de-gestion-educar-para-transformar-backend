"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subject_validation_1 = require("../../middlewares/validations/subject.validation");
const subject_controller_1 = require("./subject.controller");
const SubjectRoutes = (0, express_1.Router)();
SubjectRoutes.get("/", [], subject_controller_1.getSubjects);
SubjectRoutes.get("/:id", [], subject_controller_1.getSubjectById);
SubjectRoutes.post("/", subject_validation_1.createSubjectValidations, subject_controller_1.createSubject);
SubjectRoutes.put("/:id", subject_validation_1.updateSubjectValidations, subject_controller_1.updateSubject);
SubjectRoutes.delete("/:id", [], subject_controller_1.deleteSubject);
exports.default = SubjectRoutes;
//# sourceMappingURL=subject.routes.js.map