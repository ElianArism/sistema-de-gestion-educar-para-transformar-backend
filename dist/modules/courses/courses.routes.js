"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("./course.controller");
const courseRoutes = (0, express_1.Router)();
courseRoutes.get("/", [], course_controller_1.getCourses);
courseRoutes.post("/", [], course_controller_1.createCourse);
courseRoutes.put("/:courseId", [], course_controller_1.updateCourse);
courseRoutes.delete("/:courseId", [], course_controller_1.deleteCourse);
exports.default = courseRoutes;
//# sourceMappingURL=courses.routes.js.map