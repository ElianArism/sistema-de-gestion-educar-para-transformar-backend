"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const parse_model_to_json_utilts_1 = require("../../utils/parse-model-to-json.utilts");
const SubjectSchema = new mongoose_1.Schema({
    professor: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    students: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
            },
        ],
        default: [],
    },
    schedules: {
        type: [
            {
                type: String,
            },
        ],
        default: [],
    },
});
(0, parse_model_to_json_utilts_1.parseModelToJSON)(SubjectSchema);
const Subject = (0, mongoose_1.model)("Subject", SubjectSchema);
exports.default = Subject;
//# sourceMappingURL=subject.model.js.map