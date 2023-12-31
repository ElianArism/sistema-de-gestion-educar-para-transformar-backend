"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseNotesByStudent = exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourses = void 0;
const course_model_1 = __importDefault(require("../../db/models/course.model"));
const getCourses = async (req, res) => {
    try {
        return res.json({
            ok: true,
            data: {
                courses: await course_model_1.default.find()
                    .populate("students.studentInfo", "-_id -__v")
                    .populate("professor", "-_id -__v")
                    .exec(),
            },
        });
    }
    catch (error) {
        if (process.env.LOGS_ENABLED) {
            console.log("===== Error =====");
            console.log(error);
            console.log("===== End Error =====");
        }
        return res.status(error?.status ?? 500).json({
            ok: false,
            error: {
                message: error?.message,
                logs: error,
            },
        });
    }
};
exports.getCourses = getCourses;
const createCourse = async (req, res) => {
    const course = req.body;
    try {
        const doc = new course_model_1.default(course);
        await doc.save();
        return res.json({
            ok: true,
            data: {
                id: doc._id,
            },
        });
    }
    catch (error) {
        if (process.env.LOGS_ENABLED) {
            console.log("===== Error =====");
            console.log(error);
            console.log("===== End Error =====");
        }
        return res.status(error?.status ?? 500).json({
            ok: false,
            error: {
                message: error?.message,
                logs: error,
            },
        });
    }
};
exports.createCourse = createCourse;
const updateCourse = async (req, res) => {
    const course = req.body;
    const id = req.params.courseId;
    try {
        const updatedCourse = await course_model_1.default.findByIdAndUpdate(id, course);
        return res.status(!!exports.updateCourse ? 200 : 404).json({
            ok: !!updatedCourse,
            data: {
                id: !!updatedCourse ? updatedCourse.toJSON() : "Course not found",
            },
        });
    }
    catch (error) {
        if (process.env.LOGS_ENABLED) {
            console.log("===== Error =====");
            console.log(error);
            console.log("===== End Error =====");
        }
        return res.status(error?.status ?? 500).json({
            ok: false,
            error: {
                message: error?.message,
                logs: error,
            },
        });
    }
};
exports.updateCourse = updateCourse;
const deleteCourse = async (req, res) => {
    const id = req.params.courseId;
    try {
        const deletedCourse = await course_model_1.default.findByIdAndDelete(id);
        return res.status(!!exports.updateCourse ? 200 : 404).json({
            ok: !!deletedCourse,
            data: {
                id: !!deletedCourse ? deletedCourse.toJSON() : "Course not found",
            },
        });
    }
    catch (error) {
        if (process.env.LOGS_ENABLED) {
            console.log("===== Error =====");
            console.log(error);
            console.log("===== End Error =====");
        }
        return res.status(error?.status ?? 500).json({
            ok: false,
            error: {
                message: error?.message,
                logs: error,
            },
        });
    }
};
exports.deleteCourse = deleteCourse;
const updateCourseNotesByStudent = async (req, res) => {
    const courseId = req.params.courseId;
    const studentId = req.params.studentId;
    const notes = req.body;
    try {
        const course = (await course_model_1.default.findById(courseId).populate("students.studentInfo", "-_id -__v"))?.toJSON();
        if (!course) {
            return res.status(404).json({
                ok: false,
                data: {
                    error: "Course not found",
                },
            });
        }
        const studentIdx = course.students.findIndex((student) => student.studentInfo.id === studentId);
        if (studentIdx === -1) {
            console.log(JSON.stringify(course));
            return res.status(404).json({
                ok: false,
                data: {
                    error: "student not found",
                },
            });
        }
        course.students[studentIdx].schoolGrades = {
            ...course.students[studentIdx].schoolGrades,
            ...notes,
        };
        course.students = course.students.map((c) => {
            c.studentInfo = c.studentInfo.id;
            return c;
        });
        await course_model_1.default.findByIdAndUpdate(course._id, course);
        return res.json({
            ok: true,
            data: {
                id: course._id,
            },
        });
    }
    catch (error) {
        if (process.env.LOGS_ENABLED) {
            console.log("===== Error =====");
            console.log(error);
            console.log("===== End Error =====");
        }
        return res.status(error?.status ?? 500).json({
            ok: false,
            error: {
                message: error?.message,
                logs: error,
            },
        });
    }
};
exports.updateCourseNotesByStudent = updateCourseNotesByStudent;
//# sourceMappingURL=course.controller.js.map