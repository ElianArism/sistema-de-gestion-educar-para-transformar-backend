"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const parse_model_to_json_utilts_1 = require("../../utils/parse-model-to-json.utilts");
const CourseSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    year: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    scheduleDetails: [
        {
            day: {
                type: mongoose_1.Schema.Types.String,
                required: true,
            },
            startTime: {
                type: mongoose_1.Schema.Types.String,
                required: true,
            },
            endTime: {
                type: mongoose_1.Schema.Types.String,
                required: true,
            },
            _id: false,
        },
    ],
    students: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
    professor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Professor",
        required: true,
    },
});
(0, parse_model_to_json_utilts_1.parseModelToJSON)(CourseSchema);
const Course = (0, mongoose_1.model)("Course", CourseSchema);
exports.default = Course;
//# sourceMappingURL=course.model.js.map