"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = exports.getCourses = void 0;
const course_model_1 = __importDefault(require("../../db/models/course.model"));
const getCourses = async (req, res) => {
    try {
        return res.json({
            ok: true,
            data: {
                courses: await course_model_1.default.find()
                    .populate("students", "-_id -__v")
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
//# sourceMappingURL=course.controller.js.map